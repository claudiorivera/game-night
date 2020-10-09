export const reducer = (state, { type, events }) => {
  switch (type) {
    case "GET_ALL_EVENTS_SUCCESSFUL_WITH_EVENTS":
      return { ...state, events };
    default:
      return state;
  }
};
