import ActionType from '../constants/ActionType'
import { generateBoard } from '../utils/generateUtils'
/**
 * Creates board for game of life with providen size
 * @param form {Object} - data of a form
 * @param form.boardSize {Number} - size of a board
 * @param form.distributionType {String} - type of a board to generate
 * @oaran form.pointsQuantity {Number} - number of points to get
 * @oaran form.colorsQuantity {Number} - number of colors to get
 */
export function createBoard (form) {
  return {
    type: ActionType.CREATE_BOARD,
    board: generateBoard(form.boardSize, form.distributionType, form.pointsQuantity, form.monteCarlo)
  }
}

/**
 * Creates a single iteration on a board
 * @param boardData {Object}
 * @param settings {Object}
 * @returns {{type: string, board: Array, settings: Object}} - state of board
 */
export function boardLifecycleAction (boardData, settings) {
  return {
    type: ActionType.BOARD_LIFECYCLE,
    board: boardData,
    settings
  }
}

/**
 * Changes a signle cell on a board
 * @param row
 * @param column
 */
export function cellChange(row, column) {
  return {
    type: ActionType.CELL_CHANGE,
    row,
    column
  }
}

export function addColor() {
  return {
    type: ActionType.ADD_COLOR
  }
}