import { Box } from '@mui/material';
import CartItem from "./cart-item-component/cart-item"
import Registration from "./registration-component/registration"


const LinkComponent = () =>{
    return(
        <Box sx={{
            display:"flex",
            width:"250px",
            justifyContent:"space-between",
            textAlign:"center",
            alignItems:"center"
            
        }}>
            <Registration/>
            <CartItem/>
        </Box>
    )
}

export default LinkComponent