import { getCellPeriodic, getCell } from './getCell'
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
      boardData[element[0]][element[1]] = {
        value: 1,
        color: boardData[row][column].color
      }
    }
    return element
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
      boardData[element[0]][element[1]] = {
        value: 1,
        color: boardData[row][column].color
      }
    }
    return element
  })
}

/**
 * Core function counting neighbours and recycling
 * cell based on Hexagonal Random rule
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be
 * taken periodically
 * @returns {Number} - indicates if cell is alive
 */
function pentRandRule (boardData, row, column, ifPeriodic) {
  let fun
  if (Math.round(Math.random())) fun = setNeighboursPentLeft
  else fun = setNeighboursPentRight
  fun(boardData, row, column, ifPeriodic)
}

export default pentRandRule