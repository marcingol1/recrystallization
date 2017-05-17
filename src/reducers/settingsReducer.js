import ActionType from '../constants/ActionType'
import Settings from '../constants/Settings'
import { getRandomColor } from '../utils/generateUtils'

const initialState = {
  gameType: Settings.GAME_OF_LIFE,
  neighbourhoodType: Settings.MOORE,
  distributionType: Settings.CLEAR_BOARD,
  borderCondition: true,
  boardSize: 60
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.SET_SETTING: {
      return {
        ...state,
        ...action.formData
      }
    }
    case ActionType.ADD_COLOR: {
      return {
        ...state,
        colors: [ ...state.colors, getRandomColor()]
      }
    }
    default:
      return { ...state }
  }
}