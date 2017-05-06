import React  from 'react'
import PropTypes from 'prop-types'

const generateClassName = (cell) => cell ? 'cell alive' : 'cell dead'

const BoardRow = ({row = [], index = 0, cellChange = () => {}}) => (
  <tr>
    {row.map((cell, column) => {
      return (
        <td key={`${index}-${column}`}
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