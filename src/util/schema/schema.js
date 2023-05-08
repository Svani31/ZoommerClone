import * as yup from "yup"

const passwordValidation = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/


export const BasicSchema = yup.object().shape({
    // username:yup.string().min(4).required("Required"),
    email:yup.string().email("Please enter a valid email").required("Required"),
    password:yup.string().required("Required"),
    confirmPassword:yup.string().oneOf([yup.ref("password"),""], "Password Must Match").required("Please Confirm Password")
})