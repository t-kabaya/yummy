// user
const SET_USER_NAME = 'SET_USER_NAME'
const SET_USER_ICON = 'SET_USER_ICON'
// post
const SET_FEEDS = 'SET_FEEDS'

export default (state: any, action: any) => {
  switch (action.type) {
    // user
    case SET_USER_NAME:
        return {
            ...state,
            userName: action.payload
        }
    case SET_USER_ICON:
        return {
            ...state,
            userIcon: action.payload
       }
    // post
    case SET_FEEDS:
        return {
            ...state,
            feeds: action.payload
        }
    default:
      return state
  }
}
