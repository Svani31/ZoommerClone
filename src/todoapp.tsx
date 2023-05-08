import { initializeAuth } from "firebase/auth";
import { MouseEvent, useReducer,useState } from "react";

// const initalState = { count: 0,text:"" };

// const enum REDUCER_ACTION_TYPE {
//   INCREMENT,
//   DECREMENT,
//   USER_VALUE
// }

// type ReducerAction = {
//   type: REDUCER_ACTION_TYPE,
//   payload?:string
// };

// const reducer = (state: typeof initalState, action: ReducerAction):typeof initalState => {
//   switch (action.type) {
//     case REDUCER_ACTION_TYPE.INCREMENT:
//       return { ...state, count: state.count + 1 };
//     case REDUCER_ACTION_TYPE.DECREMENT:
//       return { ...state, count: state.count - 1 };
//       case REDUCER_ACTION_TYPE.USER_VALUE:
//         return {...state,text:action.payload || ""}
      
//   }
// };

// const Todo = () => {

//   const [state,dispatch] = useReducer(reducer,initalState)

//   const increaseHandler = () =>{
//     dispatch({type:REDUCER_ACTION_TYPE.INCREMENT})
//   }

//   const decreaseHandler = () =>{
//     dispatch({type:REDUCER_ACTION_TYPE.DECREMENT})
//   }

//   const inputHandler = (e: { target: { value: any; }; }) =>{
//     dispatch({type:REDUCER_ACTION_TYPE.USER_VALUE,payload:e.target.value})
//   }

//   return (
//     <div>
//       <button onClick={increaseHandler}>increase</button>
//       <span>{state.count}</span>
//       <button onClick={decreaseHandler}>decrease</button>
//       <input type="text" onChange={(e)=> inputHandler(e)} />
//       <span>{state.text}</span>
//     </div>
//   )
// };

// export default Todo;


const initalState:InitState = {value:"",todos:[] }

type InitState = {
  todos:string[],
  value:string
}

const enum REDUCE_ACTIVE_PROPS {
  USER_INPUT,
  ADD_TODO
}

type ReducerAction = {
  type:REDUCE_ACTIVE_PROPS,
  payload?:string 
}

const reducer = (state = initalState,action:ReducerAction) =>{
  switch(action.type){
    case REDUCE_ACTIVE_PROPS.USER_INPUT:
      return {...state,value:action.payload ?? ""}
      case REDUCE_ACTIVE_PROPS.ADD_TODO:
        return {...state,todos:[...state.todos,action.payload as string]}
  }
}

const Todo = () =>{

  const [state,dispatch] = useReducer(reducer,initalState)

  const clickHandler = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>{
    e.preventDefault()
    dispatch({type:REDUCE_ACTIVE_PROPS.ADD_TODO,payload:state.value})
    console.log(state.todos)
  }


  return(
    <div>
      <h1>this is Todo</h1>
      <form action="submit">
        <input value={state.value} onChange={(e)=> dispatch({type:REDUCE_ACTIVE_PROPS.USER_INPUT,payload:e.target.value})} type="text" />
        {state.todos.map((todoEl)=>{
          return(
            <h1 key={todoEl}>{todoEl}</h1>
          )
        })}
        <button type="submit" onClick={(e)=> clickHandler(e)}>Enter todos</button>
      </form>
    </div>
  )
}


export default Todo