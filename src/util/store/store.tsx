// @ts-nocheck
import { createContext, useContext, useReducer, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import reducer, { initalState,REDUCER_ACTION_TYPES } from './redux';
import { BanckEndItem } from '../../@types/general';


type StoreContextProps = {
  cartItem: BanckEndItem[];
  dispatch:REDUCER_ACTION_TYPES
};


export const StoreContext = createContext({} as StoreContextProps);

export const useStore = (): StoreContextProps => useContext(StoreContext);

type StoreProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProps) => {


  const [state,dispatch] = useReducer(reducer,initalState)


  const store = {
    ...state,
    dispatch,
  };

  return (
    <StoreContext.Provider value={store}>
      <CssBaseline />
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
