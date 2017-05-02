import React  from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

const CreateBoard = ({ createBoard = () => {} }) => (
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
  createBoard: func
}

export default reduxForm({
  form: 'board-create'
})(CreateBoard)