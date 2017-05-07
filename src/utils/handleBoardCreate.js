import { createBoard } from '../actions/boardActions'
import Settings from '../constants/Settings'

/**
 * Manages data given in a form and creates lifecycle routine
 * @param form {Object} - data for simulation
 * @param form.boardSize {String}
 * @param form.distributionType {String}
 * @param form.borderCondition {Boolean}
 * @param form.neighbourhoodType {String}
 * @returns {{type, board}|*} - action to dispatch creating board
 */
export default function handleBoardCreate(form) {
  const formData = extractData(form)
  return createBoard(formData.boardSize, formData.distributionType)
}

const extractData = (form) => {
  return {
    boardSize: parseInt(form.boardSize, 10) || 0,
    distributionType: form.distributionType || Settings.CLEAR_BOARD,
    borderCondition: form.borderCondition || true,
    neighbourhoodType: form.neighbourhoodType || Settings.MOORE
  }
}