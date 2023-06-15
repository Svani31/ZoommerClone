// import useStore
import { FC, useEffect, useRef, useState } from "react";
import { useStore } from "../../../../../util/store/store";
// importing mui items
import { Box, Button, Typography } from "@mui/material";
// backend
import ajax from "../../../../../util/service/ajax";
// scss
import "./user.scss";
// react rout dom
import { Link } from "react-router-dom";
// improting translation
import {useTranslation} from "react-i18next"


const UserInfo = () => {
  const { user } = useStore();
  const [showDropdown, setShowDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLFormElement | null>(null);
const {t} = useTranslation()

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

    useEffect(()=>{
        const outSideClicke = (event:MouseEvent) =>{
            if(dropDownRef.current && !dropDownRef.current.contains(event.target as Node)){
                setShowDropDown(false)
            }
        }
        document.addEventListener("mousedown",outSideClicke)
        // return ()=>{
        //     document.removeEventListener("mousedown",outSideClicke)
        // }
    },[])

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        onClick={() => setShowDropDown(!showDropdown)}
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      >
        <Box className="user__photo"></Box>
        <Typography className="user__welcome">
          {t(`global.Welcome`)} <span>{user.firstName}</span>
        </Typography>
      </Box>
      {showDropdown === true ? <Box  ref={dropDownRef} className="user__dropdown">
        <Box>
          <Typography className="user__types">
            <Link className="user__type_link" to={"/profile"}>{t("global.Profile")}</Link>
          </Typography>
          <Typography className="user__types">
            <Link className="user__type_link" to={""}>{t("global.Orders")}</Link>
          </Typography>
          <Typography className="user__types">
            <Link className="user__type_link" to={""}>{t(`global.Address`)}</Link>
          </Typography>
          <Typography className="user__types">
            <Link className="user__type_link" to={""}>{t(`global.Messages`)}</Link>
          </Typography>
          <Typography className="user__types">
            <Link className="user__type_link" to={"/password"}>{t(`global.Password-change`)}</Link>
          </Typography>
          <Button>{t(`global.sign-out`)}</Button>
        </Box>
      </Box> : ""}
    </Box>
  );
};

export default UserInfo;
