import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
// improting Mui Components
import { Box, Paper, Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// importing Photos
import h from "../../../Images/Product-Title/hot-proposal.svg";
// importing Css
import "../hot-sale-component/hot-sale";

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
import { useStore } from "../../../util/store/store";

// improt store

type ProductProps = {
  id:string
}

type ProductState = {
  productEl:ProductProps
}

const initalState:ProductState = {productEl:{id:""}}

const enum REDUCER_ACTION_TYPES {
  ADD_PRODUCT_ID
}

type REDUCER_ACTION_PROPS = {
  type:REDUCER_ACTION_TYPES,
  id:ProductProps
}

const reducer = (state:ProductState,action:REDUCER_ACTION_PROPS) =>{
  switch(action.type){
    case REDUCER_ACTION_TYPES.ADD_PRODUCT_ID:
      return {...state,productEl:action.id}
  }
}


const TopProduct = () => {
  
  const [products, setProducts] = useState<string[]>([]);


  const {addProductHandler} = useStore()

  useEffect(() => {
    const fetchData = async () => {
      const respons = await ajax.post("/products", {
        page_size: 10,
        page_number: 50,
        keyword: "",
      });
      setProducts(respons.data.products);
    };
    fetchData()
  }, []);
  
  // console.log(products)

  return (
    <div
      style={{
        paddingTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          textAlign: "center",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        <div className="title__image">
          <img src={h} alt="" />
        </div>
        <h2 className="hot__sale">Top პროდუქტი</h2>
      </div>
      <div className="products__container">
        {/* there is map  */}
        {products.map((productEl: any) => {
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
                position:"relative"
              }}
            >
              <Paper
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
                  // dragEnabled={false}
                >
                  <Slider>
                    {productEl.images.map((imageEl: any) => {
                      return (
                        <>
                        <Link to={`product/${productEl.id}`} >
                          <Slide key={productEl.id} index={productEl.id}>
                            <img className="slider__img" src={imageEl} alt="" />
                          </Slide>
                        </Link>
                        </>
                      );
                    })}
                  </Slider>
                  <div className="product__carousel_btn">
                    <ButtonBack className="prev__btn visable">
                      <ArrowBackIosNewOutlinedIcon sx={{fontSize:"12px"}}/>
                    </ButtonBack>

                    <ButtonNext className="next__btn visable">
                      <ArrowForwardIosOutlinedIcon sx={{fontSize:"12px"}} />
                    </ButtonNext>
                  </div>
                </CarouselProvider>

                <h4>{productEl.title}</h4>
                <div className="product__price">
                  <h3>
                    {Math.round(productEl.price)} ₾{" "}
                    <span>{Math.round(productEl.price) - 100} ₾</span>
                  </h3>
                  <h5>
                    {Math.round(productEl.price / 12)} ₾ <span>- დან</span>
                  </h5>
                </div>
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
                  <Box className="product__cart_container" onClick={() => addProductHandler(productEl.id)}>
                    <ShoppingCartOutlinedIcon className="product__cart" />
                  </Box>
                </Box>
              </Paper>
            </Box>
          );
        })}
      </div>
    </div>
  );
};

export default TopProduct;
