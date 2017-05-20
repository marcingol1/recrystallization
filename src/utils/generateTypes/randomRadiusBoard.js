import basicCell from './basicCell'

function cartesianLength (x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
}

function getRandomArbitrary (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const randomBoardRadius = (size, pointsQuantity) => {
  let tempData = [...new Array(size)].map(() => [...new Array(size).fill(0)])
  let newData = [...new Array(size)].map(() => [...new Array(size).fill(basicCell(0))])
  let counter = 0
  while (tempData.some(row => row.some(element => !element.value)) && counter < 10000) { //check if there is any falsy value
    let x = getRandomArbitrary(0, size),
      y = getRandomArbitrary(0, size)
    if (!counter) tempData[x][y] = basicCell(1)
    while (tempData[x][y].value) {
      x = getRandomArbitrary(0, size)
      y = getRandomArbitrary(0, size)
    }
    newData[x][y] = basicCell(1)
    tempData = tempData.map((rowData, row) => rowData.map((cell, column) => {
      return cartesianLength(x, y, row, column) < pointsQuantity ? basicCell(1) : cell
    }))
    counter++
  }
  return newData
}

export default randomBoardRadius
