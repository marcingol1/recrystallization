import ActionType from '../constants/ActionType'

/**
 * Creates board for game of life with providen size
 */
export function createBoard (size) {
  return {
    type: ActionType.CREATE_BOARD,
    board: ['haahaha']
  }
}