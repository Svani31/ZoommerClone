// @ts-nocheck
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./registration.scss";
// Material UI and React Rout Dom
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { TextField, InputLabel, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
// FireBase PopUp and Redirect Log in
import { confirmPasswordReset, getRedirectResult } from "firebase/auth";
import {
  signInWithGooglePopup,
  signInWithgoogleRedirect,
  auth,
  createUserDocumentFromoAuth,
} from "../../../../util/firebase/firebase.js";

// import Formik and Yup here
import { Formik, useFormik } from "formik";
import { BasicSchema } from "../../../../util/schema/schema.js";
// impriting translationhook
import {useTranslation} from "react-i18next"

// backend helpe
import axios from "axios";
import ajax from "../../../../util/service/ajax";
import { useStore } from "../../../../util/store/store";

type formikProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
};

const initialValues: formikProps = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  password: "",
};

const Registration = () => {

  const [toggle, setToggle] = useState<boolean>(false);
  const [registration, setRegistration] = useState<boolean>(false);
  const [loginValue, setLoginValue] = useState({ email: "", password: "" });
  
  const { setUserToken,user,setUser} = useStore();
  console.log(user,"this is user")
  // useFormikValidation
  const { values, handleSubmit, handleChange, errors,touched } = useFormik({
    initialValues,
    validationSchema: BasicSchema,
    onSubmit: async (values: formikProps) => {
      const registrationValue = await ajax.post("/register", values);
      setRegistration(false)
      alert("registration success")
      console.log(registrationValue,"this is registration value")
    },
  });

    const {t} = useTranslation()
  

  // getting respons fom google login
  useEffect(() => {
    const getResultFromRedirect = async () => {
      const respons = await getRedirectResult(auth);
    };
    getResultFromRedirect();
  }, []);


  // getting login value
  const loginHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginValue((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };


  // submiting login value handler and getting users information in the object
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginRespons = await ajax.post("/login", loginValue);
      if (loginRespons.data) {
        setUserToken(loginRespons.data.AccessToken);
        setUser(loginRespons.data.User, "login Success");
        alert("Login Success")
      }
    } catch (error) {
      alert("Password Or Email is Incorrect")
      setLoginValue({email:"",password:""})
      
    }
  };

  return (
    <Box className="header__registration">
      <Box className="loggin__onclicked" onClick={() => setToggle(!toggle)}>
        <AccountCircleOutlinedIcon />
        <span>{t(`global.Profile`)}</span>
      </Box>
      {toggle === true ? (
        <>
          <Box
            className={
              registration === true
                ? "loggin__dropdown hidden"
                : "loggin__dropdown"
            }
          >
            <form id="loggin__form" onSubmit={(e) => submitHandler(e)}>
              <span>{t(`global.sign-in`)}</span>
              <TextField
                sx={{
                  marginTop: "15px",
                }}
                label={t(`global.Email`)}
                size="small"
                name="email"
                value={loginValue.email}
                onChange={(e) => loginHandler(e)}
              />
              <TextField
                sx={{
                  marginTop: "15px",
                }}
                label={t("global.Password")}
                size="small"
                type="password"
                name="password"
                value={loginValue.password}
                onChange={(e) => loginHandler(e)}
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
                  {t(`global.Forggot-Password`)}?
                </span>
              </Link>
              <Box
                style={{
                  gap: "15px",
                  display: "inline-flex",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  className="loggin__button"
                >
                  {t("global.sign-in")}
                </Button>
                <Button
                  className="login__button"
                  onClick={() => setRegistration(!registration)}
                >
                  {t(`global.Registration`)}
                </Button>
              </Box>
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
          </Box>
        </>
      ) : (
        ""
      )}
      <Box
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
            <span>{t(`global.Registration`)}</span>
          </div>
          <TextField
            sx={{
              marginTop: "15px",
            }}
            label={t("global.First-name")}
            size="small"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            error={touched.firstName && !!errors.firstName}
            helperText={errors.firstName}
          />
          <TextField
            sx={{
              marginTop: "15px",
            }}
            label={t("global.Last-name")}
            size="small"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            error={touched.lastName && !!errors.lastName}
            helperText={errors.lastName}
          />
          <TextField
            sx={{
              marginTop: "15px",
            }}
            label={t("global.Phone-number")}
            size="small"
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            error={touched.phoneNumber && !!errors.phoneNumber}
            helperText={errors.phoneNumber}
          />
          <TextField
            sx={{
              marginTop: "15px",
            }}
            label={t("global.Email")}
            size="small"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={touched.email && !!errors.email}
            helperText={errors.email}
          />
          <TextField
            sx={{
              marginTop: "15px",
            }}
            label={t(`global.Password`)}
            size="small"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={ touched.password &&!!errors.password}
            helperText={errors.password}
          />

          <Box
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
              {t(`global.Registration`)}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Registration;
