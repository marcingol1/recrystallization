import _ from 'lodash'
import ActionType from '../constants/ActionType'
import { boardLifecycle } from '../utils/lifecycleUtils'
const initialState = [
  [0,1,1,0,1],
  [0,1,1,0,1],
  [0,1,1,0,1],
  [0,1,1,0,1],
  [0,1,1,0,1]
]

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.CREATE_BOARD: {
      return [
        ...action.board
        ]
    }
    case ActionType.BOARD_LIFECYCLE: {
      return [
        ...boardLifecycle(action.board, action.settings)
      ]
    }
    case ActionType.CELL_CHANGE: {
      let clone = _.cloneDeep(state)
      clone[action.row][action.column] = !clone[action.row][action.column]
      return [
        ...clone
      ]
    }
    default:
      return [...state]
  }
}