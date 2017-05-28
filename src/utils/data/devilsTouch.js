import { getCriticalRo } from './setDyslocation'
import { getNeighbours } from './crystalization'
import { getCellPeriodic, getCell } from './../lifeType/getCell'

const generateRandom = (size) => {
  return () => Math.floor(Math.random() * size)
}

export default (boardData, iteration) => {
  const size = boardData.length
  const rand = generateRandom(size)
  const fun = getCellPeriodic
  const allDys = boardData
    .reduce((a, b) => a.concat(b))
    .reduce((acc, e) => acc + e.dys, 0)
  const critRo = getCriticalRo(iteration, size)
  let diff = critRo * (size * size) - allDys
  const devil = 1000
  const singleDevil = diff / devil
  //assign random cell on boardData += cellRo
  // until diff is 0
  while (diff > 0) {
    let row = rand(),
        col = rand(),
        neighbours = getNeighbours(boardData, row, col, fun),
        isOnBorder = neighbours.some(e => e.color !== boardData[row][col].color),
        isWithCrystalized = neighbours.some(e => e.value === 2)
    if (isOnBorder || isWithCrystalized) {
      boardData[row][col].dys += singleDevil
      diff -= singleDevil
    }
  }
  return boardData
}