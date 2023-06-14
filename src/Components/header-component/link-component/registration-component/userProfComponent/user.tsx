
// import useStore
import { useEffect } from "react"
import { useStore } from "../../../../../util/store/store"
// importing mui items
import { Box, Typography } from "@mui/material"
import ajax from "../../../../../util/service/ajax"

const UserInfo = () =>{

    // useEffect(()=>{
    //     const getUser = async() =>{
    //         const {data} = await ajax("/me",{
    //             headers:{
    //                 Authorization:`${userToken}`
    //             }
    //         })
    //         console.log(data)
    //     }
    //     getUser()
    // },[])

    const {user} = useStore()
    console.log(user)
    return(
        <Box>
            <Box className="user__photo"></Box>
            <Typography className="user__welcome">გამარჯობა <span>{user.firstName}</span></Typography>
        </Box>
    )
}

export default UserInfo