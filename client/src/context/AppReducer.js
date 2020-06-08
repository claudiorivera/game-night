export const AppReducer = (state, { type, message, user, gameAdded }) => {
  switch (type) {
    case "REGISTER_USER_FAILED_WITH_MESSAGE":
    case "LOGIN_FAILED_WITH_MESSAGE":
    case "LOGOUT_FAILED_WITH_MESSAGE":
    case "DELETE_USER_BY_ID_FAILED_WITH_MESSAGE":
    case "ADD_GAME_FAILED_WITH_MESSAGE":
    case "ADD_GAME_SUCCESSFUL_WITH_MESSAGE":
      return { ...state, alert: message };
    case "REGISTER_USER_SUCCESSFUL_WITH_USER":
    case "LOGIN_SUCCESSFUL_WITH_USER":
    case "LOGOUT_SUCCESSFUL_WITH_USER":
    case "DELETE_USER_BY_ID_SUCCESSFUL_WITH_USER":
      return { ...state, user };
    case "CREATE_ALERT_WITH_MESSAGE":
      return {
        ...state,
        alert: message,
      };
    case "CLEAR_ALERT":
      return {
        ...state,
        alert: null,
      };
    default:
      return state;
  }
};
