import { useState, useEffect } from "react";
import "./registration.scss";
// Material UI and React Rout Dom
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { TextField, InputLabel, Button, colors } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

// FireBase PopUp and Redirect Log in
import { getRedirectResult } from "firebase/auth";
import {
  signInWithGooglePopup,
  signInWithgoogleRedirect,
  auth,
  createUserDocumentFromoAuth,
} from "../../../../util/firebase/firebase.js";

// import Formik and Yup here
import { useFormik } from "formik";
import { BasicSchema } from "../../../../util/schema/schema.js";

interface formikProps {
  email: "";
  password: "";
  confirmPassword: "";
}

const initialValues: formikProps = {
  email: "",
  password: "",
  confirmPassword: "",
};
const Registration = () => {
  const { values, handleSubmit, handleChange, errors } = useFormik({
    initialValues,
    validationSchema: BasicSchema,
    onSubmit: (values: formikProps) => {
      const user = JSON.parse(localStorage.getItem("user")!) || [];
      localStorage.setItem("user", JSON.stringify([...user, values]));
    },
  });

  const [toggle, setToggle] = useState<boolean>(false);
  const [registration, setRegistration] = useState<boolean>(false);

  useEffect(() => {
    const getResultFromRedirect = async () => {
      const respons = await getRedirectResult(auth);
      console.log(respons);
    };
    getResultFromRedirect();
  }, []);

  return (
    <div className="header__registration">
      <div className="loggin__onclicked" onClick={() => setToggle(!toggle)}>
        <AccountCircleOutlinedIcon />
        <span>პროფილი</span>
      </div>
      {toggle === true ? (
        <>
          <div
            className={
              registration === true
                ? "loggin__dropdown hidden"
                : "loggin__dropdown"
            }
          >
            <form id="loggin__form">
              <span>ავტორიზაცია</span>
              <TextField
                sx={{
                  marginTop: "15px",
                }}
                label="ელ-ფოსტა"
                size="small"
                name="email"
              />
              <TextField
                sx={{
                  marginTop: "15px",
                }}
                label="პაროლი"
                size="small"
                type="password"
              />
              <Link to={"/resetpassword"}>
                <span
                  style={{
                    float: "right",
                    margin: "15px 0",
                    color: "#007bff",
                    fontSize: "12px",
                  }}
                >
                  დაგავიწყდა პაროლი?
                </span>
              </Link>
              <div
                style={{
                  gap: "15px",
                  display: "inline-flex",
                }}
              >
                <Button variant="contained" className="loggin__button">
                  შესვლა
                </Button>
                <Button
                  className="login__button"
                  onClick={() => setRegistration(!registration)}
                >
                  რეგისტრაცია
                </Button>
              </div>
            </form>
            <span className="google__span">Or Login With Gmail</span>
            <Button
              variant="contained"
              color="success"
              sx={{
                width: "75%",
                margin: "auto",
                marginBottom: "15px",
              }}
              onClick={signInWithgoogleRedirect}
            >
              Google
            </Button>
          </div>
        </>
      ) : (
        ""
      )}
      <div
        className={
          registration === true
            ? "registration transform__onclick"
            : "registration hidden"
        }
      >
        <form id="registration__form" action="" onSubmit={handleSubmit}>
          <div
            className="registration__text"
            onClick={() => setRegistration(!registration)}
          >
            <ArrowBackIosNewOutlinedIcon
              sx={{
                fontSize: "12px",
                borderRadius: "100%",
                backgroundColor: "#f5f5f5",
                float: "left",
              }}
            />
            <span>რეგისტრაცია</span>
          </div>
          <TextField
            sx={{
              marginTop: "15px",
            }}
            label="ელ-ფოსტა"
            size="small"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            sx={{
              marginTop: "15px",
            }}
            label="პაროლი"
            size="small"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
          <TextField
            sx={{
              marginTop: "15px",
            }}
            label="დაადასტურე პაროლი"
            size="small"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <div
            style={{
              gap: "15px",
              display: "inline-flex",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              className="registration__button"
            >
              რეგისტრაცია
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
