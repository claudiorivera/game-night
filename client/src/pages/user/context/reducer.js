export const reducer = (state, { type, user }) => {
  switch (type) {
    case "REGISTER_USER_SUCCESSFUL_WITH_USER":
    case "LOGIN_SUCCESSFUL_WITH_USER":
    case "LOGOUT_SUCCESSFUL_WITH_USER":
    case "DELETE_USER_BY_ID_SUCCESSFUL_WITH_USER":
    case "AUTH_USER_SUCCESSFUL_WITH_USER":
      return { ...state, user };
    default:
      return state;
  }
};
