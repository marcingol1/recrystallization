
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
 * Generates cell- if cell is dead it doesn't get a color
 * @param value - alive or dead
 */
const basicCell = (value = Math.round(Math.random())) => ({
    value,
    color: value ? getRandomColor() : 0,
    dys: 0
  }
)

export default basicCell