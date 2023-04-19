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