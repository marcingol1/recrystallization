import ActionType from '../constants/ActionType'

const initialState = {
  interval: undefined,
  intervalTime: 1000
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.CREATE_INTERVAL: {
      return {
        interval: action.interval,
        intervalTime: action.intervalTime
      }
    }
    case ActionType.REMOVE_INTERVAL: {
      clearInterval(state.interval)
      return {
        ...state,
        interval: undefined
      }
    }
    default:
      return { ...state }
  }
}