import { getDeltaRo } from './setDyslocation'
import getDensity from './getDensity'

const generateRandom = (size) => {
  return () => Math.floor(Math.random() * size)
}

export default (boardData, iteration) => {
  const allDys = boardData.reduce((sum, board) => {
    return sum + board.reduce((innerSum, cell) => {
        return innerSum + parseInt(cell.dys, 10)
      }, 0)
  }, 0)
  const size = boardData.length
  const cellRo = getDeltaRo(iteration, size)
  let diff = getDensity(iteration) * size - allDys
  const rand = generateRandom(size)

  //assign random cell on boardData += cellRo
  // until diff is 0
  while (diff > 0) {
    boardData[rand()][rand()].dys += cellRo
    diff -= cellRo
  }
  console.log(iteration)
  return boardData
}