import React, { Component } from "react";
import ReactDOM from "react-dom";
// import react route dom
import { Route, Routes, useParams } from "react-router-dom";
// import material ui
import { Box, Typography, Button } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import RepeatIcon from "@mui/icons-material/Repeat";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
// import Css
import "./product-by-id.scss";
import { useEffect, useState } from "react";
import ajax from "../../../../util/service/ajax";
import { BanckEndItem } from "../../../../@types/general";
import { useStore } from "../../../../util/store/store";
// import Carousel from "./product-id-carousel/carousel";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ProductById = () => {

  
  const { id } = useParams();
  const [item, setItem] = useState<BanckEndItem | null>(null);
  const { addProductHandler } = useStore();
  const [storageValue,setStorageValue] = useState<Number | string>("128")
  const [titleColor,setColor] = useState<string>("black")

  // cooldown 
  const [cooldown, setCooldown] = useState(0);
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  useEffect(() => {
    const getItem = async () => {
      const { data } = await ajax.get(`product/${id}`);
      setItem(data);
    };
    getItem();
  }, []);

  const getData = (e:any) =>{
    setStorageValue(e.target.dataset.storage)
  }
  useEffect(() => {
    // Function to start the cooldown
    const startCooldown = () => {
      // Set the cooldown to 24 hours (24 hours * 60 minutes * 60 seconds)
      setCooldown(24 * 60 * 60);
    };

    // Check if the cooldown has already been started
    const storedCooldown = localStorage.getItem('cooldown');
    if (storedCooldown) {
      const remainingCooldown = parseInt(storedCooldown);
      if (remainingCooldown > 0) {
        setCooldown(remainingCooldown);
      } else {
        startCooldown();
      }
    } else {
      startCooldown();
    }
  }, []);

  useEffect(() => {
    // Update the localStorage with the remaining cooldown
    localStorage.setItem('cooldown', cooldown.toString());
  }, [cooldown]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease the cooldown by 1 every second
      setCooldown((prevCooldown) => prevCooldown > 0 ? prevCooldown - 1 : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const remainingHours = Math.floor(cooldown / 3600);
    const remainingMinutes = Math.floor((cooldown % 3600) / 60);
    const remainingSeconds = cooldown % 60;

    setHours(remainingHours.toString().padStart(2, '0'));
    setMinutes(remainingMinutes.toString().padStart(2, '0'));
    setSeconds(remainingSeconds.toString().padStart(2, '0'));
  }, [cooldown]);
  

  const changeTitleColor = (e:any) =>{
    setColor(e.target.dataset.color)
  }

  return (
    <Box className="product__form">
      <Box className="navigation">
        <Box className="nav__left">
          <Typography className="nav__title" variant="h6">
            <ListOutlinedIcon /> ნავიგაცია
          </Typography>
          <Typography variant="subtitle2">ყველა</Typography>
        </Box>
        <Box className="nav__right">
          <Typography className="nav__directory">
            მთავარი <KeyboardArrowRightIcon />
          </Typography>
        </Box>
      </Box>
      <Box className="product">
        <aside className="product__sidebar">
          <Box className="product__time">
            <Box className="product__time_info">
            <Typography variant="subtitle1">დღე <Typography>0</Typography></Typography>
            <Typography variant="subtitle1">სათ <Typography>{hours[0]}{hours[1]}</Typography></Typography>
            <Typography variant="subtitle1">წთ <Typography>{minutes[0]}{minutes[1]}</Typography></Typography>
            <Typography variant="subtitle1">წამი <Typography>{seconds[0]}{seconds[1]}</Typography></Typography>
            </Box>
            <AccessTimeOutlinedIcon className="mui__time"/>
          </Box>
          <Box className="product__sidebar_info">
          <Typography className="prev__price" variant="h5">
            {Math.floor(Number(item?.price) - 100) + Number(storageValue)} ₾
          </Typography>
          <Typography className="active__price" variant="h5">
            {Math.floor(Number(item?.price)) + Number(storageValue)} ₾
          </Typography>
          <Typography className="price" variant="subtitle2">
            ფასის კონტროლი
          </Typography>
          <Typography className="price" variant="subtitle2">
            ფასის დაზღვევა
          </Typography>
          <Box className="sidebar__buttons">
            <Button
              className="sidebar__cartitem border"
              onClick={() => addProductHandler(item?.id)}
            >
              <LocalMallOutlinedIcon />
            </Button>
            <Button className="sidebar__buy border">ყიდვა</Button>
          </Box>
          <Button className="sidebar__credit border">
            განვადებით ყიდვა 20 ₾ - დან
          </Button>
          </Box>
        </aside>
        <Box className="product__item">
          <Box className="product__item_inner">
            <Carousel autoPlay width={360}>
              <div>
                <img alt="" src={item?.images[0]} />
              </div>
              <div>
                <img alt="" src={item?.images[1]} />
              </div>
              <div>
                <img alt="" src={item?.images[2]} />
              </div>
              <div>
                <img alt="" src={item?.images[3]} />
              </div>
            </Carousel>
          </Box>
          <Box className="product__info">
            <Box className="product__title">
              <Typography sx={{color:`${titleColor}`}} className="title" variant="h4">
                {item?.title}
              </Typography>
              <Typography className="comparison" variant="subtitle1">
                <RepeatIcon /> შედარება
              </Typography>
            </Box>
            <hr />
            <Box className="product__data">
              <Box className="color_side">
                <Typography variant="subtitle1">
                  ფერი:<strong>Green</strong>
                </Typography>
                <Box className="color__buttons">
                  <Box sx={titleColor === "black" ? {border:"1px solid #ff5000"}: {}} className="border">
                    <Box className="button" onClick={(e)=> changeTitleColor(e)} sx={{backgroundColor:"black"}} data-color="black"></Box>
                  </Box>
                  <Box sx={titleColor === "red" ? {border:"1px solid #ff5000"}: {}} className="border">
                    <Box className="button" onClick={(e)=> changeTitleColor(e)} sx={{backgroundColor:"red"}} data-color="red"></Box>
                  </Box>
                  <Box sx={titleColor === "purple" ? {border:"1px solid #ff5000"}: {}} className="border">
                    <Box className="button" onClick={(e)=> changeTitleColor(e)} sx={{backgroundColor:"purple"}} data-color="purple"></Box>
                  </Box>
                  <Box sx={titleColor === "blue" ? {border:"1px solid #ff5000"}: {}} className="border">
                    <Box className="button" onClick={(e)=> changeTitleColor(e)} sx={{backgroundColor:"blue"}} data-color="blue"></Box>
                  </Box>
                </Box>
              </Box>
              <Box className="data__side">
                <Typography className="data__subtitle" variant="subtitle1">
                  ეკრანის ზომა:{" "}
                  <strong style={{ color: "black" }}>6.8 inches</strong>
                </Typography>
                <Typography className="data__subtitle" variant="subtitle1">
                  ოპერატიული მეხსიერება:
                  <strong style={{ color: "black" }}>12 GB</strong>
                </Typography>
                <Typography className="data__subtitle" variant="subtitle1">
                  შიდა მეხსიერება:
                  <strong style={{ color: "black" }}>256 GB</strong>
                </Typography>
                <Typography className="data__subtitle" variant="subtitle1">
                  მთავარი კამერა:
                  <strong style={{ color: "black" }}>200+10+10+12 MP</strong>
                </Typography>
              </Box>
            </Box>
                <Typography variant="subtitle1">მეხსიერება:{Number(storageValue)}GB</Typography>
              <Box className="storage__side">
                <Button className={storageValue === "128" ? "active" : ""} onClick={(e)=> getData(e)} data-storage="128">128GB</Button>
                <Button className={storageValue === "256" ? "active" : ""} onClick={(e)=> getData(e)} data-storage="256">256GB</Button>
                <Button className={storageValue === "512" ? "active" : ""} onClick={(e)=> getData(e)} data-storage="512">512GB</Button>
                <Button className={storageValue === "1000" ? "active" : ""} onClick={(e)=> getData(e)} data-storage="1000">1TB</Button>
              </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductById;
