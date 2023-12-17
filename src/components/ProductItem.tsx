import React from "react";
import Link from "next/link";

interface Props {
  id: string;
  img: string;
  title: string;
  price: number;
}
const ProductItem: React.FC<Props> = ({id, img, title, price}) => {
  
  return (
      <Link href={`/products/${id}`}>
        <div className="product-wrapper mb-3 p-0">
            <img src={img} alt="IMG-PRODUCT" className="product-img"/>
            <p>{title}</p>
            <p style={{fontWeight: '500'}}>{price} ден.</p>
        </div>
      </Link>
  );
};

export default ProductItem;
