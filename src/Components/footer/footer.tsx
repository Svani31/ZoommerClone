// importing mui items
import { Box, TextField, Typography } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import DuoOutlinedIcon from "@mui/icons-material/DuoOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
// importing scss
import "./footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box className="bottom__footer">
      <Box className="footer__header">
        <Box className="content__inner">
          <Box className="icones">
            <Box className="input__box">
              <input />
              <ReplyOutlinedIcon className="sent__btn" />
            </Box>
            <span className="facebook">
              <FacebookOutlinedIcon className="facebook__icone"/>
            </span>
            <span className="youtube">
              <DuoOutlinedIcon className="youtube__icone"/>
            </span>
          </Box>
        </Box>
      </Box>
      <Box className="content__inner">
        <Box className="footer">
          <Box className="footer__inner">
            <Typography className="footer__title" variant="h5" fontWeight={700}>
              ნავიგაცია
            </Typography>
            <Link className="footer__inner_link" to={""}>
              ჩვენ შესახებ
            </Link>
            <Link className="footer__inner_link" to={""}>
              ვაკანსია
            </Link>
          </Box>
          <Box className="footer__inner">
            <Typography className="footer__title" variant="h5" fontWeight={700}>
              გადახდები
            </Typography>
            <Link className="footer__inner_link" to={""}>
             გადახდის მეთოდები
            </Link>
            <Link className="footer__inner_link" to={""}>
             გარანტია
            </Link>
            <Link className="footer__inner_link" to={""}>
             განვადება
            </Link>
          </Box>
          <Box className="footer__inner">
            <Typography className="footer__title" variant="h5" fontWeight={700}>
              ჩემი ანგარრიში
            </Typography>
            <Link className="footer__inner_link" to={""}>
             ონლაინ განვადება
            </Link>
            <Link className="footer__inner_link" to={""}>
             ნივთის დაბრუნება
            </Link>
            <Link className="footer__inner_link" to={""}>
             Conditions of Use
            </Link>
          </Box>
          <Box className="footer__map">
            <Typography className="footer__title" variant="h5" fontWeight={700}>
              კონტაქტი
            </Typography>
            
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2977.9465978761473!2d44.797301475365124!3d41.72167117519482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440d331587606d%3A0x59c4c2d344d9664!2z4YOW4YOj4YOb4YOU4YOg4YOY!5e0!3m2!1ska!2sge!4v1686575302003!5m2!1ska!2sge"
                width="400"
                height="300"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map"
              ></iframe>
    
          </Box>
        </Box>
      </Box>
      Copyright © 2023 Zoommer.ge. All rights reserved.
    </Box>
  );
};

export default Footer;
