import Settings from '../constants/Settings'
import _ from 'lodash'

/**
 * Makes a one iteration of Conwell's game
 * Changes cells to alive/dead depending on neighbours
 * @param boardData {Array} - data in format:
 * @param settings {Object} - settings for algorithm
 *  alive cell - alive if has 2 or 3 otherwise dies from starvation / overpopulation
 *  dead cell - rebirths if has 3 by reproduction
 */
export function boardLifecycle (boardData, settings) {
  const ifPeriodic = settings.borderCondition
  let fun
  switch (settings.neighbourhoodType) {
    case Settings.MOORE: {
      fun = mooreRule
      break
    }
    case Settings.VON_NEUMANN: {
      fun = vonNeumanRule
      break
    }
    case Settings.HEX_LEFT: {
      fun = hexLeftRule
      break
    }
    case Settings.HEX_RIGHT: {
      fun = hexRightRule
      break
    }
    case Settings.HEX_RAND: {
      fun = hexRandRule
      break
    }
    case Settings.PENT_RAND: {
      fun = pentRandRule
      break
    }
    default: {
      fun = mooreRule
    }
  }
  //Need to create a copy for a distinction between actual state and new state
  let tempBoard = _.cloneDeep(boardData)
  boardData.map((rowData, row) => rowData.map((cell, column) => {
      if (cell.value) fun(tempBoard, row, column, ifPeriodic)
      return cell
    }))
  return tempBoard;
}

/**
 * Fetches cells - non-periodic
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Array} - 0 or 1 from boardData
 */
function getCell (boardData, row, column) {
  if (row < 0 || column < 0) return [0, 0] // h
  if (row === boardData.length || column === boardData.length) return [0, 0]
  return [row, column]
}

/**
 * Fetches cell - periodic
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Array} - 0 or 1 from boardData
 */
function getCellPeriodic (boardData, row, column) {
  let tempRow = row,
    tempCol = column,
    size = boardData.length
  if (row === -1) tempRow = size - 1
  else if (row === size) tempRow = 0
  if (column === -1) tempCol = size - 1
  else if (column === size) tempCol = 0
  return [tempRow, tempCol]
}

/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function setNeighboursMoore (boardData, row, column, ifPeriodic) {
  let fun = ifPeriodic ? getCellPeriodic : getCell
  let neighbours = [
    fun(boardData, row - 1, column - 1),
    fun(boardData, row - 1, column),
    fun(boardData, row - 1, column + 1),
    fun(boardData, row, column - 1),
    fun(boardData, row, column + 1),
    fun(boardData, row + 1, column - 1),
    fun(boardData, row + 1, column),
    fun(boardData, row + 1, column + 1)
  ]


  return neighbours.map((element) => {
    if (!boardData[element[0]][element[1]].color) {
      boardData[element[0]][element[1]] = { value: 1, color: boardData[row][column].color}
    }
  })
}

/**
 * Core function counting neighbours and recycling cell based on Moore rule
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - should periodic conditions be taken into consideration
 * @returns {Object} - indicates if cell is alive- if there is no change the same cell is returned
 */
function mooreRule (boardData, row, column, ifPeriodic) {
  return setNeighboursMoore(boardData, row, column, ifPeriodic)
}

/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function setNeighboursVonNeumann (boardData, row, column, ifPeriodic = true) {
  let fun = ifPeriodic ? getCellPeriodic : getCell
  let neighbours = [
    fun(boardData, row - 1, column),
    fun(boardData, row, column - 1),
    fun(boardData, row, column + 1),
    fun(boardData, row + 1, column)
  ]
  neighbours.map((element) => {
    if (!boardData[element[0]][element[1]].color) {
      boardData[element[0]][element[1]] = { value: 1, color: boardData[row][column].color}
    }
  })
}

/**
 * Core function counting neighbours and recycling cell based on Von Neumann rule
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function vonNeumanRule (boardData, row, column, ifPeriodic = true) {
  setNeighboursVonNeumann(boardData, row, column, ifPeriodic)
}

/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function setNeighboursHexLeft (boardData, row, column, ifPeriodic) {
  let fun = ifPeriodic ? getCellPeriodic : getCell
  let neighbours = [
    fun(boardData, row - 1, column - 1),
    fun(boardData, row - 1, column),
    fun(boardData, row, column - 1),
    fun(boardData, row + 1, column - 1),
    fun(boardData, row + 1, column)
  ]
  neighbours.map((element) => {
    if (!boardData[element[0]][element[1]].color) {
      boardData[element[0]][element[1]] = { value: 1, color: boardData[row][column].color}
    }
  })
}

/**
 * Core function counting neighbours and recycling cell based on Hexagonal Left rule
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function hexLeftRule (boardData, row, column, ifPeriodic = true) {
  setNeighboursHexLeft(boardData, row, column, ifPeriodic)
}

/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function setNeighboursHexRight (boardData, row, column, ifPeriodic) {
  let fun = ifPeriodic ? getCellPeriodic : getCell
  let neighbours = [
    fun(boardData, row - 1, column),
    fun(boardData, row - 1, column + 1),
    fun(boardData, row, column + 1),
    fun(boardData, row + 1, column + 1),
    fun(boardData, row + 1, column)
  ]
  neighbours.map((element) => {
    if (!boardData[element[0]][element[1]].color) {
      boardData[element[0]][element[1]] = { value: 1, color: boardData[row][column].color}
    }
  })
}

/**
 * Core function counting neighbours and recycling cell based on Hexagonal Right rule
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function hexRightRule (boardData, row, column, ifPeriodic = true) {
  setNeighboursHexRight(boardData, row, column, ifPeriodic)
}

/**
 * Core function counting neighbours and recycling cell based on Hexagonal Random rule
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function hexRandRule (boardData, row, column, ifPeriodic = true) {
  let properMethod = Math.round(Math.random()) ? setNeighboursHexLeft : setNeighboursHexRight
  properMethod(boardData, row, column, ifPeriodic)
}
/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function setNeighboursPentRight (boardData, row, column, ifPeriodic) {
  let fun = ifPeriodic ? getCellPeriodic : getCell
  let neighbours = [
    fun(boardData, row - 1, column),
    fun(boardData, row - 1, column + 1),
    fun(boardData, row, column - 1),
    fun(boardData, row, column + 1),
    fun(boardData, row + 1, column - 1),
    fun(boardData, row + 1, column)
  ]
  neighbours.map((element) => {
    if (!boardData[element[0]][element[1]].color) {
      boardData[element[0]][element[1]] = { value: 1, color: boardData[row][column].color}
    }
  })
}


/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Array} - neighbours of a cell
 */
function setNeighboursPentLeft (boardData, row, column, ifPeriodic) {
  let fun = ifPeriodic ? getCellPeriodic : getCell
  let neighbours = [
    fun(boardData, row - 1, column - 1),
    fun(boardData, row - 1, column),
    fun(boardData, row, column - 1),
    fun(boardData, row, column + 1),
    fun(boardData, row + 1, column),
    fun(boardData, row + 1, column + 1)
  ]
  neighbours.map((element) => {
    if (!boardData[element[0]][element[1]].color) {
      boardData[element[0]][element[1]] = { value: 1, color: boardData[row][column].color}
    }
  })
}


/**
 * Core function counting neighbours and recycling cell based on Hexagonal Random rule
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @returns {Number} - indicates if cell is alive- if there is no change the same cell is returned
 */
function pentRandRule (boardData, row, column, ifPeriodic = true) {
  let properMethod = Math.round(Math.random()) ? setNeighboursPentLeft : setNeighboursPentRight
  properMethod(boardData, row, column, ifPeriodic)
}


