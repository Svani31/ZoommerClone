import React, { useEffect } from "react"
import jwt from "jwt-decode"
import {useStore} from "../store/store"

type Interface = {
    isAdmin:boolean
}

const jwtDecoder:React.FC = () =>{
    const {userToken,setIsAdmin} = useStore()

    useEffect(()=>{
        if(!!userToken){
            const decodeToken = jwt(`${userToken}`) as Interface
            console.log(decodeToken,"this is code")
           
            if(decodeToken.isAdmin){
                setIsAdmin(true)
            }
            
        }
        
    },[userToken])

    return null
}

export default jwtDecoder