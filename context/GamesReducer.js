export const reducer = (state, { type, games }) => {
  switch (type) {
    case "GET_GAMES_LIST_SUCCESSFUL_WITH_GAMES":
      return { ...state, games };
    default:
      return state;
  }
};
