export const events = (state, { type, event }) => {
  switch (type) {
    case "JOIN_EVENT_SUCCESSFUL_WITH_EVENT":
    case "ADD_EVENT_SUCCESSFUL_WITH_EVENT":
      return { ...state, event };
    default:
      return state;
  }
};
