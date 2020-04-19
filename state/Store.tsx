import React, {createContext, useReducer} from "react"
import Reducer from './UserReducer'

type userStateType = {
    posts: any[],
    userName: string,
    userIcon: string
}

const userState: userStateType = {
    posts: [],
    userName: '',
    userIcon: ''
}

export const UserContext = createContext(userState)

export default ({children}: {children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, userState)
    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}
