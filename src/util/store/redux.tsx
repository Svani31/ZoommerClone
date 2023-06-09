import { ProductState } from "../../@types/general";

import {REDUCER_ACTION_PROPS,REDUCER_ACTION_TYPES} from "./action"

export const initalState: ProductState = {cartItem:[] };


const reducer = (state: ProductState, action: REDUCER_ACTION_PROPS) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD_PRODUCT_ID:
      const exitedCartItem = [...state.cartItem]
      const findIttemIndex = exitedCartItem.findIndex((item)=> item.id === action.cartItem?.id)
      if(findIttemIndex !== -1){
        exitedCartItem[findIttemIndex].quantity++
      }else{
        exitedCartItem.push({...action.cartItem,quantity:1})
      }
      return { ...state, cartItem:exitedCartItem };
      case REDUCER_ACTION_TYPES.REMOVE_PRODUCT:
        {console.log(state)}
        const newItem = [...state.cartItem].filter(element => element.id !== action.id)
      return {...state,cartItem:newItem}
      case REDUCER_ACTION_TYPES.INCRESE_QUANTITY:
        const increseItem = [...state.cartItem]
        const excitiedIncreseItem = increseItem.findIndex((item) => item.id === action.cartItem.id)
        if(excitiedIncreseItem !== -1){
          increseItem[excitiedIncreseItem].quantity++
        }
        return {...state,cartItem:increseItem}
      case REDUCER_ACTION_TYPES.DECRESE_QUANTITY:
        const decriseItem = [...state.cartItem]
        const excitiedDecrise = decriseItem.findIndex((item) => item.id === action.cartItem.id)
        if(excitiedDecrise !== -1){
          if(decriseItem[excitiedDecrise].quantity >1){
            decriseItem[excitiedDecrise].quantity--
          }else{
            decriseItem.splice(excitiedDecrise,1)
          }
        }
        return {...state,cartItem:decriseItem}
      default:
        return state
  }
};


export default reducer
