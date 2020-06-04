const errors = (state = [], { type, payload }) => {
  switch (type) {
    case "GET_USERS_FAILED":
    case "REGISTER_USER_FAILED":
      return [...state, payload];
    default:
      return state;
  }
};

export default errors;
