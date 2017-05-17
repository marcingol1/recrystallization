import React  from 'react'
import PropTypes from 'prop-types'
import BoardRow from './BoardRow'

const Board = ({boardData = [], cellChange = () => {}, colors = []}) => (
  <table onClick={(event) => {
    cellChange(event.target.getAttribute('data-row'), event.target.getAttribute('data-column'))
  }}>
    <tbody>
    {boardData.map((row, index) =>
      <BoardRow colors={colors} key={`row-${index}`} index={index} row={row}/>)
    }
    </tbody>
  </table>
)

const {array, func} = PropTypes

Board.propTypes = {
  createBoard: array,
  cellChange: func
}

export default Board