import { ProductState } from "../../@types/general";

import {REDUCER_ACTION_PROPS,REDUCER_ACTION_TYPES} from "./action"

export const initalState: ProductState = {cartItem:[] };


const reducer = (state: ProductState, action: REDUCER_ACTION_PROPS) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD_PRODUCT_ID:
      const excitedItem = [...state.cartItem]
      const findIttemIndex = excitedItem.findIndex((item)=> item.id === action.cartItem?.id)
      if(findIttemIndex !== -1){
        excitedItem[findIttemIndex].quantity++
      }else{
        excitedItem.push({...action.cartItem,quantity:1})
      }
      return { ...state, cartItem:excitedItem };
      case REDUCER_ACTION_TYPES.REMOVE_PRODUCT:
        {console.log(state)}
        const newItem = [...state.cartItem].filter(element => element.id !== action.id)
      return {...state,cartItem:newItem}
      default:
        return state
  }
};


export default reducer
