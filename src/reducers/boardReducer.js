import _ from 'lodash'
import ActionType from '../constants/ActionType'
//import { boardLifecycle } from '../utils/lifecycleUtils'
import { boardLifecycle } from '../utils/germGrowthUtils'
import { getRandomColor } from '../utils/generateUtils'

const initialState = [
  [{ value: 0, color: '#000' }, { value: 1, color: '#000'}],
  [{ value: 0, color: '#000' }, { value: 1, color: '#000'}]
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
      let clone = _.cloneDeep(state), obj = state[action.row][action.column]
      clone[action.row][action.column] = { value: !obj.value, color: getRandomColor()}
      return [
        ...clone
      ]
    }
    default:
      return [...state]
  }
}