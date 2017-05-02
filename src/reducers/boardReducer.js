import ActionType from '../constants/ActionType'

const initialState = {
  size: 0,
  board: []
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.CREATE_BOARD: {
      console.log(action.board);
      return action.board
    }
    default:
      return { ...state }
  }
}