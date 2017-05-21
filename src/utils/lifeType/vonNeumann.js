import { getCellPeriodic, getCell } from './getCell'
import setCell from './setCell'
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
      boardData[element[0]][element[1]] = setCell(boardData[element[0]][element[1]], boardData[row][column])
    }
    return element
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
export default function vonNeumanRule (boardData, row, column, ifPeriodic = true) {
  setNeighboursVonNeumann(boardData, row, column, ifPeriodic)
}
