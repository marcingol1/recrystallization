import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

const CreateBoard = ({ createBoard }) => (
  <form onSubmit={(event) => {
    createBoard(event.target.children[1].value)
    event.preventDefault()
  }}>
      <label htmlFor="board-size">Board size</label>
      <Field name="board-size" component="input" type="text"/>

      <button type="submit">Start</button>
  </form>
)

const { func } = PropTypes

CreateBoard.propTypes = {
  createBoard: func.isRequired
}

export default reduxForm({
  form: 'board-create'
})(CreateBoard)