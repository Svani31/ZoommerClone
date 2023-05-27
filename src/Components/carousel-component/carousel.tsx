import React from "react";

import CarouselNav from "./carousel__navigation/carousel__nav";
// import slider librery components
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";

import "pure-react-carousel/dist/react-carousel.es.css";

// importing csss
import "../carousel-component/carousel.scss";
import "../header-component/header.scss"

// improting mui icons
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

// import slider photos
import firstPhotos from "../../Images/CarouselImages/zoomer request 1.png";
import secondPhotos from "../../Images/CarouselImages/iphone 14 pro.png";
import therdPhotos from "../../Images/CarouselImages/tv 3.png";
import forthPhotos from "../../Images/CarouselImages/whatch 4.png";
import fifthPhotos from "../../Images/CarouselImages/tv 5.png";
import sixthPhotos from "../../Images/CarouselImages/realm phone 6.png";
import seventhPhotos from "../../Images/CarouselImages/jbl headphone 7.png";
import eightPhotos from "../../Images/CarouselImages/photocamera 8.png";

const AppSlider = () => {
  return (
    <div style={{
      position:"relative",
    }}>
      <CarouselNav />
      <CarouselProvider
        naturalSlideWidth={15}
        naturalSlideHeight={3}
        totalSlides={8}
        infinite={true}
        dragEnabled={true}
      >
        <Slider>
          <Slide index={0}>
            <img className="slider__img" src={firstPhotos} alt="" />
          </Slide>
          <Slide index={1}>
            <img className="slider__img" src={secondPhotos} alt="" />
          </Slide>
          <Slide index={2}>
            <img className="slider__img" src={therdPhotos} alt="" />
          </Slide>
          <Slide index={3}>
            <img className="slider__img" src={forthPhotos} alt="" />
          </Slide>
          <Slide index={4}>
            <img className="slider__img" src={fifthPhotos} alt="" />
          </Slide>
          <Slide index={5}>
            <img className="slider__img" src={sixthPhotos} alt="" />
          </Slide>
          <Slide index={6}>
            <img className="slider__img" src={seventhPhotos} alt="" />
          </Slide>
          <Slide index={7}>
            <img className="slider__img" src={eightPhotos} alt="" />
          </Slide>
        </Slider>

        <div className="carousel__button">

          <ButtonBack className="prev__btn">
            <ArrowBackIosNewOutlinedIcon />
          </ButtonBack>

          <ButtonNext  className="next__btn">
            <ArrowForwardIosOutlinedIcon />
          </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};

export default AppSlider;
