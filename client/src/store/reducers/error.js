const error = (state = {}, { type, payload }) => {
  switch (type) {
    case "REGISTER_USER_FAILED":
    case "LOGIN_USER_FAILED":
      return payload;
    case "REGISTER_USER_SUCCESSFUL":
    case "LOGIN_USER_SUCCESSFUL":
      return {};
    default:
      return state;
  }
};

export default error;
