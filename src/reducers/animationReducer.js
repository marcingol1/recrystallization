import ActionType from '../constants/ActionType'

const initialState = {
  intervalCb: null,
  intervalTime: 1000
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.CREATE_INTERVAL: {
      return {
        intervalCb: action.intervalCb,
        intervalTime: action.intervalTime
      }
    }
    case ActionType.REMOVE_INTERVAL: {
      return {
        ...state
      }
    }
    default:
      return { ...state }
  }
}