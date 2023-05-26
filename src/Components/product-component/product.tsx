import Brand from "./brand-component/brand";
import HotSale from "./hot-sale-component/hot-sale";
import NewModel from "./new-model-component/new-model";
import Popular from "./popular-component/popular";
import VisitedProduct from "./seen-product-component/seen-product";
import TopProduct from "./top-product-component/top-product";
import { Box } from "@mui/material";


const Product = () => {
  return (
    <Box sx={{
        backgroundColor:"#f5f5f5"
    }}>
    <Box className="content__inner">
      <Box>
        <HotSale />
        <NewModel />
        <Brand />
        <Popular/>
        {/* <VisitedProduct/> */}
        <TopProduct/>
      </Box>
    </Box>
    </Box>
  );
};

export default Product;
