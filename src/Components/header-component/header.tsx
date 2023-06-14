import { useEffect, useState } from "react"
import "./header.scss"
import phoneImage from "../../Images/phone.jpeg"

// library
import {Box, Typography} from "@mui/material"
import { Link, useSearchParams } from "react-router-dom"

// Components
import Logo from "../../Images/logo.jpg"
import Lanuage from "./language/language"
import Search from "./search-component/search"
import LinkComponent from "./link-component/link-component"

// import carousel 
import AppSlider from "../carousel-component/carousel"
// import translation libray
import {useTranslation} from "react-i18next" 
const Header = () =>{
    const {t} = useTranslation()

    return(
        <Box>
            <Box className="header__top">
                <Box className="content__inner">
                <Box className="header__left_padding">
                    <Box>
                        <img src={phoneImage} alt="phoneImage"/>
                    </Box>
                    <Box>
                         <span>{t(`global.hotline`)}</span>
                         <a href="*7007 / +995 (32) 2 60 30 60">*7007 / +995 (32) 2 60 30 60</a>
                    </Box>
                </Box>
                <Box className="header__right_padding">
                    <Box className="header__top_helper">
                    <Link className="helper__link" to={"/online__installments"}>
                        <li>{t(`global.Online installment`)}</li>
                    </Link>
                    <Link className="helper__link" to={"/brenchs"}>
                        <li>{t(`global.Branches`)}</li>
                    </Link>
                    <Link className="helper__link" to={"/all__promotions"}>
                    <li>{t(`global.All promotions`)}</li>
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
                            <span className="zoomer">{t(`global.Zoomer`)}</span>
                        </Link>
                    </Box>
                        <Search/>
                        <LinkComponent/>
                </Box>
            </Box>
            {/* <AppSlider/> */}
        </Box>
    )
}


export default Header
