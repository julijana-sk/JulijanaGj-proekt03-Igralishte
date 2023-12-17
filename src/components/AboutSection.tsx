import React from "react";

interface Props {
  title: string
  content: string;
  image: string
}

const AboutSection: React.FC<Props> = ({title, content, image}) => {

  return (
    <div className="mb-5">
      <div className="col-12 p-0 mb-4">
        <img src={`${image}`} alt="about-banner" style={{width: "100%"}}/>
      </div>
      <h2 className="title text-left">{title}</h2>
      <p className="text-left">{content}</p>
    </div>
  );
};

export default AboutSection;