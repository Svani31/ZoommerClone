import Brand from "./brand-component/brand";
import HotSale from "./hot-sale-component/hot-sale";
import NewModel from "./new-model-component/new-model";

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
      </div>
    </div>
    </div>
  );
};

export default Product;
