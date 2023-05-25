import { useEffect, useReducer, useState } from "react";
import ajax from "./util/service/ajax";
import { Box, Paper, Typography, Button } from "@mui/material";
import { BanckEndItem, itemProps } from "./@types/general";
import { confirmPasswordReset } from "firebase/auth";

type ItemProps = {
  item: BanckEndItem[];
};

const stateValue: ItemProps = { item: [] };

enum ACTION_TYPE {
  ADD_CART,
  REMOVER_FROM_CART,
}

type ACTION_PROPS = {
  type: ACTION_TYPE;
  id: any;
};

const reducer = (state = stateValue, action: ACTION_PROPS) => {
  switch (action.type) {
    case ACTION_TYPE.ADD_CART:
      return { ...state, item: [...state.item, action.id] };
    case ACTION_TYPE.REMOVER_FROM_CART:
      const newItem = [...state.item].filter(
        (itemEl) => itemEl.id !== action.id
      );
      return { ...state, item: newItem };
  }
};

const Create = () => {
  const [products, setProducts] = useState<BanckEndItem[]>([]);
  const [quantity, setQuantity] = useState(0);

  const [state, dispatch] = useReducer(reducer, stateValue);
  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await ajax.post("products", {
        keyword: "",
        page_size: 5,
        page_number: 0,
      });
      setProducts(data.products);
    };
    fetchApi();
    
}, []);

  const addCartHandler = async (item: string) => {
    const { data } = await ajax.get(`product/${item}`);
    dispatch({ type: ACTION_TYPE.ADD_CART, id: data });
};
 

  const removeHandler = (id: string) => {
    dispatch({ type: ACTION_TYPE.REMOVER_FROM_CART, id: id });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">This is title</Typography>
      <Box>
        <Paper>
          {products.map((productEl) => {
            return (
              <Box key={productEl.id}>
                <Paper>
                  <Typography variant="subtitle2">
                    Number {productEl.id}
                  </Typography>
                  <Typography variant="h6">{productEl.title}</Typography>
                  <Typography variant="h6">{productEl.price}</Typography>
                  <h4 onClick={() =>setQuantity(prev => prev + 1)}>+</h4>
                  <h4>{quantity}</h4>
                  <h4 onClick={() =>setQuantity(prev => prev - 1)}>-</h4>
                  <Button
                    onClick={(e) => addCartHandler(productEl.id)}
                    variant="contained"
                    color="success"
                  >
                    Add To Cart
                  </Button>
                </Paper>
              </Box>
            );
          })}
        </Paper>
      </Box>
      <Box>
        <Typography variant="h6">this is cart</Typography>
        {state?.item.map((itemEl: BanckEndItem) => {
          return (
            <Box>
              <Typography variant="h5">{itemEl.title}</Typography>
              <Typography variant="h5">{itemEl.brand}</Typography>
              <Button
                onClick={(e) => removeHandler(itemEl.id)}
                variant="contained"
                color="error"
              >
                Remove From Cart
              </Button>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Create;
