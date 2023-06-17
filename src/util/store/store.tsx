// @ts-nocheck
import { createContext, useContext, useReducer, useState } from "react";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import reducer, { initalState } from "./redux";
import { REDUCER_ACTION_TYPES } from "./action";
import { BanckEndItem, UserProps } from "../../@types/general";
import ajax from "../service/ajax";
import { useParams } from "react-router-dom";

type StoreContextProps = {
  cartItem: BanckEndItem[];
  dispatch: REDUCER_ACTION_TYPES;
  blurBackground?: boolean;
  setBlurBackground: any;
  addProductHandler: any;
  getItemById: string;
  setGetItemById: any;
  removeItemHandler: any;
  id: string;
  setSliderItem: any;
  sliderItem: BanckEndItem[];
  setUserToken: any;
  userToken: string;
  productBar?: boolean;
  setProductBar?: any;
  compareHandler: any;
  user: UserProps;
  setUser: any;
  isAdmin: boolean;
  setIsAdmin: any;
};

export const StoreContext = createContext({} as StoreContextProps);

export const useStore = (): StoreContextProps => useContext(StoreContext);

type StoreProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProps) => {
  const [state, dispatch] = useReducer(reducer, initalState);
  const [blurBackground, setBlurBackground] = useState<boolean>(false);
  const [getItemById, setGetItemById] = useState("");
  const [sliderItem, setSliderItem] = useState<BanckEndItem[]>([]);
  const [userToken, setUserToken] = useState<string>("");
  const [productBar, setProductBar] = useState<boolean>(false);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState<Boolean>(false);
  const { id } = useParams();
  const addProductHandler = async (id: string) => {
    const { data } = await ajax.get(`product/${id}`);
    dispatch({ type: REDUCER_ACTION_TYPES.ADD_PRODUCT_ID, cartItem: data });
  };

  const removeItemHandler = (id: string) => {
    dispatch({ type: REDUCER_ACTION_TYPES.REMOVE_PRODUCT, id: id });
  };

  const compareHandler = async (id: string | undefined) => {
    const { data } = await ajax.get(`product/${id}`);

    setSliderItem((prev: BanckEndItem[]) => [...prev, { data }]);
    console.log(sliderItem);
  };

  const store = {
    ...state,
    dispatch,
    blurBackground,
    setBlurBackground,
    addProductHandler,
    getItemById,
    setGetItemById,
    removeItemHandler,
    id,
    sliderItem,
    setSliderItem,
    userToken,
    setUserToken,
    productBar,
    setProductBar,
    compareHandler,
    user,
    setUser,
    isAdmin,
    setIsAdmin,
  };

  return (
    <StoreContext.Provider value={store}>
      <CssBaseline />
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
