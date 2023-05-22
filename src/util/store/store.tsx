// @ts-nocheck
import { createContext, useContext, useReducer, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import reducer, { initalState } from './redux';

type StoreContextProps = {
  addProductHandler: (e: string) => null;
  productId: string;
};

export const StoreContext = createContext<StoreContextProps>({
  addProductHandler: () => {},
  productId: '',
});

export const useStore = (): StoreContextProps => useContext(StoreContext);

type StoreProps = {
  children: React.ReactNode;
};

const StoreProvider = ({ children }: StoreProps) => {

  const [productId, setProductId] = useState('');

  const [state,dispatch] = useReducer(reducer,initalState)

  const addProductHandler = (e: string) => {
    setProductId(e);
  };


  const store = {
    addProductHandler,
    productId,
    // ...state,
    // dispatch,
  };

  return (
    <StoreContext.Provider value={store}>
      <CssBaseline />
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
