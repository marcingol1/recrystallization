import basicCell from './basicCell'

function monteCarlo(size) {
  let board = [...new Array(size)].map(() => ([...new Array(size).fill(basicCell(0))]))
  
  return board
}

export default monteCarlo