import "./cart-item.scss";
// import Mui Components here
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Box } from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// improt React Rout Dom
import { Link } from "react-router-dom";
import photo from "../../../../Images/tester image.jpeg";
import { useEffect, useReducer, useState } from "react";
// import ajax
import ajax from "../../../../util/service/ajax";
import { useStore } from "../../../../util/store/store";





const CartItemSection = () => {

  const [quantity, setQuantity] = useState<number>(1);
  const [itemPrice, setItemPrice] = useState<string>(`3333`);
  const [cartItemProduct,setCartItemProduct] = useState<string[]>([])
  const {productId}  = useStore()


  useEffect(()=>{
    const getProductId = async () =>{
      const {data} = await ajax.get(`${import.meta.env.VITE_API_KEY}/product/${productId}`)
      setCartItemProduct((prev) => [...prev,data])
    }
    if(productId.length > 0){
      getProductId()
    }
  },[productId])

  console.log(cartItemProduct)
  return (
    <Box className="header__cartitem">
      <Link className="cartitem__link" to={"/cart"}>
        <ShoppingCartOutlinedIcon />
        <span><span className="cartitem__length">{cartItemProduct.length}</span>{itemPrice} ლ</span>
      </Link>
      <Box className="cartitem__dropdown">
        <Box className="cartitem__inner">
          <h5>კალათა</h5>
          {/* cart item on dropdown Map here */}
          <Box className="cart__items">
            <Box className="cart__item_inner">
              <Box className="cart__item_left">
                <span>
                  <HighlightOffOutlinedIcon />
                </span>
                <img src={photo} alt="" />
              </Box>
              <Box className="cart__item_right">
                <span className="cart__item_description">
                  Apple iPhone 14 Pro | 128GB Deep Purple
                </span>
                <Box className="quantity">
                  <span className="quantity__buttons">
                    <RemoveOutlinedIcon
                      onClick={() => setQuantity((prev) => prev > 1 ? prev - 1 : 1)}
                      sx={{ fontSize: "12px" }}
                    />{" "}
                  </span>{" "}
                  {quantity}{" "}
                  <span className="quantity__buttons">
                    <AddOutlinedIcon
                      onClick={() => setQuantity((prev) => prev + 1)}
                      sx={{ fontSize: "12px" }}
                    />
                  </span>{" "}
                  <span className="quantity__price">{parseInt(itemPrice) * quantity} ₾</span>
                </Box>
              </Box>
            </Box>
          </Box>
          <h4>
            ჯამი : <span>0 ₾</span>
          </h4>
          <button>კალათაში გადასვლა</button>
        </Box>
      </Box>
    </Box>
  );
};

export default CartItemSection;
