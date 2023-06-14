import { Box, TextField, Typography } from "@mui/material";

import "./sidebarAdd.scss";
import { useEffect, useRef, useState } from "react";
import ajax from "../../../util/service/ajax";
import { BanckEndItem } from "../../../@types/general";
import { useStore } from "../../../util/store/store";
import {useTranslation} from "react-i18next"


const AddProductBySideBar = () => {

  const { setProductBar,compareHandler } = useStore();
  const [product, setProduct] = useState<BanckEndItem[]>([]);
  let sidebarRef = useRef<HTMLFormElement | null>(null);
  let debouncetimer: NodeJS.Timeout;
  const {t} = useTranslation()

  const getProductItem = async (value: string) => {

    clearTimeout(debouncetimer);
    debouncetimer = setTimeout(async () => {
      if (value.length > 2) {
        const {
          data: { products },
        } = await ajax.post("products", {
          keyword: `${value}`,
          page_size: 20,
          page_number: 0,
        });
        setProduct(products);
      } else {
        setProduct([]);
      }
    }, 500);
  };


  useEffect(() => {
    const outsideHandler = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setProductBar(false);
      }
    };

    document.addEventListener("mousedown", outsideHandler);

    return () => {
      document.removeEventListener("mousedown", outsideHandler);
    };
  }, [setProductBar]);

  return (
    <Box className="search__side" ref={sidebarRef}>
      <Typography className="search__side_title">{t(`global.Add-Product`)}</Typography>
      <input
        onChange={(e) => getProductItem(e.target.value)}
        className="search"
        placeholder="მოძებნე პროდუქტი"
      />
      <Box className="fetch__product_side">
        {product.map((productEl) => {
          return (
            <Box onClick={()=>compareHandler(productEl.id)} key={productEl.id} className="fetch__product_inner">
              <img alt="error" src={productEl.images[0]}></img>
              <Typography className="product__title">
                {productEl.title}
              </Typography>
              <Typography className="product__price">
                {Math.floor(Number(productEl.price))} ₾
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default AddProductBySideBar;
