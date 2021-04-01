const INITIAL_STATES = {
  user:null
};

export default function (state = INITIAL_STATES, action) {
  switch (action.type) {

    case "DOWNLOAD":
      return {
        ...state,
        downloads:[...state.downloads,action.payload]
      };
    case "SAVE_USER":
      return {
        ...state,
        user:action.payload
      };
    
    default:
      return state;
  }
}
