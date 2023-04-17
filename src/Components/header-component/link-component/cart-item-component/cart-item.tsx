import "./cart-item.scss"

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";

const CartItem = () =>{
    return(
            <div className='header__cartitem'>
                <Link className="cartitem__link" to={"/cart"}>
                    <ShoppingCartOutlinedIcon/>
                    <span>0 ლ</span>
                </Link>
                <div className="cartitem__dropdown">
                    <div className="cartitem__inner">
                    <h5>კალათა</h5>
                    <h4>ჯამი : <span>0 ₾</span></h4>
                    <button>კალათაში გადასვლა</button>
                    </div>
                </div>
            </div>

    )
}

export default CartItem