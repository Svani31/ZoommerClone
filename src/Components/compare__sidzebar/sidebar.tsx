import React, { useState, useEffect } from "react";
// import mui
import { Box, Button, Typography } from "@mui/material";
// import css
import "./sidebar.scss";
import { useStore } from "../../util/store/store";
import ajax from "../../util/service/ajax";
import { BanckEndItem } from "../../@types/general";

const Sidebar: React.FC = () => {
  const [sliderItem, setSliderItem] = useState<BanckEndItem>();
  const { getItemById } = useStore();

  useEffect(() => {
    if (!!getItemById) {
      const getItem = async () => {
        const { data } = await ajax.get(`product/${getItemById}`);
        setSliderItem(data);
    };
      getItem();
    }
  }, [getItemById]);


if(getItemById){
    console.log("Fgh")
}

  return (
    <Box className="compare__sidebar">
      <Typography className="compare__sidebar_title" variant="h6">
        შედარება
      </Typography>
      <Box className="compare__sidebar_inner">
        <Box className="compare__sidebar_hidden">
          <Box sx={{ display: "flex", gap: "50px" }}>
            <Box sx={getItemById ? { background: "white" } : {background:"rgba(0,0,0,.3)"}} className="add__product">
              <img src={sliderItem?.images[0]} alt="" />
              <Box sx={getItemById ? { visibility:"visible" } : {visibility:"hidden"}}  className="product__info">
              <Typography className="product__title">
                პროდუქტის დამატება
              </Typography>
              <Typography className="product__title">
                {sliderItem?.title}
              </Typography>
              <span>{Number(sliderItem?.price)} ₾</span>
              </Box>
            </Box>
            <Button className="compare__start">შედარების დაწყება</Button>
            <Typography className="clear" variant="subtitle1">
              გასუფთავება
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
