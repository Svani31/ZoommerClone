import { useEffect, useReducer, useState } from "react";
// improting Mui Components
import { Box, Button, Paper, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// importing Photos
import h from "../../../Images/Product-Title/hot-proposal.svg";
// importing Css
import "../hot-sale-component/hot-sale.scss";

// improt ajax api
import ajax from "../../../util/service/ajax";

// import carousel library
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

// import context API
import { useStore } from "../../../util/store/store";
import { Link } from "react-router-dom";
import { BanckEndItem } from "../../../@types/general";

type HotSaleProps = {
  title: string;
  page_number: number;
  page_size: number;
  increaseProduct:any;
};

const HotSale = ({ title, page_number, page_size,increaseProduct}: HotSaleProps) => {
  const [products, setProducts] = useState<BanckEndItem[]>([]);
  
  const [pageSize,setPageSize] = useState(page_size)

  const { addProductHandler } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await ajax.post("/products", {
        page_size: pageSize,
        page_number: page_number,
        keyword: "",
      });
      setProducts(
        data.products.map((productEl: BanckEndItem) => ({
          productEl,
          quantity: 0,
        }))
      );
    };
    fetchData();
  }, [page_size,pageSize]);
  


  return (
    <Box
      sx={{
        paddingTop: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          textAlign: "center",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <Box className="title__image">
          <img src={h} alt="" />
        </Box>
        <h2 className="hot__sale">{title}</h2>
      </Box>
      <Box className="products__container">
        {/* there is map  */}
        {products.map((productItem: any) => {
          const { productEl, quantity } = productItem;
          return (
            <Box
              key={productEl.id}
              className="product__box"
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                // width:"280px",
                padding: "15px",
                cursor: "pointer",
                position: "relative",
              }}
            >
              <Paper
                sx={{
                  width: "230px",
                  borderRadius: "12px",
                }}
              >
                <Link to={`product/${productEl.id}`}>
                  <CarouselProvider
                    naturalSlideWidth={3}
                    naturalSlideHeight={2}
                    totalSlides={productEl.images.length}
                    infinite={true}
                    dragEnabled={true}
                  >
                    <Slider>
                      {productEl.images.map((imageEl: string) => {
                        return (
                          <>
                            <Slide key={imageEl.length} index={productEl.id}>
                              <img
                                className="slider__img"
                                src={imageEl}
                                alt=""
                              />
                            </Slide>
                          </>
                        );
                      })}
                    </Slider>
                    <Box className="product__carousel_btn">
                      <ButtonBack className="prev__btn visable">
                        <ArrowBackIosNewOutlinedIcon
                          sx={{ fontSize: "12px" }}
                        />
                      </ButtonBack>

                      <ButtonNext className="next__btn visable">
                        <ArrowForwardIosOutlinedIcon
                          sx={{ fontSize: "12px" }}
                        />
                      </ButtonNext>
                    </Box>
                  </CarouselProvider>
                  <h4>{productEl.title}</h4>
                  <Box className="product__price">
                    <h3>
                      {Math.round(productEl.price)} ₾{" "}
                      <span>{Math.round(productEl.price) - 100} ₾</span>
                    </h3>
                    <h5>
                      {Math.round(productEl.price / 12)} ₾ <span>- დან</span>
                    </h5>
                  </Box>
                </Link>
                <Box
                  sx={{
                    borderTop: "1px solid #eff0f2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    margin: "0px 10px",
                    textAlign: "center",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      textAlign: "center",
                      userSelect: "none",
                    }}
                  >
                    <AccessTimeOutlinedIcon />
                    <span>დრო პროდუქტის</span>
                  </Box>
                  <Box
                    className="product__cart_container"
                    onClick={() => addProductHandler(productEl.id)}
                  >
                    <ShoppingCartOutlinedIcon className="product__cart" />
                  </Box>
                </Box>
              </Paper>
            </Box>
          );
        })}
      <button className="show__more" onClick={()=> increaseProduct(setPageSize)} >მეტის ნახვა <span> ^ </span></button>
      </Box>
    </Box>
  );
};

export default HotSale;
