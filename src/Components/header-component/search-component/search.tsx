import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import "./search.scss";
import SelectComponentMenu from "./select-categori-component/select-component";
import SearchIcon from "@mui/icons-material/Search";
import { useStore } from "../../../util/store/store";
import ajax from "../../../util/service/ajax";
import { BanckEndItem } from "../../../@types/general";
import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next"

const Search = () => {
  const { setBlurBackground, blurBackground, setGetItemById } = useStore();
  const [searchItem, setSearchItem] = useState<BanckEndItem[]>([]);

  const {t} = useTranslation()

  const formRef = useRef<HTMLFormElement | null>(null);

  let debounceAPICall: NodeJS.Timeout;

  
  const getItem = async (itemName: string) => {
    clearTimeout(debounceAPICall);
    debounceAPICall = setTimeout(async () => {
      if (itemName.length > 1) {
        try {
          const {
            data: { products },
          } = await ajax.post(`/products`, {
            keyword: `${itemName}`,
            page_size: 4,
            page_number: 0,
          });
          setSearchItem(products);
        } catch (error) {
          // Handle errors, if any
          console.error(error);
        }
      } else {
        setSearchItem([]);
      }
    }, 500);
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

  const itemOpenHandler = (itemId: string) => {
    setGetItemById(itemId);
  };

  useEffect(() => {
    const outsideHandler = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setBlurBackground(false);
      }
    };

    document.addEventListener("mousedown", outsideHandler);

    return () => {
      document.removeEventListener("mousedown", outsideHandler);
    };
  }, [setBlurBackground]);

  const word = "ძებნა...";
  return (
    <Box className={blurBackground ? "search__container active__search" : "search__container"} onClick={() => setBlurBackground(true)}>
      <form
        action=""
        id="header__search"
        onClick={(e) => e.preventDefault()}
      >
        <input
          id="search"
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

      <Box
        className="search__dropdown"
        ref={formRef}
        sx={
          blurBackground === true
            ? { visibility: "visible" }
            : { visibility: "hidden" }
        }
      >
        <Box className="search__items_inner">
          <Box className="search__categorys">
            {category.map((categoryEl) => (
              <Typography
                key={categoryEl}
                className="category__text"
                variant="subtitle2"
              >
                {categoryEl}
              </Typography>
            ))}
          </Box>
          <Box className="search__item">
            {searchItem.map((itemEl) => (
              <Link className="item__link" to={`product/${itemEl.id}`}>
                <Box key={itemEl.id}>
                  <Box
                    onClick={() => itemOpenHandler(itemEl.id)}
                    className="item__inner"
                  >
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
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Search;
