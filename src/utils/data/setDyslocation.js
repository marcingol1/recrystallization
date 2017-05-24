import getDensity from './getDensity'

/**
 * Provides density of dyslocations for given iteration
 * @param iteration {Number}
 * @param size {Number} - size of a board
 * @returns {Number} - diff of dyslocations between two iterations
 */
export function getDeltaRo (iteration, size) {
  const t1 = getDensity(iteration)
  const t2 = getDensity(iteration + 1)
  return (t2 - t1) / size //dRo
}

/**
 * Mutates germ data to include proper dyslocation density
 * @param germ - cell in which dyslocations can occur
 * @param neighbours - neighbourhood of a cell (can differ based on type of neigh)
 * @param size - size of board
 * @param iteration
 * @returns {number} - proper dyslocations density including border condition
 */
function setDyslocation ({germ, neighbours, size, iteration}) {
  const ro = getDeltaRo(iteration, size)
  const isOnBorder = neighbours.some(e => e.color !== germ.color)
  return isOnBorder ? ro * 0.8 : ro * 0.2
}

export default setDyslocation