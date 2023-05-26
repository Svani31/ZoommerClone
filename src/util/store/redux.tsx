import { ProductState } from "../../@types/general";

import {REDUCER_ACTION_PROPS,REDUCER_ACTION_TYPES} from "./action"

export const initalState: ProductState = {cartItem:[] };


const reducer = (state: ProductState, action: REDUCER_ACTION_PROPS) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD_PRODUCT_ID:
      const newCartItem = [...state.cartItem]
      return { ...state, cartItem:[...state.cartItem,action.cartItem] };
      case REDUCER_ACTION_TYPES.REMOVE_PRODUCT:
        {console.log(state)}
        const newItem = [...state.cartItem].filter(element => element.id !== action.id)
      return {...state,cartItem:newItem}
  }
};


export default reducer
