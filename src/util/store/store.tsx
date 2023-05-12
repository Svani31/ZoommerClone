// @ts-nocheck
import { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

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

  const addProductHandler = (e: string) => {
    setProductId(e);
  };

  const store = {
    addProductHandler,
    productId,
  };

  return (
    <StoreContext.Provider value={store}>
      <CssBaseline />
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
