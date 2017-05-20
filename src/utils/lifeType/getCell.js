
/**
 * Fetches cells - non-periodic
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Array} - 0 or 1 from boardData
 */
export function getCell (boardData, row, column) {
  let tempRow = row, tempCol = column
  if (row < 0) tempRow = 0
  if (column < 0) tempCol = 0
  if (row === boardData.length) tempRow = boardData.length - 1
  if (column === boardData.length) tempCol = boardData.length - 1
  return [tempRow, tempCol]
}

/**
 * Fetches cell - periodic
 * @param boardData - stores all information about cells
 * @param row - row position in boardData
 * @param column - column position in boardData
 * @returns {Array} - 0 or 1 from boardData
 */
export function getCellPeriodic (boardData, row, column) {
  let tempRow = row,
    tempCol = column,
    size = boardData.length
  if (row === -1) tempRow = size - 1
  else if (row === size) tempRow = 0
  if (column === -1) tempCol = size - 1
  else if (column === size) tempCol = 0
  return [tempRow, tempCol]
}
