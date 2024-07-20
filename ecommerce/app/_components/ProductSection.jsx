"use client";

import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import ProductApis from "../_utils/ProductApis";

export default function ProductSection() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await ProductApis.getLatestProducts();
        console.log("Products:", res.data.data);
        setProductList(res.data.data);
      } catch (error) {
        // console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-10 md:px-20">
      {" "}
      <h2 className="my-4 text-xl">Our Latest Products:</h2>
      <ProductList productList={productList} />
    </div>
  );
}
