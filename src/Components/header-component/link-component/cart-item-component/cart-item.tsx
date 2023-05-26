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

import "./cart-item.scss";
import { REDUCER_ACTION_TYPES } from "../../../../util/store/action";

const CartItemSection = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState(0);

  const { cartItem, dispatch } = useStore();

  const removeItemHandler = (id: string) => {
    dispatch({ type: REDUCER_ACTION_TYPES.REMOVE_PRODUCT, id: id });
  };

  useEffect(() => {
    const number = cartItem.map((cartEl: BanckEndItem) => {
    return Number(cartEl.price);
    });
    if (number.length > 0) {
      const calculateTotal = number.reduce((price: number, item: number) => price + item);
      setPrice(calculateTotal);
    }
    }, [cartItem]);

    
  return (
    <Box className="header__cartitem">
      <Link className="cartitem__link" to={"/cart"}>
        <ShoppingCartOutlinedIcon />
        <span>
          <span className="cartitem__length">{cartItem?.length}</span>
          {Math.floor(price)} ლ
        </span>
      </Link>
      <Box className="cartitem__dropdown">
        <Box className="cartitem__inner">
          <h5>კალათა</h5>
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
                        // onClick={() => changeQuantity(cartItemEl)}
                        sx={{ fontSize: "12px" }}
                      />
                    </span>
                    {cartItemEl.amount}
                    <span className="quantity__buttons">
                      <AddOutlinedIcon
                        // onClick={}
                        sx={{ fontSize: "12px" }}
                      />
                    </span>
                    <span className="quantity__price">
                      {parseInt(cartItemEl.price) * quantity} ₾
                    </span>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <h4>
            ჯამი : <span> ₾</span>
          </h4>
          <button>კალათაში გადასვლა</button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItemSection;
