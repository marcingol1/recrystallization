import ActionType from '../constants/ActionType'
import { instantiateBoard } from '../utils/boardUtils'
import { boardLifecycle } from '../utils/boardUtils'
/**
 * Creates board for game of life with providen size
 */
export function createBoard (size) {
  return {
    type: ActionType.CREATE_BOARD,
    board: instantiateBoard(size)
  }
}

export function boardLifecycleAction (boardData) {
  return {
    type: ActionType.BOARD_LIFECYCLE,
    board: boardLifecycle(boardData)
  }
}