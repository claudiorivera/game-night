const users = (state = [], { type, payload }) => {
  switch (type) {
    case "GET_USERS_SUCCESSFUL":
      return payload;
    case "REGISTER_USER_SUCCESSFUL":
      return [...state, payload];
    default:
      return state;
  }
};

export default users;
