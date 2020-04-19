import React, {createContext, useReducer} from "react"
import Reducer from './Reducer'
import PostReducer, { PostContext } from './PostReducer'

type userStateType = {
    posts: any[],
    userName: string,
    userIcon: string,
    feeds: any[]
}

const userState: userStateType = {
    // user
    posts: [],
    userName: '',
    userIcon: '',
    // post
    feeds: []
}

export const Context = createContext(userState)

export default ({children}: {children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(Reducer, userState)
    return (
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    )
}
