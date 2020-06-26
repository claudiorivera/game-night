export const reducer = (state, { type, addedGame, games }) => {
  switch (type) {
    case "ADD_GAME_SUCCESSFUL_WITH_GAME":
      return { ...state, addedGame };
    case "GET_GAMES_LIST_SUCCESSFUL_WITH_GAMES":
      return { ...state, games };
    default:
      return state;
  }
};
