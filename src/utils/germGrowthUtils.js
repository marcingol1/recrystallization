import Settings from '../constants/Settings'
import _ from 'lodash'
import { hexLeftRule, hexRightRule, hexRandRule } from './lifeType/hex'
import mooreRule from './lifeType/moore'
import vonNeumanRule from './lifeType/vonNeumann'
import pentRandRule from './lifeType/pent'
import crystalization from './data/crystalization'
import { setCrystal } from './lifeType/setCell'
import { getCellPeriodic, getCell } from './lifeType/getCell'

let iteration = 0.001
/**
 * Makes a one iteration of Conwell's game
 * Changes cells to alive/dead depending on neighbours
 * @param boardData {Array} - data in format:
 * @param settings {Object} - settings for algorithm
 *  alive cell - alive if has 2 or 3 otherwise dies from starvation / overpopulation
 *  dead cell - rebirths if has 3 by reproduction
 */
export function boardLifecycle (boardData, settings) {
  const ifPeriodic = settings.borderCondition
  let fun
  switch (settings.neighbourhoodType) {
    case Settings.MOORE: {
      fun = mooreRule
      break
    }
    case Settings.VON_NEUMANN: {
      fun = vonNeumanRule
      break
    }
    case Settings.HEX_LEFT: {
      fun = hexLeftRule
      break
    }
    case Settings.HEX_RIGHT: {
      fun = hexRightRule
      break
    }
    case Settings.HEX_RAND: {
      fun = hexRandRule
      break
    }
    case Settings.PENT_RAND: {
      fun = pentRandRule
      break
    }
    default: {
      fun = mooreRule
    }
  }
  //Need to create a copy for a distinction between actual state and new state
  let tempBoard = _.cloneDeep(boardData)
  boardData.map((rowData, row) => rowData.map((cell, column) => {
    if (cell.value === 1) fun(tempBoard, row, column, ifPeriodic)
    return cell
  }))
  let isGrown = boardData.every(rowData => rowData.every(cell => cell.value))
  if (isGrown) {
    tempBoard = crystalization(tempBoard, iteration)
    iteration += 0.001
  }
  return tempBoard
}