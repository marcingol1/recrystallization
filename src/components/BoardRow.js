import React  from 'react'
import PropTypes from 'prop-types'

const generateClassName = (cell) => {
  let style = cell.value ? 'cell alive' : 'cell dead'
  if (cell.dys > 33446154147.709324) style += ' crystal'
  return style;
}
const generateColor = (cell) => cell.value ? {backgroundColor: cell.color} : {}
const BoardRow = ({row = [], index = 0}) => (
  <tr>
    {row.map((cell, column) => {
      return (
        <td key={`${index}-${column}`}
            style={generateColor(cell)}
            className={generateClassName(cell)}
            data-row={index}
            data-column={column}>
        </td>
      )
    })}
  </tr>
)

const {array, number, func} = PropTypes

BoardRow.propTypes = {
  row: array,
  index: number,
  cellChange: func
}

export default BoardRow