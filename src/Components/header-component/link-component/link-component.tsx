import { Box } from '@mui/material';
import CartItem from "./cart-item-component/cart-item"
import Registration from "./registration-component/registration"
import { useStore } from '../../../util/store/store';
import UserInfo from './registration-component/userProfComponent/user';
import "../header.scss"

const LinkComponent = () =>{

    const {userToken,user} = useStore();


    return(
        <Box className="linkedComponent" sx={{
            display:"flex",
            width:"250px",
            justifyContent:"space-between",
            textAlign:"center",
            alignItems:"center",
            gap:"50px",
            
        }}>
            {userToken ? <UserInfo/> : <Registration/> }
            <CartItem/>
        </Box>
    )
}

export default LinkComponent