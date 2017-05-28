import { getCriticalRo } from './setDyslocation'
import devilsTouch from './devilsTouch'
import { getCellPeriodic, getCell } from './../lifeType/getCell'
import getDyslocation from './setDyslocation'

function setCrystal(germ) {
  if (germ.value === 1) {
    return {
      ...germ,
      value: 2,
      dys: 0
    }
  }
  return germ
}

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
function setNeighbours(boardData, row, column, fun) {
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
    boardData[coordinates[0]][coordinates[1]] = setCrystal(boardData[coordinates[0]][coordinates[1]])
  })
}

function crystalization (boardData, iteration) {
  const size = boardData.length
  const criticalRo = getCriticalRo(iteration, size)
  let fun = getCellPeriodic
  let tempBoard = boardData.map((rowData, row) => rowData.map((cell, column) => {
    if (cell.value === 1) {
      let neighbours = getNeighbours(boardData, row, column, fun)
      const dyslocation = getDyslocation(boardData[row][column], neighbours, size, iteration)
      return {
        ...cell,
        dys: dyslocation
      }
    }
    return cell
  }))
  devilsTouch(tempBoard, iteration)
  tempBoard = tempBoard.map((rowData, row) => rowData.map((cell, column) => {
    let lol = 100000000
    if (cell.dys > criticalRo && cell.value === 1) {
      //why cells dont stick to borders of germs?
      setNeighbours(boardData, row, column, fun)
      return {
        ...cell,
        value: 2,
        dys: 0
      }
    }
    return cell
  }))
  return tempBoard
}

export default crystalization