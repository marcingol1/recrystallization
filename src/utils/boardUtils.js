/**
 * Generates a single row of a board and populates it with a random bool values (0, 1)
 * @param size - size of a row
 */
const createRandomRow = (size) => [...new Array(size)].map(() => Math.round(Math.random()))

/**
 * Maps rows of a board into a 2D array for startup of a game
 * @param size
 */
const generateBoard = (size) => [...new Array(size)].map(() => createRandomRow(size))

/**
 * Creates object of cleared board with providen size
 * @param {Number} size - board size
 */
export function instantiateBoard (size) {
  return {
    size,
    board: generateBoard(parseInt(size, 10))
  }
}

export function cellLifecycle(cell) {}