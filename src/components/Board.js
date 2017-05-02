import React  from 'react'
import PropTypes from 'prop-types'

const Board = ({ board = {} }) => (
  <div>
    {board.board.map(row => <div> row </div>)}
  </div>
)

const { object } = PropTypes

Board.propTypes = {
  createBoard: object
}

export default Board