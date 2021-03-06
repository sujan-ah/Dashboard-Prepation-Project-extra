import { createContext, useReducer } from "react";

const Store = createContext();


const userInitialState = {
  userInfo: localStorage.getItem("userInfo") 
  ? JSON.parse(localStorage.getItem("userInfo")) 
  : null
}

function userreducer (state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
        return {...state, userInfo: action.payload}

    case "USER_LOGOUT":
        return {...state, userInfo: null}

      
      default:
      return state;
    }
}



function StoreProvider(props) {
  const [state, dispatch] = useReducer(userreducer, userInitialState); 


  const value = { state,dispatch };
  return <Store.Provider value={value}>
    {props.children}
  </Store.Provider>;
}

export { Store, StoreProvider };

 