import ActionType from '../constants/ActionType'

const initialState = {
  size: 0,
  board: [[0,1],[1,1]]
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.CREATE_BOARD: { // shouldn't board_lifecycle handle all dirty work?
      return action.board
    }
    case ActionType.BOARD_LIFECYCLE: {
      return {
        size: state.size,
        board: action.board
      }
    }
    case ActionType.CELL_CHANGE: {
      return {
        ...state,
        board: action.board
      }
    }
    default:
      return { ...state }
  }
}