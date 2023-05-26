<<<<<<< HEAD
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
=======
import React, { useState,useEffect } from "react"
import { Navigate } from "react-router-dom"


const App = () =>{

    const [userInput,setUserInput] = useState<any>([{email:"",name:"",username:"",password:"",confirmPassword:""}])
    const [signInUser,setSignInUser] = useState<boolean>(false)

    const localSignUp = localStorage.getItem("signup")

    useEffect(()=>{
        if(localSignUp){
            setSignInUser(true)
        }
    })

    const userChange = (e:any) =>{
        setUserInput({...userInput,[e.target.name]:e.target.value})
    }
    
    const signUpHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        if(userInput.password === userInput.confirmPassword){
            localStorage.setItem("email",userInput.email)
        localStorage.setItem("name",userInput.name)
        localStorage.setItem("username",userInput.username)
        localStorage.setItem("password",userInput.password)
        localStorage.setItem("signup",userInput.email)
        Navigate
        }else{
            alert("wrong password")
        }

    }

    return(
        <div style={{
            width:"300px",
            margin:"0 auto",
        }}>
            {signInUser ? <App/>:
            
        <form action="submit" style={{
            display:"flex",
            flexDirection:"column"
        }}>
        <input type="email" name="email" value={userInput.email} placeholder="Enter Your Gmail" onChange={userChange} />
        <input type="text" name="name" value={userInput.name} placeholder="Enter Your Name" onChange={userChange} />
        <input type="text" name="username"value={userInput.username} placeholder="Enter Your UserName" onChange={userChange} />
        <input type="password" name="password" value={userInput.password} placeholder="Enter Your Password" onChange={userChange} />
        <input type="password" name="confirmPassword" value={userInput.confirmPassword}  placeholder="Confirm Your Password" onChange={userChange}/>
        <button onClick={(e) =>signUpHandler (e)}>Registration</button>
        </form>
}
        </div>
    )
}

export default App
>>>>>>> refs/remotes/origin/main
