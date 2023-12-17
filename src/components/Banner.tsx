import React, { useState } from "react";
import Link from "next/link";

interface Props {
  imageBanner: string;
  classOfPicture: string;
  bgColor: string;
  title: string;
  description: string;
  img: string;
  offset: string;
  children?: React.ReactNode;
  toPage: string
}

const Banner: React.FC<Props> = ({imageBanner, classOfPicture, bgColor, title, description, img, offset, toPage, children}) => {

  
const [backgroundColor, setBackgroundColor] = useState(`${bgColor}`)

function handleBackgroundColor() {
  if (`${bgColor}` === 'btn-pink-circle btn-circle1') {
    setBackgroundColor("btn-pink-circle-hover-gold")
  } else if (`${bgColor}` === 'btn-pink-circle btn-circle2') {
    setBackgroundColor("btn-pink-circle-hover-pink")
  } else {
    setBackgroundColor("btn-pink-circle-hover-white");
  }
}
 
  return (
    <div className="container-fluid banner">
      <div className="row d-flex flex-column justify-content-center">
        <div className={`${offset} p-0 mb-5`} style={{position: "relative"}}>
          <img src={imageBanner}
            alt="banner picture"
            className={`${classOfPicture}`} />
             <Link href={`${toPage}`}>
            <button className={`${backgroundColor} rounded-circle banner-text-wrapper`} 
                    onClick={() => handleBackgroundColor()}>
              <img src={`${img}`} alt="spark elements" />
              <h3 className="text-center">{title}</h3>
              <p className="small">{description}</p>
              <img src="../pictures/icons/arrow.png" alt="arrow" />
              {children}
            </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
