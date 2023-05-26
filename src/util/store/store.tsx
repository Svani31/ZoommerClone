// @ts-nocheck
import { createContext, useContext, useReducer, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import reducer, { initalState } from './redux';
import { REDUCER_ACTION_TYPES } from './action';
import { BanckEndItem } from '../../@types/general';
import ajax from '../service/ajax';

type StoreContextProps = {
  cartItem: BanckEndItem[];
  dispatch:REDUCER_ACTION_TYPES;
  blurBackground?:boolean;
  setBlurBackground:any;
  addProductHandler:any;
};


export const StoreContext = createContext({} as StoreContextProps);

export const useStore = (): StoreContextProps => useContext(StoreContext);

type StoreProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProps) => {


  const [state,dispatch] = useReducer(reducer,initalState)
  const [blurBackground,setBlurBackground] = useState<boolean>(false)

  const addProductHandler = async (id:string) =>{
    const {data} = await ajax.get(`product/${id}`)
    dispatch({type:REDUCER_ACTION_TYPES.ADD_PRODUCT_ID,cartItem:data})
  }
  const store = {
    ...state,
    dispatch,
    blurBackground,
    setBlurBackground,
    addProductHandler
  };

  return (
    <StoreContext.Provider value={store}>
      <CssBaseline />
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
