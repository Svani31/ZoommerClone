import axios from "axios";



const ajax = axios.create({
    baseURL:import.meta.env.VITE_SOME_KEY,
    headers: {
        Accept:"application/json",
        "Content-Type":"application/json"
    }
})



export default ajax