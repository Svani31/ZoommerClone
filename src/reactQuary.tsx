import { Button } from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";
import ajax from "./util/service/ajax";
import { BanckEndItem } from "./@types/general";

type ProductProps = {
  amount: string;
  brand: string;
  categories: string[];
  description: string;
  id: string;
  images: string[];
  price: string;
  rating: string;
  title: string;
  quantity:number;
};

type InitalProps = {
  productItems: ProductProps[];
};

const initalValue: InitalProps = { productItems: [] };

enum REDUCER {
  ADD_PRODUCTS,
}

type ACTIONS = {
  type: REDUCER;
  items: ProductProps;
};

// const reducer = (state = initalValue, action: ACTIONS) => {
//   switch (action.type) {
//     case REDUCER.ADD_PRODUCTS:
//       const newItems = [...state.productItems].find((item)=> item.id ===action.items.id)
//       console.log(state.productItems,"this is state producitem")
//       return { ...state, productItems: [...state.productItems, action.items] };
//     default:
//       return state;
//   }
// };

const reducer = (state = initalValue, action: ACTIONS) => {
  switch (action.type) {
    case REDUCER.ADD_PRODUCTS:
      const existingItem = state.productItems.find((item) => item.id === action.items.id);
      if (existingItem) {
        const updatedItems = state.productItems.map((item) =>
          item.id === action.items.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, productItems: updatedItems };
      } else {
        return { ...state, productItems: [...state.productItems, { ...action.items, quantity: 1 }] };
      }
    default:
      return state;
  }
};

const Reducer: React.FC = () => {
  const [cartItem, setCartItems] = useState([]);
  const [state, dispatch] = useReducer(reducer, initalValue);
  useEffect(() => {
    const getProduct = async () => {
      const { data } = await ajax.post("/products", {
        keyword: "",
        page_size: 5,
        page_numbe: 0,
      });
      setCartItems(
        data.products.map((product: ProductProps) => ({ product, quantity: 0 }))
      );
    };
    getProduct();
  }, []);
  const addToCartItem = async (id:string) => {
    const { data: product } = await ajax.get(`product/${id}`);
    dispatch({ type: REDUCER.ADD_PRODUCTS, items: product });
  };
  
  console.log(state.productItems)
  return (
    <div>
      <h1 style={{ display: "flex", justifyContent: "center" }}>Title</h1>
      <div>
        <div>
          <h1>Cart List</h1>
          <div>
            {cartItem.map((cartEl: BanckEndItem) => {
              const {product,quantity} = cartEl
              return (
                <div key={product.id} style={{ boxShadow: "1px 1px 1px 1px" }}>
                  <h1>{product.title}</h1>
                  <span>{quantity}</span>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={(e) => addToCartItem(product.id)}
                  >
                    Add To Cart
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <h1>this is quantity</h1>
        {state.productItems.map((item)=>{
          return(
            <div>
              <h1>{item.title}</h1>
              <h1>{item.quantity}</h1>
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Reducer;
