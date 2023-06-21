// @ts-nocheck
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import ajax from "./util/service/ajax";
import { BanckEndItem } from "./@types/general";

type initalProps = {
  cartItem: BanckEndItem[];
};
const initalState: initalProps = { cartItem: [] };

enum REDUCER_ACTION {
  ADD_CART,
  INCREASE_QUANTITY,
  DEACREASE_QUANTITY
}

type REDUCER_ACTION_TYPES = {
  type: REDUCER_ACTION;
  item:BanckEndItem;
};

const reducer = (state = initalState, action: REDUCER_ACTION_TYPES) => {
  switch (action.type) {
    case REDUCER_ACTION.ADD_CART:
    const updatedCartItem = [...state.cartItem];
    const existingItemIndex = updatedCartItem.findIndex((item)=> item.id === action.item.id);
    if(existingItemIndex !== -1){
      updatedCartItem[existingItemIndex].quantity++
    }else{
      updatedCartItem.push({...action.item,quantity:1})
    }
    return {...state,cartItem:updatedCartItem}
    case REDUCER_ACTION.INCREASE_QUANTITY:
      const increasItem = [...state.cartItem]
      const existringIncrease = increasItem.findIndex((item)=> item.id === action.item.id)
      if(existringIncrease !== -1){
        increasItem[existringIncrease].quantity++
      }
      return {...state,cartItem:increasItem}

    case REDUCER_ACTION.DEACREASE_QUANTITY:
      const decreaseItem = [...state.cartItem]
      const existringDeacrease = decreaseItem.findIndex(
        (item)=> item.id === action.item.id)
      if(existringDeacrease !== -1){
        if(decreaseItem[existringDeacrease].quantity > 1){
          decreaseItem[existringDeacrease].quantity--
        }else{
          decreaseItem.splice(existringDeacrease,1)
        }
      }
      return {...state,cartItem:decreaseItem}


      default:
        return state
  }
};


// const updatedCartItem = [...state.cartItem];
//       const existingItemIndex = updatedCartItem.findIndex((item) => item.id === action.item.id);
//       if (existingItemIndex !== -1) {
//         updatedCartItem[existingItemIndex].quantity++;
//       } else {
//         updatedCartItem.push({ ...action.item, quantity: 1 });
//       }
//       return { ...state, cartItem: updatedCartItem };

const Quantity = () => {
  const [products, setProducts] = useState<BanckEndItem[]>([]);
  const [state,dispatch] = useReducer(reducer,initalState)
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await ajax.post("/products", {
        keyword: "",
        page_size: 5,
        page_number: 0,
      });

      setProducts(
        data.products.map((productEl: BanckEndItem) => {
          return {
            ...productEl,
            quantity: 0,
          };
        })
      );
    };
    getProducts();
  }, []);

  const addCartHandler =async (productId:string) =>{
    const {data} = await ajax.get(`product/${productId}`)
    dispatch({type:REDUCER_ACTION.ADD_CART,item:data})
  }
  
  const increasQuantityHandler = (productId:string) =>{
    dispatch({type:REDUCER_ACTION.INCREASE_QUANTITY,item:{id:productId}})
  }

  const deacreaseQuantityHandler = (productId:string) =>{
    dispatch({type:REDUCER_ACTION.DEACREASE_QUANTITY,item:{id:productId}})
  }

  console.log(state.cartItem,"this is cat item")
  return (
    <Box>
      <Typography variant="h3">Products</Typography>
      <Box>
        {products.map((productEl) => {
          return (
            <Box key={productEl.id}>
              <Paper>
                {productEl.title}
                <strong>
                </strong>
                <Button onClick={()=> addCartHandler(productEl.id)}>Add To Cart</Button>
              </Paper>
            </Box>
          );
        })}
      </Box>
      <Box>
        <Typography variant="h3">Cart</Typography>
        <Box>
          {state.cartItem.map((cartEl:BanckEndItem)=>{
            return(
              <Box key={cartEl.id}>
                <Paper>
                  <Typography variant="h5">{cartEl.title}</Typography>
                  <Typography variant="h5">Price:{Math.floor(Number(cartEl.price))}</Typography>
                  <h1 onClick={()=> increasQuantityHandler(cartEl.id)} >+</h1>
                  <Typography variant="h5">{cartEl.quantity}</Typography>
                  <h1 onClick={()=> deacreaseQuantityHandler(cartEl.id)}>-</h1>
                </Paper>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default Quantity;
