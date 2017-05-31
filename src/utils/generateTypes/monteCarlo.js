import basicCell, { getRandomColor } from './basicCell'
import { getNeighbours } from './../data/crystalization'
import { getCellPeriodic } from './../lifeType/getCell'

function energy(neighbours, color) {
  let energy = 0
  neighbours.map(n => {
    if (n.color !== color) energy++
  })
  return energy
}

function monte(board, randomColors) {
  return board.map( (row, i) => row.map( (element, j) => {
    const neighbours = getNeighbours(board, i, j, getCellPeriodic)
    const newColor = randomColors[Math.round(Math.random() * randomColors.length - 1)]
    const newEnergy = energy(neighbours, newColor)

    if (newEnergy <= element.energy) {
      return {
        ...element,
        energy: newEnergy,
        color: newColor
      }
    }

    return element
  }))
}

function monteCarlo (size, devil) {
  console.log(devil)
  let board = [...new Array(size)].map(() => ([...new Array(size).fill(basicCell(1))]))
  let randomColors = [...new Array(size)].map(() => getRandomColor())

  board = board.map( (row, i) => row.map( (e, j) => {
    let color = randomColors[Math.round(Math.random() * size - 1)]
    const neighbours = getNeighbours(board, i, j, getCellPeriodic)
    const newEnergy = energy(neighbours, color)

    return { ...e, color, energy: newEnergy }
  }))
  let count = 0
  while (count < devil) {
    board = monte(board, randomColors)
    count++
  }

  return board
}

export default monteCarlo