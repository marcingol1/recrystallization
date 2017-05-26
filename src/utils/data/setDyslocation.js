import getDensity from './getDensity'

let pointRo = {value: 0, iteration: 0}
/**
 * Provides density of dyslocations for given iteration
 * @param iteration {Number}
 * @param size {Number} - size of a board
 * @returns {Number} - diff of dyslocations between two iterations
 */
export function getDeltaRo (iteration, size) {
  const t1 = getDensity(iteration - 0.001)
  const t2 = getDensity(iteration)
  //might be smth wrong with this
  if (pointRo.iteration !== iteration) {
    pointRo.iteration = iteration
    pointRo.value += (t2 - t1) / (size * size)
  }
  return pointRo.value
}

export function getCriticalRo (iteration, size) {
  const t1 = getDensity(iteration)
  return getDeltaRo(iteration, size)
}

/**
 * Mutates germ data to include proper dyslocation density
 * @param germ - cell in which dyslocations can occur
 * @param neighbours - neighbourhood of a cell (can differ based on type of neigh)
 * @param size - size of board
 * @param iteration
 * @returns {number} - proper dyslocations density including border condition
 */
function getDyslocation (germ, neighbours, size, iteration) {
  const ro = getDeltaRo(iteration, size)
  const isOnBorder = neighbours.some(e => e.color !== germ.color)
  const properRo = isOnBorder ? (ro * 0.8) : (ro * 0.2)
  return properRo
}

export default getDyslocation