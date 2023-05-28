import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default ({item}) => (

<Carousel autoPlay width={360}>
    <div>
      <img alt="" src=""/>
    </div>
    <div>
      <img alt="" src="/src/Images/Brands/0125036_google.png" />
    </div>
    <div>
      <img alt="" src="/src/Images/Brands/0160609_jbl.png" />
    </div>
 
  </Carousel>
);
