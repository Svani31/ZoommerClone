import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import Navigation from "../../../../../navigation/navigation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ajax from "../../../../../../util/service/ajax";
import { BanckEndItem } from "../../../../../../@types/general";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../../../../util/store/store";
import { useFormik } from "formik";
import { init } from "i18next";

type initalValuesProps = {
  title: string;
  description: string;
  images: string[];
  brand: string;
  category: string[];
  price: string;
  amount: string;
};

const UpdateProduct = () => {
  const { isAdmin, userToken } = useStore();
  const [item, setItem] = useState<BanckEndItem>();
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(()=>{
    if(!isAdmin) navigate("/")
  },[])

  const initialValues: initalValuesProps = {
    title: "",
    description: "",
    images: [""],
    brand: "",
    category: [""],
    price: "",
    amount: "",
  };

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: async (values: initalValuesProps) => {
      try {
        const response = await ajax.post("/product",{
            title: values.title,
            description: values.description,
            images: [`${values.images}`],
            brand: values.brand,
            category: [`${values.category}`],
            price: values.price,
            amount: values.amount,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        console.log(response, "this is data after login");
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(()=>{

  },[])

  return (
    <Box>
      <Navigation name={"admin"} />
      <Box>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          variant="h5"
        >
          Update Item
        </Typography>
        <Box sx={{ width: "60%", margin: "0 auto", marginTop: "30px" }}>
          <Paper>
            <form
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                marginBottom: "50px",
                gap: "10px",
              }}
              onSubmit={handleSubmit}
              action="submit"
            >
              <img style={{ height: "200px" }} src={values.images[0]} alt="" />
              <TextField
                placeholder="title"
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              <TextField
                placeholder="description"
                name="description"
                value={values.description}
                onChange={handleChange}
              />
              <TextField
                placeholder="images"
                name="images"
                value={values.images}
                onChange={handleChange}
              />
              <TextField
                placeholder="brand"
                name="brand"
                value={values.brand}
                onChange={handleChange}
              />
              <TextField
                placeholder="category"
                name="category"
                value={values.category}
                onChange={handleChange}
              />
              <TextField
                placeholder="price"
                name="price"
                value={values.price}
                onChange={handleChange}
              />
              <TextField
                placeholder="amount"
                name="amount"
                value={values.amount}
                onChange={handleChange}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
