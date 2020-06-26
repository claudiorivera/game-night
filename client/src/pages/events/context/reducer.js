export const reducer = (state, { type, event, events }) => {
  switch (type) {
    case "JOIN_EVENT_SUCCESSFUL_WITH_EVENT":
    case "ADD_EVENT_SUCCESSFUL_WITH_EVENT":
      return { ...state, event };
    case "GET_ALL_EVENTS_SUCCESSFUL_WITH_EVENTS":
      return { ...state, events };
    default:
      return state;
  }
};
