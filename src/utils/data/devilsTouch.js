import getDensity from './getDensity'
import { getNeighbours } from './crystalization'
import { getCellPeriodic } from './../lifeType/getCell'

const generateRandom = (size) => {
  return Math.floor(Math.random() * size)
}

const getBorderNotCrystal = (boardData) => {
  return boardData.map((row, i) => row.filter((cell, j) => {
    let neighbours = getNeighbours(boardData, i, j, getCellPeriodic),
      isOnBorder = neighbours.some(e => e.color !== boardData[i][j].color)
    return isOnBorder && cell.value === 1
  })).filter(row => row.length)
}

export default (boardData, iteration, settings) => {
  let filteredData = getBorderNotCrystal(boardData)
  const dyslocationSum = boardData
    .reduce((a, b) => a.concat(b))
    .reduce((acc, e) => acc + e.dys, 0)

  const dyslocations = getDensity(iteration)
  let diff = dyslocations - dyslocationSum
  console.log(dyslocations, dyslocationSum)
  const devil = settings.devil
  const singleDevil = diff / devil
  //assign random cell on boardData += cellRo
  // until diff is 0
  while (diff > 0 && filteredData.length) {
    let row = generateRandom(filteredData.length - 1),
      col = generateRandom(filteredData[row].length - 1)

    filteredData[row][col].dys += singleDevil
    diff -= singleDevil
  }
  return boardData
}