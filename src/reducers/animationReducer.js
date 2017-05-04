import ActionType from '../constants/ActionType'

const initialState = {
  intervalCb: null,
  intervalTime: 1000
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionType.CREATE_INTERVAL: {
      //why interval starts?
      return {
        intervalCb: action.intervalCb,
        intervalTime: action.intervalTime
      }
    }
    case ActionType.REMOVE_INTERVAL: {
      clearInterval(state.intervalCb)
      return {
        ...state
      }
    }
    default:
      return { ...state }
  }
}