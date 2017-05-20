import basicCell from './basicCell'
/**
 * Checks if a point should be taken for a random distribution value
 * @param row
 * @param column
 * @param pointsQuantity
 * @returns {Number}
 */
const isEvenDistribution = (row, column, pointsQuantity) => {
  let halfPoint = Math.floor(pointsQuantity / 2)
  const isRow = (row + halfPoint) % pointsQuantity
  const isCol = (column + halfPoint) % pointsQuantity
  return isRow || isCol ? basicCell(0) : basicCell(1)
}

/**
 * Helper for creating simple Array objects
 * @param size - given size of new Array
 */
const genArr = (size) => [...new Array(size)]

/**
 * Creates evenly distributed amount of point on board
 * @param size
 * @param pointsQuantity - number of points
 */
const evenBoard = (size, pointsQuantity) => {
  return genArr(size).map(() => genArr(size))
    .map((rowData, row) => {
      return rowData.map((cell, column) => (
        isEvenDistribution(row, column, pointsQuantity)))
    })
}

export default evenBoard