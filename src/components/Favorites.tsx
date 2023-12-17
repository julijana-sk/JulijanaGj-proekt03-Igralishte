import { ProductType } from '@/types/types';
import React from 'react'
import ProductItem from './ProductItem';

interface Props {
  products: ProductType[];
}
const Favorites: React.FC<Props> = ({products}) => {
    
  return (
    <div className="container-fluid mb-5">
           <div className="row flex-column">
             <div className="col-11 mr-auto ml-auto"> 
                  {products?.map((product) => <ProductItem key={product.id} {...product} />)}
             </div> 
        </div>
     </div>
  )
}

export default Favorites