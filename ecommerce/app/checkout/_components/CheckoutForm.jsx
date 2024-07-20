import {
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { CartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import OrderApi from "../../_utils/OrderApis";
import CartApis from "../../_utils/CartApis";

const CheckoutForm = ({ amount }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js لم يتم تحميله بعد.
    }

    setLoading(true);

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message || "حدث خطأ غير معروف.");
    };

    try {
      // إنشاء طلب جديد
      await createOrder();

      // إرسال بريد إلكتروني
      await sendEmail();

      // تفعيل التحقق من النموذج وجمع معلومات المحفظة
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      // الحصول على client secret
      const res = await fetch("/api/create-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount })
      });

      if (!res.ok) {
        throw new Error("فشل في إنشاء نية الدفع.");
      }

      const data = await res.json();
      const clientSecret = data.client_secret; // استخراج client_secret من الاستجابة

      // طباعة البيانات لمراجعتها
      console.log("Response data:", data);
      console.log("Client secret:", clientSecret);

      // التأكد من أن clientSecret هو سلسلة نصية
      if (typeof clientSecret !== "string") {
        throw new Error("clientSecret يجب أن يكون سلسلة نصية.");
      }

      // تأكيد الدفع
      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-confirm"
        }
      });

      if (result.error) {
        handleError(result.error);
      } else {
        // التحقق من حالة الدفع
        const paymentIntent = result.paymentIntent;
        if (paymentIntent.status === "succeeded") {
          // إعادة التوجيه إلى صفحة تأكيد الدفع إذا نجح الدفع
          window.location.replace("/payment-confirm");
        } else {
          console.error("حالة الدفع غير متوقعة:", paymentIntent.status);
        }
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async () => {
    const productIds = cart.map((el) => el?.product?.id);
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productIds
      }
    };
    await OrderApi.createOrder(data);
    await Promise.all(cart.map((el) => CartApis.deleteCartItem(el?.id)));
    setCart([]); // تفريغ السلة بعد إنشاء الطلب
  };

  const sendEmail = async () => {
    await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount,
        email: user.primaryEmailAddress.emailAddress,
        fullName: user.fullName
      })
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[320px] mt-12">
        <PaymentElement />
        <button
          className="w-full p-2 mt-4 text-white rounded-md bg-primary"
          disabled={loading}
        >
          {loading ? "جاري المعالجة..." : "إرسال"}
        </button>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </form>
  );
};

export default CheckoutForm;
