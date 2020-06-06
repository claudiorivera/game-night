export const AppReducer = (state, { type, payload }) => {
  switch (type) {
    case "REGISTER_USER_FAILED":
    case "USER_LOGIN_FAILED":
    case "CHECK_IS_AUTHENTICATED_FAILED":
      return { ...state, error: payload, isAuthenticated: false, user: null };
    case "REGISTER_USER_SUCCESSFUL":
    case "USER_LOGIN_SUCCESSFUL":
      return { ...state, user: payload, isAuthenticated: true };
    case "CHECK_IS_AUTHENTICATED_SUCCESSFUL":
      return {
        ...state,
        isAuthenticated: payload,
      };
    case "CREATE_ERROR_MESSAGE":
      return {
        ...state,
        error: payload,
      };
    case "CLEAR_ERROR_MESSAGE":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
