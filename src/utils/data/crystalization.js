import { getCriticalRo } from './setDyslocation'
import devilsTouch from './devilsTouch'
import { getCellPeriodic } from './../lifeType/getCell'
import getDyslocation from './setDyslocation'
import setCrystal from './setCrystal'

export function getNeighbours(boardData, row, column, fun) {
  return [
    fun(boardData, row - 1, column - 1),
    fun(boardData, row - 1, column),
    fun(boardData, row - 1, column + 1),
    fun(boardData, row, column - 1),
    fun(boardData, row, column + 1),
    fun(boardData, row + 1, column - 1),
    fun(boardData, row + 1, column),
    fun(boardData, row + 1, column + 1)
  ].map( coordinates => {
    return boardData[coordinates[0]][coordinates[1]]
  })
}

function crystalization (boardData, iteration) {
  const size = boardData.length
  const criticalRo = getCriticalRo(iteration, size)
  //set dyslocations
  let tempBoard = boardData.map((rowData, row) => rowData.map((cell, column) => {
    if (cell.value === 1) {
      const neighbours = getNeighbours(boardData, row, column, getCellPeriodic)
      const dyslocation = getDyslocation(boardData[row][column], neighbours, size, iteration)
      return {
        ...cell,
        dys: dyslocation
      }
    }
    return cell
  }))
  devilsTouch(tempBoard, iteration)
  //make new germs
  tempBoard = tempBoard.map((rowData, row) => rowData.map((cell, column) => {
    if (cell.value === 1) {
      //check if neighbours crystalized or reached crticial value of dyslocations
      let isNearCrystal = getNeighbours(boardData, row, column, getCellPeriodic).some(e => e.value === 2)
      if (cell.dys > criticalRo || isNearCrystal) {
        return setCrystal(cell)
      }
    }
    return cell
  }))
  return tempBoard
}

export default crystalization