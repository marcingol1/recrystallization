import React  from 'react'
import PropTypes from 'prop-types'

const generateClassName = (cell) => cell ? 'cell alive' : 'cell dead'

const BoardRow = ({row = []}) => (
  <tr>
    {row.map((cell, index) => {
      return <td key={index} className={generateClassName(cell)}> </td>
    })}
  </tr>
)

const {array} = PropTypes

BoardRow.propTypes = {
  createBoard: array
}

export default BoardRow