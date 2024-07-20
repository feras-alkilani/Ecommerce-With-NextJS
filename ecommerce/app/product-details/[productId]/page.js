"use client";

import React, { useEffect, useState } from "react";
import ProductApis from "../../_utils/ProductApis";
import BreadCrumbs from "../../_components/BreadCrumbs";
import ProductBanner from "./_components/ProductBanner";
import ProductInfo from "./_components/ProductInfo";
import ProductList from "../../_components/ProductList";
import { usePathname } from "next/navigation";

export default function ProductDetails({ params }) {
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const path = usePathname();

  useEffect(() => {
    if (params?.productId) {
      getProductById_();
    }
  }, [params?.productId]);

  const getProductById_ = async () => {
    try {
      const res = await ProductApis.getProductById(params.productId);
      const product = res.data.data;
      setProductDetails(product);
      getProductListByCategory(product);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };

  const getProductListByCategory = async (product) => {
    try {
      const response = await ProductApis.getProductsByCategory(
        product?.attributes?.category
      );
      setRelatedProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products by category:", error);
    }
  };

  return (
    <div className="px-10 py-8 md:px-28">
      <BreadCrumbs path={path} />
      <div className="grid grid-col-1 sm:grid-cols-2 gap-5 sm:gap-0 mt-10 md:flex-row justify-around">
        <ProductBanner product={productDetails} />
        <ProductInfo product={productDetails} />
      </div>
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mt-10">Related Products:</h2>
          <ProductList productList={relatedProducts} />
        </div>
      )}
    </div>
  );
}
