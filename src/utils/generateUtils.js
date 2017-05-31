import Settings from '../constants/Settings'
import clearBoard from './generateTypes/clearBoard'
import randomBoard from './generateTypes/randomBoard'
import evenBoard from './generateTypes/evenBoard'
import randomBoardRadius from './generateTypes/randomRadiusBoard'
import monteCarlo from './generateTypes/monteCarlo'
/**
 * Depending on a type generates custom board
 * @param size - size of a board to generate
 * @param type - type of allocating alive cells
 * @param pointsQuantity - quantity of points to get
 */
export function generateBoard(size = 0, type, pointsQuantity = 0, devil = 100) {
  switch (type) {
    case Settings.CLEAR_BOARD: {
      return clearBoard(size)
    }
    case Settings.RANDOM_BOARD: {
      return randomBoard(size)
    }
    case Settings.DISTRIBUTED_BOARD: {
      return evenBoard(size, pointsQuantity)
    }
    case Settings.RANDOM_RADIUS_BOARD: {
      return randomBoardRadius(size, pointsQuantity)
    }
    case Settings.MONTE_CARLO: {
      return monteCarlo(size, devil)
    }
    default: {
      return randomBoard(size)
    }
  }
}
