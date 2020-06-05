const errors = (state = [], { type, payload }) => {
  switch (type) {
    case "REGISTER_USER_FAILED_PASSWORD_MISMATCH":
    case "REGISTER_USER_FAILED":
      return [payload];
    default:
      return state;
  }
};

export default errors;
