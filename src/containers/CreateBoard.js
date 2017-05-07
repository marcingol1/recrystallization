import React  from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'

const CreateBoard = ({createBoard, handleSubmit}) => (
  <form onSubmit={handleSubmit}>

    <div id="neighbourhood-type">
      <label>Choose neighbourhood type</label>
      <div>
        <Field name="neighbourhoodType" component="select">
          <option />
          <option value="vonNeumann">Von Neumann</option>
          <option value="moore">Moore</option>
          <option value="hexLeft">Hexagonal Left</option>
          <option value="hexRight">Hexagonal Right</option>
          <option value="hexRand">Hexagonal Random</option>
          <option value="pentRand">Pentagonal Random</option>
        </Field>
      </div>
    </div>

    <div id="generating-germs">
      <label>Choose type of germs generating distribution</label>
      <div>
        <Field name="distributionType" component="select">
          <option />
          <option value="distributed">Evenly</option>
          <option value="random">Randomly</option>
          <option value="randomRadius">Randomly with radius</option>
          <option value="clear">Clear</option>
        </Field>
      </div>
    </div>

    <div id="border-condition">
      <label htmlFor="border">Border condition</label>
      <div>
        <Field
          name="borderCondition"
          id="border"
          component="input"
          type="checkbox"
        />
      </div>
    </div>

    <label htmlFor="board-size">Enter board size</label>
    <Field name="boardSize" component="input" type="text"/>

    <button type="submit">Create</button>
  </form>
)

const {func} = PropTypes

CreateBoard.propTypes = {
  createBoard: func,
  handleSubmit: func
}

export default reduxForm({
  form: 'boardCreate'
})(CreateBoard)