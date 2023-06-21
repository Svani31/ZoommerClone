import React from "react";

// import MUI items
import { Box, Typography, Button } from "@mui/material";

// improting scss
import "./cart-item-page.scss";

import { useTranslation } from "react-i18next";
import Navigation from "../../../../navigation/navigation";
import { useStore } from "../../../../../util/store/store";
import { REDUCER_ACTION_TYPES } from "../../../../../util/store/action";

const CartItemPage = () => {
  const { cartItem, increseQuantityHandler,decriseQuantityHandler} = useStore();
  const { t } = useTranslation();

  // const removeItemHandler = () => {
  //   dispatch({ type: REDUCER_ACTION_TYPES.ADD_PRODUCT_ID, cartItem: null });
  // };

  return (
    <Box>
      <Navigation name={"Cart Item"} />
      <Box className="product">
        <Box className="product__info">
          <Box className="product__info_header">
            <Box className="product__info_nav">
              <input type="checkbox" />
              <Typography variant="subtitle2">პროდუქტის დასახელება</Typography>
              <Typography variant="subtitle2">რაოდენობა</Typography>
              <Typography variant="subtitle2">ფასი</Typography>
              <Typography variant="subtitle2">ჯამი</Typography>
            </Box>
          </Box>
          {cartItem?.map((cartEl) => {
            return (
              <Box key={cartEl.id} className="product__info_inner">
                <Box className="product__info_nav">
                  <input type="checkbox" />
                  <Typography className="title" variant="subtitle2">
                    <img src={cartEl.images[0]} alt="product image" />{" "}
                    {cartEl.title}
                  </Typography>
                  <Typography className="product__quantity" variant="subtitle2"><span onClick={()=> increseQuantityHandler(cartEl.id)}>+</span>   {cartEl.quantity} <span onClick={()=>decriseQuantityHandler(cartEl.id) }>-</span></Typography>
                  <Typography className="product__price" variant="subtitle2">
                    {Math.floor(Number(cartEl.price))}
                  </Typography>
                  <Typography className="product__price" variant="subtitle2">
                    {Math.floor(Number(cartEl.price)* cartEl.quantity)}
                  </Typography>
                </Box>{" "}
              </Box>
            );
          })}
          <Button  className="btn-clear">
            {t("global.Clear-cart")}
          </Button>
        </Box>
        <Box className="product__pice">
          <h1>dfgdg</h1>
          <h1>dfgdg</h1>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItemPage;
