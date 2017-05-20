import basicCell from './basicCell'

/**
 * Creates an empty board (all cells dead)
 * @param size
 */
const clearBoard = (size) => {
  return [...new Array(size)].map(() => (
    [...new Array(size).fill(basicCell(0))])
  )
}

export default clearBoard