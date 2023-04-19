// @ts-nocheck
import { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

type storeContextProps = {
    
}

export const StoreContext = createContext({} as storeContextProps);

export const useStore = () => useContext(StoreContext);

const StoreProvider = ({ children }) => {
  
  const consoleLog = () =>{
    console.log("dfgd")
  }

  const store = {
   
  };

  return (
    <StoreContext.Provider value={store}>
        <CssBaseline />
        {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
