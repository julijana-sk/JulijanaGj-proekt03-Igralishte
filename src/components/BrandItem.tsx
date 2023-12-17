import React from 'react'
import { BrandType } from '@/types/types';
import Link from 'next/link';
import PageTitle from './PageTitle';

interface Props{
  brand: BrandType;
}
const BrandItem: React.FC<Props> = ({brand}) => {

return (

   <Link href={`/brands/${brand.id}`}> 
      <div className='my-3'>
        <div className="d-flex flex-row align-items-center align-self-center my-3 justify-content-left">
          <img src="../pictures/icons/sparks-elements.png" alt="spakrs" className="mr-2" />
          <PageTitle title={brand.name}/>
        </ div>
          <img src={brand.img} alt="brand img" className="w-100 h-100 mb-3"/>
          <p className="about-text text-left">{brand.description}</p>
      </div>
    </Link>
  );
}

export default BrandItem;