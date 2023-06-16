import { useQuery } from "@tanstack/react-query";
import ajax from "./util/service/ajax";
import { BanckEndItem } from "./@types/general";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

const ReactQuery = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const postProduct = async () => {
      const { data } = await ajax.post("products", {
        keyword: "",
        page_size: 5,
        page_number: 0,
      });
      setProduct(data.products);
    };

    postProduct();
  }, []);


  useEffect(()=>{
    const setTimer = setTimeout(()=>{
      console.log("fgh")
      setIsLoading(false)
    },2000)
  })


  return (
    <>
      {product.map((productEl: BanckEndItem) => {
        return (
          <div key={productEl.id}>
            {isLoading ? (
              <Skeleton variant="rectangular" width={200} height={200} />
            ) : (
              <img src={productEl.images[0]} alt="" />
            )}
            <h1>{productEl.title}</h1>
          </div>
        );
      })}
    </>
  );
};

export default ReactQuery;
