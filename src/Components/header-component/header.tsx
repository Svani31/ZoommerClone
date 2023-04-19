import { useEffect, useState } from "react"
import "./header.scss"
import phoneImage from "../../Images/phone.jpeg"

// library
import {Typography} from "@mui/material"
import { Link, useSearchParams } from "react-router-dom"
import {getRedirectResult} from "firebase/auth"
import {signInWithgoogleRedirect,createUserDocumentFromoAuth,auth} from "../../util/firebase/firebase"

// Components
import Logo from "../../Images/logo.jpg"
import Lanuage from "./language/language"
import Search from "./search-component/search"
import LinkComponent from "./link-component/link-component"

const Header = () =>{
    
    const [user,setUser] = useState<any>("")

    useEffect(() =>{
        const getResultFromRedirect = async () =>{
            const respons = await getRedirectResult(auth)
            console.log(respons?.user.displayName)
            setUser(respons?.user.displayName)
        }
        getResultFromRedirect()
    },[])


    return(
        <div>
            {user}
            <div className="header__top">
                <div className="content__inner">
                <div className="header__left_padding">
                    <div>
                        <img src={phoneImage} alt="phoneImage"/>
                    </div>
                    <div>
                         <span>ცხელი ხაზი</span>
                         <a href="*7007 / +995 (32) 2 60 30 60">*7007 / +995 (32) 2 60 30 60</a>
                    </div>
                </div>
                <div className="header__right_padding">
                    <div className="header__top_helper">
                    <Link className="helper__link" to={"/online__installments"}>
                        <li>ონლაინ განვადება</li>
                    </Link>
                    <Link className="helper__link" to={"/brenchs"}>
                        <li>ფილიალები</li>
                    </Link>
                    <Link className="helper__link" to={"/all__promotions"}>
                    <li className="active">ყველა აქცისა</li>
                    </Link>
                    </div>
                           <Lanuage/>              
                </div>
                </div>
            </div>
            <div className="header__bottom">
                <div className="content__inner">
                    <div className="header__logo">
                        <Link className="logo__link" to={"/"}>
                            <img src={Logo} alt="Logo" />
                            <span className="zoomer">ზუმერი</span>
                        </Link>
                    </div>
                        <Search/>
                        <LinkComponent/>
                </div>
            </div>
        </div>
    )
}


export default Header
