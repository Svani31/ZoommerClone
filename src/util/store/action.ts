import {  itemProps } from "../../@types/general";

export enum REDUCER_ACTION_TYPES {
  ADD_PRODUCT_ID,
  REMOVE_PRODUCT,
  INCRESE_QUANTITY,
  DECRESE_QUANTITY
}

export type REDUCER_ACTION_PROPS = {
  type: REDUCER_ACTION_TYPES;
  id: string;
  cartItem:itemProps
};
