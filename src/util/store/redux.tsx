type ProductProps = {
  id: string;
};

type ProductState = {
  productEl: ProductProps;
};

export const initalState: ProductState = { productEl: { id: "" } };

const enum REDUCER_ACTION_TYPES {
  ADD_PRODUCT_ID,
}

type REDUCER_ACTION_PROPS = {
  type: REDUCER_ACTION_TYPES;
  id: ProductProps;
};

const reducer = (state: ProductState, action: REDUCER_ACTION_PROPS) => {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.ADD_PRODUCT_ID:
      return { ...state, productEl: action.id };
  }
};


export default reducer
