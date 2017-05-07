import ActionType from '../constants/ActionType'
import { generateBoard } from '../utils/generateUtils'
/**
 * Creates board for game of life with providen size
 * @param size {Number} - size of a board
 * @param type {String} - type of a board to generate
 */
export function createBoard (size, type) {
  return {
    type: ActionType.CREATE_BOARD,
    board: generateBoard(size, type)
  }
}

/**
 * Creates a single iteration on a board
 * @param boardData
 * @returns {{type: string, board: Array}} - state of board
 */
export function boardLifecycleAction (boardData) {
  return {
    type: ActionType.BOARD_LIFECYCLE,
    board: boardData
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