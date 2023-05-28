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

  useEffect(() => {
    const getItem = async () => {
      const { data } = await ajax.get(`product/${id}`);
      setItem(data);
    };
    getItem();
  }, []);

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
          <Typography className="prev__price" variant="h5">
            {Math.floor(Number(item?.price) - 100)} ₾
          </Typography>
          <Typography className="active__price" variant="h5">
            {Math.floor(Number(item?.price))} ₾
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
              <Typography className="title" variant="h4">
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
                  <Box className="border">
                    <Box className="button"></Box>
                  </Box>
                  <Box className="border">
                    <Box className="button"></Box>
                  </Box>
                  <Box className="border">
                    <Box className="button"></Box>
                  </Box>
                  <Box className="border">
                    <Box className="button"></Box>
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductById;
