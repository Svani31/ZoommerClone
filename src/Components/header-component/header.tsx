import { useEffect, useState } from "react"
import "./header.scss"
import phoneImage from "../../Images/phone.jpeg"

// library
import {Box, Typography} from "@mui/material"
import { Link, useSearchParams } from "react-router-dom"
<<<<<<< HEAD

=======
import {getRedirectResult} from "firebase/auth"
import {signInWithgoogleRedirect,createUserDocumentFromoAuth,auth} from "../../util/firebase/firebase"
>>>>>>> refs/remotes/origin/main

// Components
import Logo from "../../Images/logo.jpg"
import Lanuage from "./language/language"
import Search from "./search-component/search"
import LinkComponent from "./link-component/link-component"

// import carousel 
import AppSlider from "../carousel-component/carousel"


const Header = () =>{
    
<<<<<<< HEAD
=======
    const [user,setUser] = useState<any>("")

    useEffect(() =>{
        const getResultFromRedirect = async () =>{
            const respons = await getRedirectResult(auth)
            console.log(respons?.user.displayName)
            setUser(respons?.user.displayName)
        }
        getResultFromRedirect()
    },[])

>>>>>>> refs/remotes/origin/main

    return(
<<<<<<< HEAD
        <Box>
            <Box className="header__top">
                <Box className="content__inner">
                <Box className="header__left_padding">
                    <Box>
=======
        <div>
            {user}
            <div className="header__top">
                <div className="content__inner">
                <div className="header__left_padding">
                    <div>
>>>>>>> main
                        <img src={phoneImage} alt="phoneImage"/>
                    </Box>
                    <Box>
                         <span>ცხელი ხაზი</span>
                         <a href="*7007 / +995 (32) 2 60 30 60">*7007 / +995 (32) 2 60 30 60</a>
                    </Box>
                </Box>
                <Box className="header__right_padding">
                    <Box className="header__top_helper">
                    <Link className="helper__link" to={"/online__installments"}>
                        <li>ონლაინ განვადება</li>
                    </Link>
                    <Link className="helper__link" to={"/brenchs"}>
                        <li>ფილიალები</li>
                    </Link>
                    <Link className="helper__link" to={"/all__promotions"}>
                    <li className="active">ყველა აქცისა</li>
                    </Link>
                    </Box>
                           <Lanuage/>              
                </Box>
                </Box>
            </Box>
            <Box className="header__bottom">
                <Box className="content__inner">
                    <Box className="header__logo">
                        <Link className="logo__link" to={"/"}>
                            <img src={Logo} alt="Logo" />
                            <span className="zoomer">ზუმერი</span>
                        </Link>
                    </Box>
                        <Search/>
                        <LinkComponent/>
                </Box>
            </Box>
            <AppSlider/>
        </Box>
    )
}


export default Header
