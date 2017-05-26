import { getCellPeriodic, getCell } from './getCell'
import setCell from './setCell'
import setDyslocation from './../data/setDyslocation'

/**
 * Creates array of neighbours for a cell
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - flag indicationg if cells should be taken periodically
 * @param iteration
 * @returns {Array} - neighbours of a cell
 */
function setNeighboursMoore (boardData, row, column, ifPeriodic, iteration) {
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

  neighbours.map((element) => {
    if (!boardData[element[0]][element[1]].color) {
      boardData[element[0]][element[1]] = setCell(boardData[element[0]][element[1]], boardData[row][column])
    }
    return boardData[element[0]][element[1]]
  })
}

/**
 * Core function counting neighbours and recycling cell based on Moore rule
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @param ifPeriodic - should periodic conditions be taken into consideration
 * @param iteration
 * @returns {Object} - indicates if cell is alive- if there is no change the same cell is returned
 */
export default function mooreRule (boardData, row, column, ifPeriodic, iteration) {
  return setNeighboursMoore(boardData, row, column, ifPeriodic, iteration)
}
