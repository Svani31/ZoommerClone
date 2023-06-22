import { useState } from "react";
import "./carousel__nav.scss";

// mui Links
import { Box, Paper, Typography } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import HeadphonesOutlinedIcon from "@mui/icons-material/HeadphonesOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import ScreenLockPortraitOutlinedIcon from "@mui/icons-material/ScreenLockPortraitOutlined";
import HdrStrongOutlinedIcon from "@mui/icons-material/HdrStrongOutlined";
import AudiotrackOutlinedIcon from "@mui/icons-material/AudiotrackOutlined";
import PersonalVideoOutlinedIcon from "@mui/icons-material/PersonalVideoOutlined";
// import translation
import { useTranslation } from "react-i18next";
import { useStore } from "../../../util/store/store";
const CarouselNav = () => {

  const { burgerMenu, setBurgerMenu } = useStore();
  const { t } = useTranslation();

  return (
    <Box className="content__inner">
      <Box className={burgerMenu ? "carousel__nav active" : "carousel__nav" }>
        <Box className="nav">
          <ListOutlinedIcon /> {t(`global.Navigation`)}
          <Typography className="all__type" variant="subtitle2">
            {t(`global.All`)}
          </Typography>
        </Box>
        <Box className="carousel__brands">
          <Box className="brand__list">
            <PhoneAndroidOutlinedIcon className="mui__item" />
            <Typography variant="subtitle2">{t(`global.Phone`)}</Typography>
          </Box>
          <Box className="brand__list">
            <HeadphonesOutlinedIcon className="mui__item" />
            <Typography variant="subtitle2">{t(`global.Headphone`)}</Typography>
          </Box>
          <Box className="brand__list">
            <SportsEsportsOutlinedIcon className="mui__item" />
            <Typography variant="subtitle2">{t(`global.Gaming`)}</Typography>
          </Box>
          <Box className="brand__list">
            <ScreenLockPortraitOutlinedIcon className="mui__item" />
            <Typography variant="subtitle2">
              {t(`global.Accessories`)}
            </Typography>
          </Box>
          <Box className="brand__list">
            <AudiotrackOutlinedIcon className="mui__item" />
            <Typography variant="subtitle2">
              {t(`global.Audio System`)}
            </Typography>
          </Box>
          <Box className="brand__list">
            <PersonalVideoOutlinedIcon className="mui__item" />
            <Typography variant="subtitle2">
              {t(`global.Television`)}
            </Typography>
          </Box>
          <Box className="brand__list">
            <HdrStrongOutlinedIcon className="mui__item" />
            <Typography variant="subtitle2">{t(`global.Else`)}...</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselNav;
