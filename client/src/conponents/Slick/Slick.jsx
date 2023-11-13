import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Slick = ({arrImg}) => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
    };
    return (
      <div>
        <Slider settings = {settings}>
          {arrImg.map((image) => {
            return (
                <img src = {image}></img>
            )
          })}
        </Slider>
      </div>
    );
}

export default Slick;