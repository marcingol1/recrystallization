import React  from 'react'
import PropTypes from 'prop-types'

const generateClassName = (cell) => cell ? 'cell alive' : 'cell dead'

const BoardRow = ({row = [], index = 0, cellChange = () => {}}) => (
  <tr>
    {row.map((cell, columnIndex) => {
      return (
        <td key={`cell-${index}-${columnIndex}`}
            className={generateClassName(cell)}
            onClick={() => cellChange(index, columnIndex)}
        >
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