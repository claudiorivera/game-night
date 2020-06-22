export const AppReducer = (
  state,
  { type, message, user, addedGame, games }
) => {
  switch (type) {
    case "REGISTER_USER_FAILED_WITH_MESSAGE":
    case "LOGIN_FAILED_WITH_MESSAGE":
    case "LOGOUT_FAILED_WITH_MESSAGE":
    case "DELETE_USER_BY_ID_FAILED_WITH_MESSAGE":
    case "ADD_GAME_FAILED_WITH_MESSAGE":
    case "JOIN_EVENT_FAILED_WITH_MESSAGE":
    case "JOIN_EVENT_SUCCESSFUL_WITH_MESSAGE":
    case "GET_GAMES_LIST_FAILED_WITH_MESSAGE":
      return { ...state, alert: message };
    case "REGISTER_USER_SUCCESSFUL_WITH_USER":
    case "LOGIN_SUCCESSFUL_WITH_USER":
    case "LOGOUT_SUCCESSFUL_WITH_USER":
    case "DELETE_USER_BY_ID_SUCCESSFUL_WITH_USER":
      return { ...state, user };
    case "ADD_GAME_SUCCESSFUL_WITH_GAME":
      return { ...state, addedGame };
    case "GET_GAMES_LIST_SUCCESSFUL_WITH_GAMES":
      return { ...state, games };
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
