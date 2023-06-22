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
  id:string;
  title: string;
  description: any;
  images: string[];
  brand: string;
  category: string[];
  price: any;
  amount: string;
  rating:string;
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
    id:"",
    title: "",
    description: "",
    images: [""],
    brand: "",
    category: [""],
    price: "",
    amount: "",
    rating:"",
  };


  useEffect(()=>{
    const getItem = async()=>{
      const {data} = await ajax.get(`/product/${id}`)
      setItem(data)
    }
    getItem()
  },[])
  console.log(id)

  const { handleChange, handleSubmit, values,setValues } = useFormik({
    initialValues,
    onSubmit: async (values: initalValuesProps) => {
      try {
        const response = await ajax.put(`/product/${item?.id}`,{
            title: values.title,
            description: values.description,
            images: [`${values.images}`],
            brand: values.brand,
            category: [`${values.category}`],
            price: values.price,
            amount: values.amount,
            rating:values.rating
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(()=>{
    if(item){
      setValues({
        id: item.id || "",
        title: item.title || "",
        description: item.description || "",
        images: [`${item.images}`] || "",
        brand: item.brand || "",
        category: [`${item.category}`] || "",
        price: item.price || "",
        rating: item.rating || "",
        amount: item.amount || "",
      })
    }
    console.log(values.category,"this is category")
  },[item,])
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
              <img style={{ height: "200px",width:"200px" }} src={item?.images[0]} alt="" />
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
