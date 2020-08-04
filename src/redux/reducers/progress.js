export const accountProgress = (state = [], action) => {
  switch (action.type) {
    case "ADD_ACCOUNT_PROGRESS":
      return [...state, { ...action.payload, id: Date.now(), complete: false, inFlight: false }];
    case "ADD_ACCOUNT_PROGRESS_FLIGHT":
      return state.map(item => {
        if (action.id === item.id) item.inFlight = true;
        return item;
      });
    case "ADD_ACCOUNT_PROGRESS_COMPLETED":
      return state.map(item => {
        if (action.id === item.id) item.complete = true;
        return item;
      });
    default:
      return state;
  }
};
