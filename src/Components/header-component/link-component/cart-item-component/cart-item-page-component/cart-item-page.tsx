import React from "react";

// import MUI items
import { Box, Typography, Button } from "@mui/material";

// improting scss
import "./cart-item-page.scss";
import "../../../../../mixin.scss";

import { useTranslation } from "react-i18next";
import Navigation from "../../../../navigation/navigation";

const CartItemPage = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Navigation />
      <Box className="cart__item_store">
        <Box className="product__info">
          <Box>
            <Box>info__header</Box>
          </Box>
          <Box>
            <Box>
                product__info
            </Box>
          </Box>
          <Button>{t("global.Clear-cart")}</Button>
        </Box>
        <Box className="product__pice"></Box>
      </Box>
    </Box>
  );
};

export default CartItemPage;
