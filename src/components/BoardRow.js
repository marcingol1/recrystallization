import React  from 'react'
import PropTypes from 'prop-types'

const generateClassName = (cell) => cell ? 'cell alive' : 'cell dead'

const BoardRow = ({row = [], index = 0}) => (
  <tr>
    {row.map((cell, columnIndex) => {
      return <td key={`cell-${index}-${columnIndex}`} className={generateClassName(cell)}> </td>
    })}
  </tr>
)

const {array} = PropTypes

BoardRow.propTypes = {
  createBoard: array
}

export default BoardRow