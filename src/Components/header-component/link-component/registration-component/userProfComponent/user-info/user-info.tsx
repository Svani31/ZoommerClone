import { Box, Typography, TextField, Button } from "@mui/material";
import Navigation from "../../../../../navigation/navigation";
import "./user-info.scss";
import { useFormik } from "formik";
import { useStore } from "../../../../../../util/store/store";
import { useEffect } from "react";
import ajax from "../../../../../../util/service/ajax";
import { useNavigate } from "react-router-dom";

type formikProps = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
};

const Profile = () => {
  const { user, userToken } = useStore();

  const initialValues: formikProps = {
    firstName: `${user.firstName}`,
    lastName: `${user.lastName}`,
    phoneNumber: `${user.phoneNumber}`,
    email: `${user.email}`,
  };

  // use fromik for userProfile
  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: async (values: formikProps) => {
      try {
        const response = await ajax.post("/user",{
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: values.phoneNumber,
            email: values.email,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
          window.location.reload
      } catch (error) {
        console.error(error);
      }
    },
  });
  const navigae = useNavigate();
  // is user isNot logged take back on main page
  useEffect(() => {
    if (user) {
      navigae("/");
    }
  }, [user]);
 

  return (
    <Box sx={{background:"#f5f5f5"}}>
      <Navigation name={"User Setting"} />
      <Box className="user__info">
        <form onSubmit={handleSubmit}>
          <Box className="user__textfield">
        <Typography className="title" variant="h5">Account Info</Typography>
            <TextField
              placeholder="First Name"
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
            <TextField
              placeholder="Last Name"
              label="Last Name"
              value={values.lastName}
              name="lastName"
              onChange={handleChange}
            />
            <TextField
              placeholder="Email"
              label="Email"
              value={values.email}
              name="email"
              onChange={handleChange}
            />
            <TextField
              placeholder="Phone Number"
              label="Phone Number"
              value={values.phoneNumber}
              name="phoneNumber"
              onChange={handleChange}
            />
            <Button variant="contained" color="success" type="submit">
              Change Your Information
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Profile;
