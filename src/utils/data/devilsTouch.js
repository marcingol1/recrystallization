import { getCriticalRo } from './setDyslocation'

const generateRandom = (size) => {
  return () => Math.floor(Math.random() * size)
}

export default (boardData, iteration) => {
  const size = boardData.length
  const rand = generateRandom(size)
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
    boardData[rand()][rand()].dys += singleDevil
    diff -= singleDevil
  }
  return boardData
}