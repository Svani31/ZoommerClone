import { useEffect, useState } from "react";
import { useStore } from "../../util/store/store";
import Brand from "./brand-component/brand";
import HotSale from "./hot-sale-component/hot-sale";
import NewModel from "./new-model-component/new-model";
import Popular from "./popular-component/popular";
import VisitedProduct from "./seen-product-component/seen-product";
import TopProduct from "./top-product-component/top-product";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next"; 


const Product = () => {
  const { blurBackground,isAdmin } = useStore();
  const {t} = useTranslation()
  const increaseProduct = (prevProduct: any) => {
    prevProduct((prev: number) => prev + 5);
  };
  return (
    <Box
      sx={
        blurBackground === true
          ? { backgroundColor: "#f5f5f5", filter: "blur(2px)" }
          : { backgroundColor: "#f5f5f5" }
      }
    >
      <Box className="content__inner">
        <Box>
          <HotSale
            increaseProduct={increaseProduct}
            page_size={10}
            page_number={0}
            title={t("global.Hot-sale")}
          />
          <NewModel
            increaseProduct={increaseProduct}
            page_size={10}
            page_number={40}
            title={t("global.New-models")}
          />
          <Brand />
          <Popular
            increaseProduct={increaseProduct}
            page_size={10}
            page_number={90}
            title={t("global.Popular")}
          />
          {/* <VisitedProduct /> */}
          <TopProduct
            increaseProduct={increaseProduct}
            page_size={10}
            page_number={190}
            title={t("global.Top-brand")}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
