import { Box, Typography } from "@mui/material";
import "./search.scss";
import SelectComponentMenu from "./select-categori-component/select-component";
import SearchIcon from "@mui/icons-material/Search";
import { useStore } from "../../../util/store/store";
import ajax from "../../../util/service/ajax";
import { useEffect, useRef, useState } from "react";
import { BanckEndItem } from "../../../@types/general";
import { Link, useParams } from "react-router-dom";

const Search = () => {


  const { setBlurBackground, blurBackground,setGetItemById } = useStore();
  const [searchItem, setSearchItem] = useState<BanckEndItem[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);


  let debounceAPICall:NodeJS.Timeout

  const getItem = async (itemName:string) => {
    clearTimeout(debounceAPICall)
    debounceAPICall = setTimeout(async ()=>{
      if(itemName.length > 1){
        const {
          data: { products },
        } = await ajax.post(`/products`, {
          keyword: `${itemName}`,
          page_size: 4,
          page_number: 0,
        });
        setSearchItem(products);
      }else{
        setSearchItem([])
      }
    },500)
  };

  const category = [
    "ტელეფონი",
    "ტელევიზორი",
    "Gaming Tool",
    "დამტენი",
    "USB Cabel",
    "ქეისი",
    "აქსესუარები",
    "Phone Protection",
  ];

  const itemOpenHandler = (itemId:string) =>{

    setGetItemById(itemId)
  }
  
  // useOutsideClick

  useEffect(()=>{
    let handler = (event:MouseEvent) =>{
      if(formRef.current && !formRef.current.contains(event.target as Node)){
        setBlurBackground(false)
      }
    }
    document.addEventListener("mousedown",handler)

    return () =>{
      document.removeEventListener("mousedown",handler)
    }
  },[setBlurBackground])

  console.log(blurBackground)
  const word = "ძებნა...";
  return (
    <Box className="search__container" onClick={() => setBlurBackground(true)}>
      {/* search */}
      <form action="" ref={formRef} id="header__search" onClick={(e) => (e.preventDefault())}>
        <input
          type="text"
          onChange={(e) => getItem(e.target.value)}
          placeholder={word}
        />
        <SelectComponentMenu />
        <button type="submit">
          <SearchIcon
            sx={{
              height: "50px",
              cursor: "pointer",
            }}
            fontSize="large"
            id="header__icone"
          />
        </button>
      </form>
      {/* search */}

      {/* dropDwon */}

      <Box className="search__dropdown" sx={blurBackground === true ? {visibility:"visible"} : {visibility:"hidden"}}>
        <Box className="search__items_inner">
          <Box className="search__categorys">
            {category.map((categoryEl) => {
              return (
                <Typography key={categoryEl} className="category__text" variant="subtitle2">
                  {categoryEl}
                </Typography>
              );
            })}
          </Box>
          <Box className="search__item" >
            {searchItem.map((itemEl) => {
              return (
                <Box key={itemEl.id}>
                <Link className="item__link" to={`product/${itemEl.id}`}>
                <Box onClick={()=> itemOpenHandler(itemEl.id)} className="item__inner">
                    <img src={itemEl.images[0]} alt="" />
                    <Typography className="item__title" variant="subtitle2">
                      {itemEl.title}
                    </Typography>
                    <Typography className="item__price" variant="subtitle2">
                      {Math.floor(Number(itemEl.price))}₾{" "}
                      <span style={{ color: "red" }}>
                        {Math.floor(Number(itemEl.price)) - 50}₾
                      </span>
                    </Typography>
                  </Box>
                </Link>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
      {/* dropDwon */}
    </Box>
  );
};

export default Search;
