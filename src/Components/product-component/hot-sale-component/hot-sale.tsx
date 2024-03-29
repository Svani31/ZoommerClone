import { useEffect, useReducer, useState } from "react";
// improting Mui Components
import { Box, Button, Paper, Typography, Skeleton } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// importing Photos
import h from "../../../Images/Product-Title/hot-proposal.svg";
// importing Css
import "../hot-sale.scss";

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
import { useTranslation } from "react-i18next";
type HotSaleProps = {
  title: string;
  page_number: number;
  page_size: number;
  increaseProduct: any;
};

const HotSale = ({
  title,
  page_number,
  page_size,
  increaseProduct,
}: HotSaleProps) => {
  const [products, setProducts] = useState<BanckEndItem[]>([]);
  const [pageSize, setPageSize] = useState(page_size);
  const [isLoading, setIsLoading] = useState(true);
  const {t} = useTranslation()
  const { addProductHandler,isAdmin } = useStore();

  useEffect(()=>{
    if(window.innerWidth < 1000){
      setPageSize(prev => prev + 2)
    }
  },[window.innerWidth])

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
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [page_size, pageSize]);

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
        {products.map((productItem: BanckEndItem) => {
          const { productEl, quantity }: BanckEndItem = productItem;
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
              className="product__paper"
                sx={{
                  width: "230px",
                  borderRadius: "12px",
                }}
              >
                  <CarouselProvider
                    naturalSlideWidth={3}
                    naturalSlideHeight={2}
                    totalSlides={productEl.images.length}
                    infinite={true}
                    dragEnabled={true}
                  >
                    <Link className="product__link" to={`product/${productEl.id}`}>
                    <Slider key={productEl.id}>
                      {productEl.images.map((imageEl: string) => {
                        return (
                          <>
                            <Slide key={imageEl.length} index={productEl.id}>
                              {isLoading ? (
                                <Skeleton width={300} height={150} />
                              ) : (
                                <img
                                  className="slider__img"
                                  src={imageEl}
                                  alt=""
                                />
                              )}
                            </Slide>
                          </>
                        );
                      })}
                    </Slider>
                    </Link>
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
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <>
                    <Link className="product__link" to={`product/${productEl.id}`}>
                    <h4 className="product__title">{productEl.title}</h4>
                    </Link>
                    </>
                  )}
                  <Box className="product__price">
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <h3>
                        {Math.round(productEl.price)} ₾{" "}
                        <span>{Math.round(productEl.price) - 100} ₾</span>
                      </h3>
                    )}
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      <h5>
                        {Math.round(productEl.price / 12)} ₾ <span>- დან</span>
                      </h5>
                    )}
                  </Box>
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
                    <span></span>
                  </Box>
                  <Box
                    className="product__cart_container"
                    onClick={() => addProductHandler(productEl.id)}
                  >
                    <ShoppingCartOutlinedIcon className="product__cart" />
                  </Box>
                  {isAdmin ? (<Link to={`/admin/${productEl.id}`}><Button>Change</Button></Link>) : ("")}
                </Box>
              </Paper>
            </Box>
          );
        })}
      </Box>
        <button
          className="show__more"
          onClick={() => increaseProduct(setPageSize)}
        >
          {t("global.show-more")} <span> ^ </span>
        </button>
    </Box>
  );
};

export default HotSale;
