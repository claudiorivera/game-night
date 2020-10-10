export const reducer = (state, { type, user, events }) => {
  switch (type) {
    case "REGISTER_USER_SUCCESSFUL_WITH_USER":
    case "LOGIN_SUCCESSFUL_WITH_USER":
    case "AUTH_USER_SUCCESSFUL_WITH_USER":
      return { ...state, user };
    case "GET_USER_EVENTS_SUCCESSFUL_WITH_EVENTS":
      return { ...state, user: { ...state.user, events } };
    case "GET_USER_EVENTS_HOSTING_SUCCESSFUL_WITH_EVENTS":
      return { ...state, user: { ...state.user, eventsHosting: events } };
    case "DELETE_USER_BY_ID_SUCCESSFUL":
    case "LOGOUT_SUCCESSFUL":
      return { ...state, user: null };
    default:
      return state;
  }
};
