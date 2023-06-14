import { Box } from '@mui/material';
import CartItem from "./cart-item-component/cart-item"
import Registration from "./registration-component/registration"
import { useStore } from '../../../util/store/store';
import UserInfo from './registration-component/userProfComponent/user';


const LinkComponent = () =>{

    const {userToken,user} = useStore();


    return(
        <Box sx={{
            display:"flex",
            width:"250px",
            justifyContent:"space-between",
            textAlign:"center",
            alignItems:"center"
            
        }}>
            {userToken ? <UserInfo/> : <Registration/> }
            <CartItem/>
        </Box>
    )
}

export default LinkComponent