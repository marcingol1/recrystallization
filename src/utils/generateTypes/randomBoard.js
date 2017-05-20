import basicCell from './basicCell'
/**
 * Generates a single row of a board and populates
 * it with a random bool values (0, 1)
 * @param size - size of a row
 */
const randomRow = (size) => (
  [...new Array(size)].map(() => basicCell())
)
/**
 * Maps rows of a board into a 2D array
 * for startup of a game
 * @param size
 */
const randomBoard = (size) => (
  [...new Array(size)].map(() => randomRow(size))
)

export default randomBoard