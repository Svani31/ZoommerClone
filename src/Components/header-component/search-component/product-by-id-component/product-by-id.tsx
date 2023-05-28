// import react route dom
import { Route, Routes, useParams } from "react-router-dom";
// import material ui
import { Box, Typography,Button } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
// import Css
import "./product-by-id.scss";
import { useEffect, useState } from "react";
import ajax from "../../../../util/service/ajax";
import { BanckEndItem } from "../../../../@types/general";
import { useStore } from "../../../../util/store/store";
import Carousel from "./product-id-carousel/carousel";

const ProductById = () => {

    const {id} = useParams()
    const [item,setItem] = useState<BanckEndItem | null>(null)
    const {addProductHandler} = useStore()

    useEffect(()=>{
        const getItem = async() =>{
            const {data} = await ajax.get(`product/${id}`)
            setItem(data)
        }
        getItem()
    },[])


  return (
    <Box className="product__form">
      <Box className="navigation">
        <Box className="nav__left">
          <Typography className="nav__title" variant="h6">
            <ListOutlinedIcon /> ნავიგაცია
          </Typography>
          <Typography variant="subtitle2">ყველა</Typography>
        </Box>
        <Box className="nav__right">
          <Typography className="nav__directory">მთავარი !</Typography>
        </Box>
      </Box>
      <Box className="product">
        <aside className="product__sidebar">
            <Typography className="prev__price" variant="h5">{Math.floor(Number(item?.price) - 100)}</Typography>
            <Typography className="active__price" variant="h5">{Math.floor(Number(item?.price))}</Typography>
            <Typography className="price" variant="subtitle2">ფასის კონტროლი</Typography>
            <Typography className="price" variant="subtitle2">ფასის დაზღვევა</Typography>
            <Box className="sidebar__buttons">
                <Button className="sidebar__cartitem border" onClick={()=> addProductHandler(item?.id)}><LocalMallOutlinedIcon/></Button>
                <Button className="sidebar__buy border">ყიდვა</Button>
            </Box>
            <Button className="sidebar__credit border">განვადებით ყიდვა 20 ₾ - დან</Button>
        </aside>
      <Box className="product__info">
            <Box className="product__info_inner">
                <Carousel item={item}/>
            </Box>
      </Box>
      </Box>
    </Box>
  );
};

export default ProductById;
