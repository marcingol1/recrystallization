import ActionType from '../constants/ActionType'

const initialState = []

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.CREATE_BOARD: {
      return [
        ...action.board
      ]
    }
    default:
      return [...state]
  }
}