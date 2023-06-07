import React, { useState, useEffect, useRef } from "react";
// import mui
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
// import css
import "./sidebar.scss";
import { useStore } from "../../util/store/store";

// import BackEndService
import ajax from "../../util/service/ajax";
import { BanckEndItem } from "../../@types/general";
import { REDUCER_ACTION_TYPES } from "../../util/store/action";
// import Page
import AddProductBySideBar from "./addSideBarProduct/sidebarAdd";

const Sidebar: React.FC = () => {

  // const [productBar, setProductBar] = useState<boolean>(false);
  const { sliderItem,productBar, setProductBar} = useStore();

  return (
    <Box>
     {productBar === true ? <Box>{<AddProductBySideBar />}</Box> : ""}
     <Box className="compare__sidebar">
      <Typography className="compare__sidebar_title" variant="h6">
        შედარება
      </Typography>
      <Box className="compare__sidebar_inner">
        <Box className="compare__sidebar_hidden">
          <Box sx={{ display: "flex", gap: "50px" }}>
          {sliderItem.map((sliderEl) => {
              return (
                <Box className="add__product">
                  <img src={sliderEl.data.images[0]} />
                  <Box className="product__info">
                    <Typography className="product__info_add">
                      პროდუქტის დამატება
                    </Typography>
                    <Typography className="product__title"></Typography>
                    <span>{Number(sliderEl.data.price)} ₾</span>
                  </Box>
                </Box>
              );
            })}
            <Box className="add__product" onClick={() => setProductBar(true)}>
              {/* <img alt="" src="" /> */}
              <Box className="product__info">
                <Typography className="product__info_add">
                  პროდუქტის დამატება
                </Typography>
                <Typography className="product__title"></Typography>
                {/* <span>{Number(sliderEl.data.price)} ₾</span> */}
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
   </Box>
  );
};

export default Sidebar;
