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
import { useTranslation } from "react-i18next";

const UserInfo = () => {
  
  
  const { user, userToken, isAdmin } = useStore();
  const [showDropdown, setShowDropDown] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLFormElement | null>(null);
  const { t } = useTranslation();
  console.log(isAdmin);
  console.log(user);

  // outSideClickHandler
  useEffect(() => {
    const outSideClicke = (event: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", outSideClicke);
    return ()=>{
        document.removeEventListener("mousedown",outSideClicke)
    }
  }, []);

  

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
      {showDropdown === true ? (
        <Box ref={dropDownRef} className="user__dropdown">
          <Box>
            <Typography className="user__types">
              <Link className="user__type_link" to={"/profile"}>
                {t("global.Profile")}
              </Link>
            </Typography>
            <Typography className="user__types">
              <Link className="user__type_link" to={""}>
                {t("global.Orders")}
              </Link>
            </Typography>
            <Typography className="user__types">
              <Link className="user__type_link" to={""}>
                {t(`global.Address`)}
              </Link>
            </Typography>
            <Typography className="user__types">
              <Link className="user__type_link" to={""}>
                {t(`global.Messages`)}
              </Link>
            </Typography>
            <Typography className="user__types">
              <Link className="user__type_link" to={"/password"}>
                {t(`global.Password-change`)}
              </Link>
            </Typography>
           {isAdmin ? ( <Typography className="user__types">
              <Link className="user__type_link" to={"/admin"}>
                Admin Credential
              </Link>
            </Typography>) : ("")}
            <Button onClick={()=> window.location.reload()} >{t(`global.sign-out`)}</Button>
          </Box>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default UserInfo;
