import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App'


import App from "./reactQuary";
// import App from "./todoapp"
import { BrowserRouter } from "react-router-dom";
import StoreProvider from "./util/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./Translation/translatorScript";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

