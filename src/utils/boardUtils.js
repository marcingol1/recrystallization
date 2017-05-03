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

/**
 * Makes a one iteration of Conwell's game
 * Changes cells to alive/dead depending on neighbours
 * @param boardData {Array} - data in format:
 * [
 *  [0, 0, 1],
 *  [1, 0, 1],
 *  [1, 1, 1]
 *  ]
 *  alive cell - alive if has 2 or 3
 *  dead cell - rebirths if has 3 by reproduction
 */
export function boardLifecycle (boardData) {
  return boardData.map((rowData, row) => rowData.map((cell, column) => cellLifecycle(boardData, cell, row, column)))
}

function getCell(boardData, row, column) {
  if (row < 0 || column < 0) return 0
  if (row === boardData.length || column === boardData.length) return 0
  return boardData[row][column]
}

/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Array} - neighbours of a cell
 */
function getNeighbours (boardData, row, column) {
  return [
    getCell(boardData, row - 1, column - 1),
    getCell(boardData, row - 1, column),
    getCell(boardData, row - 1, column + 1),
    getCell(boardData, row, column - 1),
    getCell(boardData, row, column + 1),
    getCell(boardData, row + 1, column - 1),
    getCell(boardData, row + 1, column),
    getCell(boardData, row + 1, column + 1),
  ]
}

/**
 * Core function counting neighbours and creating decision based on their quantity
 * @param boardData - stores all information about cells
 * @param cell - single cell to have her fate decided
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function cellLifecycle (boardData, cell, row, column) {
  const quantityNeighbours = getNeighbours(boardData, row, column).reduce((x, y) => x + y)
  if (cell) {
    return quantityNeighbours === 2 || quantityNeighbours === 3 ? cell : 0
  } else {
    return quantityNeighbours === 3 ? 1 : cell
  }
}