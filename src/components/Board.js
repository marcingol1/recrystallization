import React  from 'react'
import PropTypes from 'prop-types'
import BoardRow from './BoardRow'

const Board = ({ boardData = {} }) => (
  <table>
    <tbody>
      {boardData.board.map( (row, index) => <BoardRow key={`row-${index}`} index={index} row={row} />)}
    </tbody>
  </table>
)

const { object } = PropTypes

Board.propTypes = {
  createBoard: object
}

export default Board