import Settings from '../constants/Settings'

/**
 * Makes a one iteration of Conwell's game
 * Changes cells to alive/dead depending on neighbours
 * @param boardData {Array} - data in format:
 * @param settings {Object} - settings for algorithm
 * [
 *  [0, 0, 1],
 *  [1, 0, 1],
 *  [1, 1, 1]
 *  ]
 *  alive cell - alive if has 2 or 3 otherwise dies from starvation / overpopulation
 *  dead cell - rebirths if has 3 by reproduction
 */
/*boardSize
 :
 15
 borderCondition
 :
 true
 distributionType
 :
 "CLEAR_BOARD"
 gameType
 :
 "GAME_OF_LIFE"
 neighbourhoodType
 :
 "MOORE"*/
export function boardLifecycle (boardData, settings) {
  let fun, ifPeriodic
  switch (settings.neighbourhoodType) {
    case Settings.MOORE: {
      fun = mooreRule
      break;
    }
    case Settings.VON_NEUMANN: {
      fun = vonNeumanRule
      break;
    }
    case Settings.HEX_LEFT: {
      fun = hexLeftRule
      break;
    }
  }

  return boardData.map((rowData, row) => rowData.map((cell, column) => fun(boardData, cell, row, column)))
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
 * @param ifPeriodic - should periodic conditions be taken into consideration
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function mooreRule (boardData, cell, row, column, ifPeriodic = true) {
  const quantityNeighbours = getNeighboursMoore(boardData, row, column, ifPeriodic).reduce((x, y) => x + y)
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