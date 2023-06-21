import { useEffect, useState } from "react";
import ajax from "./util/service/ajax";
import { useFormik } from "formik";
import { useStore } from "./util/store/store";

const Rame = () => {
  const [item, setItem] = useState<any>({});
  const { userToken } = useStore();
  useEffect(() => {
    const getItem = async () => {
      const { data } = await ajax.get("product/0");
      setItem(data);
    };

    getItem();
  }, []);

  // const { handleChange, handleSubmit, values,setValues } = useFormik({
  //   initialValues: {
  //     id: item.id || "",
  //     title: item.title || "",
  //     description: item.description || "",
  //     images: item.images || "",
  //     brand: item.brand || "",
  //     category: item.category || "",
  //     price: item.price || "",
  //     rating:item.rating || "",
  //     amount: item.amount || "",
  //   },
  //   onSubmit: async(values) => {
  //     try{
  //       const updateHandler = await ajax.put(`/product/${item.id}`,{
  //         id: values.id,
  //         title: values.title,
  //         description: values.description,
  //         images: values.images,
  //         brand: values.brand,
  //         category: values.category,
  //         price: values.price,
  //         rating:values.rating,
  //         amount: values.amount,
  //       },
  // {
  //   headers:{
  //     "Content-Type":"aplication/json",
  //     Authorization:`Bearer ${userToken}`
  //   }
  //       },
  //       )
  //       console.log(updateHandler)
  //     }catch(error){
  //       console.log(error)
  //     }
  //   },
  // });

  const { handleChange, handleSubmit, values, setValues } = useFormik({
    initialValues: {
      id: item.id || "",
        title: item.title || "",
        description: item.description || "",
        images: [`${item.images}`] || "",
        brand: item.brand || "",
        category: [`${item.category}`] || "",
        price: item.price || "",
        rating: item.rating || "",
        amount: item.amount || "",
    },
    onSubmit: async (values) => {
      try {
        const updateHandler = await ajax.put(
          `/product/${item.id}`,
          {
            id: values.id,
            title: values.title,
            description: values.description,
            images: `${values.images}`,
            brand: values.brand,
            category: `${values.category}`,
            price: values.price,
            rating: values.rating,
            amount: values.amount,
          },
          {
            headers: {
              "Content-Type": "aplication/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        window.location.reload;
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    // Update form values when `item` changes
    if (item) {
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
      });
    }
  }, [item, handleChange]);

  return (
    <div>
      <form action="submit" onSubmit={handleSubmit}>
        <input value={values.id} onChange={handleChange} name="id" />
        <input value={values.title} onChange={handleChange} name="title" />
        <input value={values.images} onChange={handleChange} name="images" />
        <input value={values.brand} onChange={handleChange} name="brand" />
        <input
          value={values.category}
          onChange={handleChange}
          name="category"
        />
        <input value={values.price} onChange={handleChange} name="price" />
        <input value={values.rating} onChange={handleChange} name="rating" />
        <input value={values.amount} onChange={handleChange} name="amount" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Rame;
