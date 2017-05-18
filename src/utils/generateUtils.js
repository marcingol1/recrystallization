import Settings from '../constants/Settings'
/**
 * Generates a single row of a board and populates it with a random bool values (0, 1)
 * @param size - size of a row
 */
const randomRow = (size) => [...new Array(size)].map(() => generateCell())

/**
 * Maps rows of a board into a 2D array for startup of a game
 * @param size
 */
const randomBoard = (size) => [...new Array(size)].map(() => randomRow(size))

/**
 * Creates an empty board (all cells dead)
 * @param size
 */
const clearBoard = (size) => [...new Array(size)].map(() => [...new Array(size).fill(generateCell(0))])

/**
 * Generates cell- if cell is dead it doesn't get a color
 * @param value - alive or dead
 */
const generateCell = (value = Math.round(Math.random())) => ({ value, color: value ? getRandomColor() : 0 })

/**
 * Checks if a point should be taken for a random distribution value
 * @param row
 * @param column
 * @param pointsQuantity
 * @returns {Number}
 */
const isEvenDistribution = (row, column, pointsQuantity) => {
  let halfPoint = Math.floor( pointsQuantity / 2)
  return (row + halfPoint) % pointsQuantity || (column + halfPoint) % pointsQuantity ? generateCell(0) : generateCell(1)
}

/**
 * Creates evenly distributed amount of point on board
 * @param size
 * @param pointsQuantity - number of points
 */
const evenlyDistributedBoard = (size, pointsQuantity) => {
  return [...new Array(size)]
    .map(() => [...new Array(size)])
    .map((rowData, row) => rowData.map((cell, column) => isEvenDistribution(row, column, pointsQuantity)))
}

const cartesianLength = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1,2))
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const randomBoardRadius = (size, pointsQuantity) => {
  let tempData = [...new Array(size)].map(() => [...new Array(size).fill(0)])
  let newData = [...new Array(size)].map(() => [...new Array(size).fill(generateCell(0))])
  let counter = 0
  while (tempData.some( row => row.some( element => !element.value)) && counter < 10000) { //check if there is any falsy value
    let x = getRandomArbitrary(0, size),
      y = getRandomArbitrary(0, size)
    if (!counter) tempData[x][y] = generateCell(1)
    while (tempData[x][y].value) {
      x = getRandomArbitrary(0, size)
      y = getRandomArbitrary(0, size)
    }
    newData[x][y] = generateCell(1)
    tempData = tempData.map( (rowData, row) => rowData.map( (cell, column) => {
      return cartesianLength(x, y, row, column) < pointsQuantity ? generateCell(1) : cell
    }))
    counter++
  }
  return newData
}

/**
 * Generates random color
 * @returns {string}
 */
export function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

/**
 * Depending on a type generates custom board
 * @param size - size of a board to generate
 * @param type - type of allocating alive cells
 * @param pointsQuantity - quantity of points to get
 */
export function generateBoard(size = 0, type, pointsQuantity = 0) {
  switch (type) {
    case Settings.CLEAR_BOARD: {
      return clearBoard(size)
    }
    case Settings.RANDOM_BOARD: {
      return randomBoard(size)
    }
    case Settings.DISTRIBUTED_BOARD: {
      return evenlyDistributedBoard(size, pointsQuantity)
    }
    case Settings.RANDOM_RADIUS_BOARD: {
      return randomBoardRadius(size, pointsQuantity)
    }
    default: {
      return randomBoard(size)
    }
  }
}
