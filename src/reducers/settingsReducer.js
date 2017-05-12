import ActionType from '../constants/ActionType'
import Settings from '../constants/Settings'

const initialState = {
  gameType: Settings.GAME_OF_LIFE,
  neighbourhoodType: Settings.MOORE,
  distributionType: Settings.CLEAR_BOARD,
  borderCondition: true,
  boardSize: 15
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.SET_SETTING: {
      return {
        ...state,
        ...action.formData
      }
    }
    default:
      return { ...state }
  }
}