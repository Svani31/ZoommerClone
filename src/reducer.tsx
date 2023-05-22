import { Box, Button, Typography } from "@mui/material"
import { useEffect, useReducer, useState } from "react"
import ajax from "./util/service/ajax"

type Product = {
    title:string
}

type ProductProps = {
    cartItem:Product[]
}

const initalValue:ProductProps = {cartItem:[]}

enum REDUCER_ACTION_TYPES {
    ADD_CART
}

type REDUCER_ACTION_PROPS = {
    type:REDUCER_ACTION_TYPES
    item:Product
}

const reducer = (state=initalValue,action:REDUCER_ACTION_PROPS) =>{
    switch(action.type){
        case REDUCER_ACTION_TYPES.ADD_CART:
            return {...state,cartItem:[...state.cartItem,action.item]}
    }
}

const Tester = () =>{

    const [products,setProducts] = useState([])

    const [state,dispatch] = useReducer(reducer,initalValue)

    useEffect(()=>{
        const postProducts = async () =>{
            const {data} = await ajax.post("products",{
                page_number:0,
                page_size:10,
                keyword:""
            })
            setProducts(data.products)
        }
        postProducts()
    },[])

    const addHandler = (product:Product) =>{
        dispatch({type:REDUCER_ACTION_TYPES.ADD_CART,item:product})
    }
    console.log(state.cartItem)
    return(
        <Box>
            <Typography variant="h4">this is Title</Typography>
            {products.map((productEl:Product)=>{
                return(
                    <Box>
                        <h1>this is title {productEl.title}</h1>
                        <Button variant="contained" color="success" onClick={()=> addHandler(productEl)}>Add </Button>
                    </Box>
                )
            })}
        </Box>
    )
}


export default Tester