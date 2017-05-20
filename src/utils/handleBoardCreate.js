import { createBoard } from '../actions/boardActions'
import ActionType from '../constants/ActionType'
import Settings from '../constants/Settings'

/**
 * Manages data given in a form and creates lifecycle routine
 * @param form {Object} - data for simulation
 * @param form.boardSize {String}
 * @param form.distributionType {String}
 * @param form.borderCondition {Boolean}
 * @param form.neighbourhoodType {String}
 * @param dispatch {Function} - pass dispatch to set options
 * @returns {{type, board}|*} - action to dispatch creating board
 */
export default function handleBoardCreate(form, dispatch) {
  const formData = extractData(form)
  dispatch({
    type: ActionType.SET_SETTING,
    formData
  })
  return createBoard(formData)
}

const extractData = (form) => {
  return {
    ...form,
    boardSize: parseInt(form.boardSize, 10) || 60,
    distributionType: form.distributionType || Settings.CLEAR_BOARD,
    neighbourhoodType: form.neighbourhoodType || Settings.MOORE
  }
}