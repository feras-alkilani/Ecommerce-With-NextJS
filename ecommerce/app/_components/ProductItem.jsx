import React from "react";
import Image from "next/image";
import { List } from "lucide-react";

import Link from "next/link";

export default function ProductItem({ product }) {
  return (
    <Link
      href={`/product-details/${product?.id}`}
      className="rounded-lg border border-teal-400 overflow-hidden hover:shadow-md hover:border p-1 hover:cursor-pointer"
    >
      <Image
        src={product?.attributes?.banner?.data?.attributes?.url}
        alt="banner-card"
        width={400}
        height={350}
        className="rounded-t-lg h-[170px] object-cover w-full"
      />
      <div className="flex justify-between p-3 items-center">
        <div>
          <h2 className="text-[12px] font-medium line-clamp-1">
            {product?.attributes?.title}
          </h2>
          <h2 className="text-[10px] text-gray-400 uppercase flex gap-1 items-center">
            <List className="w-4 h-4" />
            {product?.attributes?.category}
          </h2>
        </div>
        <h2 className="text-[12px] font-medium text-gray-600">
          ${product?.attributes?.price}
        </h2>
      </div>
    </Link>
  );
}
