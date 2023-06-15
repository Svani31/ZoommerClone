import { Box, Button, Typography } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useTranslation } from "react-i18next";

import "./navigation.scss";
const Navigation = () => {

    const {t} = useTranslation()

  return (
    <Box className="product-form">
      <Box className="navigation">
        <Box className="nav__left">
          <Typography className="nav__title" variant="h6">
            <ListOutlinedIcon /> {t("global.Navigation")}
          </Typography>
          <Typography className="nav__subtitle" variant="subtitle2">{t("global.All")}</Typography>
        </Box>
        <Box className="nav__right">
          <Typography className="nav__directory">
            {t("global.Main")} <KeyboardArrowRightIcon />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
