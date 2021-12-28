import { initialState } from "../store/store";

export const UserRed = (state = initialState.user, action) => {
  switch (action.type) {
    case "ADD_NAME":
      return {
        ...state,
        name: action.payload,
      };
    case "LOG_OUT":
      return {
        ...state,
        name: "",
      };
    default:
      return state;
  }
};
