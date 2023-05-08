import { useEffect, useState,useReducer } from "react";
import axios from "axios";
import Header from "./Components/header-component/header";
import { string } from "yup";



type productPorps = {
  id: string;
  title: string;
  price: string;
  description: string;
  category: string;
  brand: string;
  amount: string;
};

const reducer = (state:any,action: {
    [x: string]: any; type: any; 
}) =>{
    switch(action.type){
        case "increment":
            return {...state,count: state.count + 1};
        case "decrement":
            return {...state,count: state.count - 1};
            case "userInput":
                return {...state,input: action.payload}
    }
}

const App = () => {

  const [products, setProducts] = useState<productPorps[]>([]);
  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  
// console.log(process.env)

  useEffect(() => {
    const fetchData = async () => {
      const respons = await api.post("/products", {
        page_size: 10,
        page_number: 1,
        keyword: "samsung",
      });
      setProducts(respons.data.products);
    };
    fetchData();
  }, []);
  console.log(products);
  
  const [state,dispatch] = useReducer(reducer, {count:0,inputValue:""})

  const [count, setCount] = useState<number>(0);
  const [input, setInput] = useState<string>("");

  return (
    <>
      {/* {products.map((productEl)=>{
                return (
                    // console.log(productEl)
                )
            })} */}

      <input onChange={(e)=>dispatch({type:"userInput", payload:e.target.value})} value={state.inputValue} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <button onClick={() => dispatch({type: "decrement"})}>-</button>
        <span>{state?.count}</span>
        <button onClick={() => dispatch({type: "increment"})}>+</button>
      {input}
      </div>
    </>
  );
};

export default App;
