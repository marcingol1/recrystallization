import Settings from '../constants/Settings'
/**
 * Generates a single row of a board and populates it with a random bool values (0, 1)
 * @param size - size of a row
 */
const randomRow = (size) => [...new Array(size)].map(() => Math.round(Math.random()))

/**
 * Maps rows of a board into a 2D array for startup of a game
 * @param size
 */
const randomBoard = (size) => [...new Array(size)].map(() => randomRow(size))

/**
 * Creates an empty board (all cells dead)
 * @param size
 */
const clearBoard = (size) => [...new Array(size)].map(() => [...new Array(size).fill(0)])

/**
 * Depending on a type generates custom board
 * @param size - size of a board to generate
 * @param type - type of allocating alive cells
 */
export function generateBoard(size = 0, type) {
  switch (type) {
    case Settings.CLEAR_BOARD: {
      return clearBoard(size)
    }
    case Settings.RANDOM_BOARD: {
      return randomBoard(size)
    }
    default: {
      return randomBoard(size)
    }
  }
}
