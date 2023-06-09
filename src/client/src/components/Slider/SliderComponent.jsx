import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./slider.module.css";
import "../../global.css";

const SliderComponent = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAfterChange = (currentSlide) => {
    setActiveIndex(currentSlide);
  };

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    className: styles.sliderContainer,
    afterChange: handleAfterChange,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {props.images.map((image, index) => (
        <div
          key={index}
          className={`${styles.sliderItem} ${
            index === activeIndex ? styles.activeSlide : " "
          }`}
        >
          <img src={image} alt={index} />
        </div>
      ))}
    </Slider>
  );
};

export default SliderComponent;
