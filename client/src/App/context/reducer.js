export const reducer = (state, { type, message }) => {
  switch (type) {
    case "CREATE_ALERT_WITH_MESSAGE":
      return {
        ...state,
        message,
      };
    case "CLEAR_ALERT":
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
};
