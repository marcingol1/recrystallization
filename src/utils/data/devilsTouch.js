import getData from './getData'

const generateRandom = (size) => {
  return () => Math.floor(Math.random()*size)
}

export default (boardData) => {
  const allDys = boardData.reduce((sum, board) => {
    return sum + board.reduce((innerSum, cell) => {
        return innerSum + parseInt(cell.dys, 10)
      }, 0)
  }, 0)
  const dRo = getData()[2].ro - getData()[1].ro
  const cellRo = dRo / boardData.length
  let diff = allDys - dRo
  const rand = generateRandom(boardData.length)

  //assign random cell on boardData += cellRo
  // until diff is 0
  while (diff > 0) {
    console.log(diff)
    boardData[rand()][rand()].dys += cellRo
    diff -= cellRo
  }
  return boardData
}