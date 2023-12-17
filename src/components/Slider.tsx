import React, { useState } from 'react';
import { ProductType } from '@/types/types';

interface Props {
  product: ProductType;
}

const Slider: React.FC<Props> = ({ product }) => {

  const [isChecked, setIsChecked] = useState(true);
  
  const handleChange = () => {
      setIsChecked(!isChecked);
  };

  return (
        <div className="container-fluid p-0" style={{height: '570px'}}>
          <div className="slider-box">
            <div className="main-container">
              <div className="main-slider">
                <input type="radio" id="box1" name='julijana' checked={isChecked} onChange={handleChange} />
                <label htmlFor="box1" ><img src={`${product.img}`} alt="---" /></label>
                  <img src={`${product.img}`} alt="---" />
                <input type="radio" id="box2" name='julijana' checked={isChecked} onChange={handleChange} />
                <label htmlFor="box2" ><img src={`${product.img1}`} alt="---" /></label>
                  <img src={`${product.img1}`} alt="---" />
                <input type="radio" id="box3" name='julijana' checked={isChecked} onChange={handleChange} />
                <label htmlFor="box3" ><img src={`${product.img2}`} alt="---" /></label>
                  <img src={`${product.img2}`} alt="---" />
                <input type="radio" id="box4" name='julijana' checked={isChecked} onChange={handleChange} />
                <label htmlFor="box4" ><img src={`${product.img3}`} alt="---" /></label>
                  <img src={`${product.img3}`} alt="---" />
              </div>
            </div>
          </div>
        </div>
  );
};

export default Slider;
