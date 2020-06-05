const users = (state = [], { type, payload }) => {
  switch (type) {
    case "REGISTER_USER_SUCCESSFUL":
      return [...state, payload];
    default:
      return state;
  }
};

export default users;
