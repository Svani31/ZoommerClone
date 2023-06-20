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
                  this is quantity
                  {productEl.quantity}
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
                  <Typography variant="h5">{cartEl.quantity}</Typography>
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
