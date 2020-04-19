const SET_USER_NAME = 'SET_USER_NAME'
const SET_USER_ICON = 'SET_USER_ICON'

export default (state: any, action: any) => {
  switch (action.type) {
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
    default:
      return state;
  }
}
