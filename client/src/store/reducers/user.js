const users = (state = {}, { type, payload }) => {
  switch (type) {
    case "REGISTER_USER_SUCCESSFUL":
    case "LOGIN_USER_SUCCESSFUL":
      return payload;
    default:
      return state;
  }
};

export default users;
