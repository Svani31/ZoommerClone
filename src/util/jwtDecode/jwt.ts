import { useEffect } from "react"
import jwt from "jwt-decode"
import {useStore} from "../store/store"


const jwtDecoder = () =>{
    const {userToken} = useStore()

    useEffect(()=>{
        if(!!userToken){
            const decodeToken = jwt(`${userToken}`)
            console.log(decodeToken)
        }
    },[userToken])
}

export default jwtDecoder