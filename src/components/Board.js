import React  from 'react'
import PropTypes from 'prop-types'
import BoardRow from './BoardRow'

const Board = ({ boardData = {}, cellChange = () => {} }) => (
  <table>
    <tbody>
      {boardData.board.map( (row, index) => <BoardRow cellChange={cellChange.bind(this, boardData.board)} key={`row-${index}`} index={index} row={row} />)}
    </tbody>
  </table>
)

const { object, func } = PropTypes

Board.propTypes = {
  createBoard: object,
  cellChange: func
}

export default Board