import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer"

const INITIAL_STATE = {
    user: {
        _id: "63be18533875c47acdc40f40",
        username: "John",
        email:"john@gmail.com",
        profilePicture:"",
        coverPicture:"post/8.jpeg",
        followers:[],
        followings:[],
        isAdmin:false,
    },
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

    return(
        <AuthContext.Provider 
            value={{
                user: state.user, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatch,
            }}
        >  
            {children}
        </AuthContext.Provider>
    )
}