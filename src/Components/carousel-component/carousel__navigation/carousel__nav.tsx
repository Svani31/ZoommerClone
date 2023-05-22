import "./carousel__nav.scss";

// mui Links
import { Box, Paper, Typography } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import PhoneAndroidOutlinedIcon from '@mui/icons-material/PhoneAndroidOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import ScreenLockPortraitOutlinedIcon from '@mui/icons-material/ScreenLockPortraitOutlined';
import HdrStrongOutlinedIcon from '@mui/icons-material/HdrStrongOutlined';
import AudiotrackOutlinedIcon from '@mui/icons-material/AudiotrackOutlined';
import PersonalVideoOutlinedIcon from '@mui/icons-material/PersonalVideoOutlined';

const CarouselNav = () => {

  return (
    <Box className="content__inner">
      <Box className="carousel__nav">
        <Box className="nav">
          <ListOutlinedIcon /> ნავიგაცია
          <Typography className="all__type" variant="subtitle2">ყველა</Typography>
        </Box>
        <Box className="carousel__brands">
            <Box className="brand__list">
                    <PhoneAndroidOutlinedIcon className="mui__item"/>
                    <Typography variant="subtitle2">
                       ტელეფონი
                    </Typography>
            </Box>
            <Box className="brand__list">
                    <HeadphonesOutlinedIcon className="mui__item"/>
                    <Typography variant="subtitle2">
                       ყურსასმენი
                    </Typography>
            </Box>
            <Box className="brand__list">
                    <SportsEsportsOutlinedIcon className="mui__item"/>
                    <Typography variant="subtitle2">
                       Gaming
                    </Typography>
            </Box>
            <Box className="brand__list">
                    <ScreenLockPortraitOutlinedIcon className="mui__item"/>
                    <Typography variant="subtitle2">
                       აქსესუარები
                    </Typography>
            </Box>
            <Box className="brand__list">
                    <AudiotrackOutlinedIcon className="mui__item"/>
                    <Typography variant="subtitle2">
                       აუდი სისტემ
                    </Typography>
            </Box>
            <Box className="brand__list">
                    <PersonalVideoOutlinedIcon className="mui__item"/>
                    <Typography variant="subtitle2">
                       ტელევიზორი
                    </Typography>
            </Box>
            <Box className="brand__list">
                    <HdrStrongOutlinedIcon className="mui__item"/>
                    <Typography variant="subtitle2">
                       სხვა...
                    </Typography>
            </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CarouselNav;
