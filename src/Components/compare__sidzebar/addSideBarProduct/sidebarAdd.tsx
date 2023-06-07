import { Box,TextField,Typography } from "@mui/material";


import "./sidebarAdd.scss";
import { useEffect, useRef, useState } from "react";
import ajax from "../../../util/service/ajax";
import { BanckEndItem } from "../../../@types/general";
import { useStore } from "../../../util/store/store";



const AddProductBySideBar = () => {


    const {productBar, setProductBar} = useStore();
    const [product,setProduct] = useState<BanckEndItem[]>([])
    let sidebarRef = useRef<HTMLFormElement | null>(null);
    let debouncetimer:  NodeJS.Timeout
    

    
    const getProductItem = async (value:string) =>{
        clearTimeout(debouncetimer)
       debouncetimer = setTimeout(async () => {
        if(value.length > 2){
            const {data:{
                products
            }} = await ajax.post("products",{
                keyword:`${value}`,
                page_size:4,
                page_number:0
            })
            setProduct(products)
        }else{
            setProduct([])
        }
       }, 500);
    }


    console.log(product)

   useEffect(() => {
    const outsideHandler = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setProductBar(false)
      }
    };

    document.addEventListener("mousedown", outsideHandler);

    return () => {
      document.removeEventListener("mousedown", outsideHandler);
    };
  }, [setProductBar]);




  return (
    <Box className="search__side" ref={sidebarRef}>
        <Typography className="search__side_title">პროდუქტის დამატება</Typography>
        <input onChange={(e)=> getProductItem(e.target.value)} className="search" placeholder="მოძებნე პროდუქტი"/>
        <Box className="fetch__product_side">
            <Box className="fetch__product_inner">
                <img alt="error" src="/src/Images/phone.jpeg"></img>
                <Typography>Ihpone 11 pro max purple / blue 64gb</Typography>
                <Typography>Price</Typography>
            </Box>
        </Box>
    </Box>
  )
};

export default AddProductBySideBar;
