import React  from 'react'
import PropTypes from 'prop-types'
import BoardRow from './BoardRow'

const Board = ({boardData = {}, cellChange = () => {}}) => (
  <table onClick={(event) => {
    cellChange(boardData.board,
      event.target.getAttribute('data-row'),
      event.target.getAttribute('data-column'))
  }}>
    <tbody>
    {boardData.board.map((row, index) =>
      <BoardRow cellChange={cellChange.bind(this, boardData.board)} key={`row-${index}`} index={index} row={row}/>)
    }
    </tbody>
  </table>
)

const {object, func} = PropTypes

Board.propTypes = {
  createBoard: object,
  cellChange: func
}

export default Board