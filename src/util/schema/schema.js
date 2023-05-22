import * as yup from "yup"



export const BasicSchema = yup.object().shape({
    firstName:yup.string().min(4).required("Required"),
    lastName:yup.string().min(4).required("Required"),
    phoneNumber:yup.string().min(4).required("Required"),
    email:yup.string().email("Please enter a valid email").required("Required"),
    password:yup.string().required("Required"),
})