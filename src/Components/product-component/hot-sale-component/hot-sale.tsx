// improting Mui Components
import { Box, Paper, Typography } from "@mui/material";
// importing Photos
import h from "../../../Images/Product-Title/hot-proposal.svg";
import test from "../../../Images/tester image.jpeg";
// importing Css
import "./hot-sale.scss";
import { useEffect, useState } from "react";
import ajax from "../../../util/service/ajax";
const HotSale = () => {
    
  const [products,setProducts] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const respons = await ajax.post("/products", {
        page_size: 10,
        page_number: 1,
        keyword: "",
      });
      console.log(respons.data.products)
    };
    fetchData();
  }, []);


  return (
    <div
      style={{
        paddingTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          textAlign:"center",
          alignContent:"center",
          justifyContent:"center",
        }}
      >
        <div className="title__image">
          <img src={h} alt="" />
        </div>
        <h2 className="product__title">ცხელი შეთავაზება</h2>
      </div>
      <div className="products__container">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            // width:"280px",
            padding: "15px",
            cursor: "pointer",
          }}
        >
          <Paper
            sx={{
              width: "230px",
              borderRadius: "12px",
            }}
          >
            <img src={test} alt="Item Photo" />
            <h4>Apple Watch Ultra 49mm Titanium Starlight Alpin...</h4>
            <div className="product__price">
              <h3>
                1 999 ₾ <span>1 700 ₾</span>
              </h3>
              <h5>
                63 ₾ <span>- დან</span>
              </h5>
            </div>
          </Paper>
        </Box>

      </div>
    </div>
  );
};

export default HotSale;
