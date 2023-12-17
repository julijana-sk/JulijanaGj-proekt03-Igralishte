import React from "react";
import { ProductType } from "../types/types";
import ProductItem from "./ProductItem";

interface Props {
  products: ProductType[];
}

const RelatedProducts: React.FC<Props> = ({products}) => {

  return (
      <div className="container-fluid">
        <div className="row flex-column">
          <div className="col-11 mr-auto ml-auto">
          <h3 className="text-left my-4">Други парчиња:</h3>
          <div className="row flex-row justify-content-around">
                {products?.map((product, index) => {
                  return (
                    <div key={index} className="col-5 p-0 mb-3 mr-2 product-img-small">
                       <ProductItem {...product}/>
                    </div>
                  )
                })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
