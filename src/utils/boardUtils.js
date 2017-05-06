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
export function randomBoard (size) {
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
  return boardData.map((rowData, row) => rowData.map((cell, column) => hexLeftRule(boardData, cell, row, column)))
}

/**
 * Fetches cells - non-periodic
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Number} - 0 or 1 from boardData
 */
function getCell(boardData, row, column) {
  if (row < 0 || column < 0) return 0
  if (row === boardData.length || column === boardData.length) return 0
  return boardData[row][column]
}

/**
 * Fetches cell - periodic
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Number} - 0 or 1 from boardData
 */
function getCellPeriodic(boardData, row, column) {
  let tempRow = row,
      tempCol = column,
      size = boardData.length
  if (row === -1) tempRow = size - 1
  else if (row === size) tempRow = 0
  if (column === -1) tempCol = size - 1
  else if (column === size) tempCol = 0
  return boardData[tempRow][tempCol]
}

/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function getNeighboursMoore (boardData, row, column, ifPeriodic) {
  let fun = getCell;
  if (ifPeriodic) fun = getCellPeriodic;
  return [
    fun(boardData, row - 1, column - 1),
    fun(boardData, row - 1, column),
    fun(boardData, row - 1, column + 1),
    fun(boardData, row, column - 1),
    fun(boardData, row, column + 1),
    fun(boardData, row + 1, column - 1),
    fun(boardData, row + 1, column),
    fun(boardData, row + 1, column + 1)
  ]
}

/**
 * Core function counting neighbours and recycling cell based on Moore rule
 * @param boardData - stores all information about cells
 * @param cell - single cell to have her fate decided
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function mooreRule (boardData, cell, row, column) {
  const quantityNeighbours = getNeighboursMoore(boardData, row, column, true).reduce((x, y) => x + y)
  if (cell) {
    return quantityNeighbours === 2 || quantityNeighbours === 3 ? cell : 0
  } else {
    return quantityNeighbours === 3 ? 1 : cell
  }
}

/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function getNeighboursVonNeumann (boardData, row, column, ifPeriodic) {
  let fun = getCell;
  if (ifPeriodic) fun = getCellPeriodic;
  return [
    fun(boardData, row - 1, column),
    fun(boardData, row, column - 1),
    fun(boardData, row, column + 1),
    fun(boardData, row + 1, column)
  ]
}

/**
 * Core function counting neighbours and recycling cell based on Moore rule
 * @param boardData - stores all information about cells
 * @param cell - single cell to have her fate decided
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function vonNeumanRule (boardData, cell, row, column) {
  const quantityNeighbours = getNeighboursVonNeumann(boardData, row, column, true).reduce((x, y) => x + y)
  if (cell) {
    return quantityNeighbours === 2 || quantityNeighbours === 3 ? cell : 0
  } else {
    return quantityNeighbours === 3 ? 1 : cell
  }
}


/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function getNeighboursHexLeft (boardData, row, column, ifPeriodic) {
  let fun = getCell;
  if (ifPeriodic) fun = getCellPeriodic;
  return [
    fun(boardData, row - 1, column - 1),
    fun(boardData, row - 1, column),
    fun(boardData, row, column - 1),
    fun(boardData, row + 1, column - 1),
    fun(boardData, row + 1, column)
  ]
}

/**
 * Core function counting neighbours and recycling cell based on Moore rule
 * @param boardData - stores all information about cells
 * @param cell - single cell to have her fate decided
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function hexLeftRule (boardData, cell, row, column) {
  const quantityNeighbours = getNeighboursHexLeft(boardData, row, column, true).reduce((x, y) => x + y)
  if (cell) {
    return quantityNeighbours === 2 || quantityNeighbours === 3 ? cell : 0
  } else {
    return quantityNeighbours === 3 ? 1 : cell
  }
}