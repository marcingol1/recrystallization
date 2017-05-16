import Settings from '../constants/Settings'
/**
 * Generates a single row of a board and populates it with a random bool values (0, 1)
 * @param size - size of a row
 */
const randomRow = (size) => [...new Array(size)].map(() => Math.round(Math.random()))

/**
 * Maps rows of a board into a 2D array for startup of a game
 * @param size
 */
const randomBoard = (size) => [...new Array(size)].map(() => randomRow(size))

/**
 * Creates an empty board (all cells dead)
 * @param size
 */
const clearBoard = (size) => [...new Array(size)].map(() => [...new Array(size).fill(0)])

/**
 * Checks if a point should be taken for a random distribution value
 * @param row
 * @param column
 * @param pointsQuantity
 * @returns {Number}
 */
const isEvenDistribution = (row, column, pointsQuantity) => {
  //if (row === 0 || column === 0 ) return 0
  return row % pointsQuantity || column % pointsQuantity ? 0 : 1
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

const randomBoardRadius = (size) => [...new Array(size)].map(() => [...new Array(size).fill(0)])

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
 * @param colorsQuantity - quantity of points to get
 */
export function generateBoard(size = 0, type, pointsQuantity = 0,  colorsQuantity = 100) {

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
      return randomBoardRadius(size)
    }
    default: {
      return randomBoard(size)
    }
  }
}
