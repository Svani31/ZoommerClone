import Brand from "./brand-component/brand";
import HotSale from "./hot-sale-component/hot-sale";
import NewModel from "./new-model-component/new-model";
import Popular from "./popular-component/popular";
import VisitedProduct from "./seen-product-component/seen-product";
import TopProduct from "./top-product-component/top-product";

const Product = () => {
  return (
    <div style={{
        backgroundColor:"#f5f5f5"
    }}>
    <div className="content__inner">
      <div>
        <HotSale />
        <NewModel />
        <Brand />
        <NewModel/>
        <Popular/>
        <VisitedProduct/>
        <TopProduct/>
      </div>
    </div>
    </div>
  );
};

export default Product;
