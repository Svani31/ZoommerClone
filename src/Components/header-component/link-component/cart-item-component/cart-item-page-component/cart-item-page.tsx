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
  const { cartItem, dispatch } = useStore();
  const { t } = useTranslation();

  const removeItemHandler = () => {
    dispatch({ type: REDUCER_ACTION_TYPES.ADD_PRODUCT_ID, cartItem: null });
  };

  return (
    <Box>
      <Navigation />
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
              <Box className="product__info_inner">
                <Box className="product__info_nav">
                  <input type="checkbox" />
                  <Typography className="title" variant="subtitle2">
                    <img src={cartEl.images[0]} alt="product image" />{" "}
                    {cartEl.title}
                  </Typography>
                  <Typography variant="subtitle2">123123</Typography>
                  <Typography variant="subtitle2">
                    {Number(cartEl.price)}
                  </Typography>
                  <Typography variant="subtitle2">
                    {Number(cartEl.price)}
                  </Typography>
                </Box>{" "}
              </Box>
            );
          })}
          <Button onClick={() => removeItemHandler()} className="btn-clear">
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
