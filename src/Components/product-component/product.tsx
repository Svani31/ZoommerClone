import { useEffect, useState } from "react";
import { useStore } from "../../util/store/store";
import Brand from "./brand-component/brand";
import HotSale from "./hot-sale-component/hot-sale";
import NewModel from "./new-model-component/new-model";
import Popular from "./popular-component/popular";
import VisitedProduct from "./seen-product-component/seen-product";
import TopProduct from "./top-product-component/top-product";
import { Box } from "@mui/material";
import ajax from "../../util/service/ajax";

const Product = () => {
  const { blurBackground } = useStore();

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
            title={"ცხელი შეთავაზება"}
          />
          <NewModel
            increaseProduct={increaseProduct}
            page_size={10}
            page_number={40}
            title={"ახალი მოდელები"}
          />
          <Brand />
          <Popular
            increaseProduct={increaseProduct}
            page_size={10}
            page_number={90}
            title={"პოპულარულები"}
          />
          <VisitedProduct />
          <TopProduct
            increaseProduct={increaseProduct}
            page_size={10}
            page_number={190}
            title={"Top"}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
