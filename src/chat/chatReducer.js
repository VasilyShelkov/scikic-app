import { INTERESTED } from './chatActions';

const chatReducer = (state = {}, action) => {
  switch (action.type) {
  case INTERESTED:
    return {
      ...state,
      interested: action.interested,
    };
  default:
    return state;
  }
};

export default chatReducer;
