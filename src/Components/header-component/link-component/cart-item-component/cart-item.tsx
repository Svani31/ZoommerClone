import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import ajax from "../../../../util/service/ajax";
import { useStore } from "../../../../util/store/store";
import { BanckEndItem } from "../../../../@types/general";
import { useTranslation } from "react-i18next";
import "./cart-item.scss";

const CartItemSection = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState(0);
  const { t } = useTranslation();

  const { cartItem, removeItemHandler,increseQuantityHandler,decriseQuantityHandler } = useStore();

  useEffect(() => {
    const number = cartItem.map((cartEl: BanckEndItem) => {
      return Number(cartEl.price) * cartEl.quantity;
    });
    if (number.length > 0) {
      const calculateTotal = number.reduce(
        (price: number, item: number) => price + item
      );
      setPrice(Math.floor(calculateTotal));
    } else {
      setPrice(0);
    }
  }, [cartItem]);


  return (
    <Box width={"200px"} className="header__cartitem">
      <Link className="cartitem__link" to={"/cart"}>
        <ShoppingCartOutlinedIcon />
        <span>
          <span className="cartitem__length">{cartItem?.length}</span>
          {Math.floor(price)} ლ
        </span>
      </Link>
      <Box className="cartitem__dropdown">
        <Box className="cartitem__inner">
          <h5>{t("global.Cart")}</h5>
          <Box className="cart__items">
            {/* cart item on dropdown Map here */}
            {cartItem?.map((cartItemEl: BanckEndItem) => (
              <Box key={cartItemEl.id} className="cart__item_inner">
                <Box className="cart__item_left">
                  <span>
                    <HighlightOffOutlinedIcon
                      onClick={(e) => removeItemHandler(cartItemEl.id)}
                    />
                  </span>
                  <img src={cartItemEl.images[0]} alt="" />
                </Box>
                <Box className="cart__item_right">
                  <span className="cart__item_description">
                    {cartItemEl.title}
                  </span>
                  <Box className="quantity">
                    <span className="quantity__buttons">
                      <RemoveOutlinedIcon
                        onClick={() => decriseQuantityHandler(cartItemEl.id)}
                        sx={{ fontSize: "12px" }}
                      />
                    </span>
                    {cartItemEl.quantity}
                    <span className="quantity__buttons">
                      <AddOutlinedIcon
                        onClick={() => increseQuantityHandler(cartItemEl.id)}
                        sx={{ fontSize: "12px" }}
                      />
                    </span>
                    <span className="quantity__price">
                      {Math.floor(Number(cartItemEl.price)) * cartItemEl.quantity} ₾
                    </span>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <h4>
            {t("global.Sub-total")}: <span>₾{price}</span>
          </h4>
          <Link className="cartitem__link" to={"/cart"}>
          <button>{t("global.Enter-cart")}</button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItemSection;
