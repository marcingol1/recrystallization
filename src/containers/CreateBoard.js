import React  from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Settings from '../constants/Settings'

const CreateBoard = ({createBoard, handleSubmit}) => (
  <form onSubmit={handleSubmit}>

    <div id="neighbourhood-type">
      <label>Choose neighbourhood type</label>
      <div>
        <Field name="neighbourhoodType" component="select">
          <option />
          <option value={Settings.VON_NEUMANN}>Von Neumann</option>
          <option value={Settings.MOORE}>Moore</option>
          <option value={Settings.HEX_LEFT}>Hexagonal Left</option>
          <option value={Settings.HEX_RIGHT}>Hexagonal Right</option>
          <option value={Settings.HEX_RAND}>Hexagonal Random</option>
          <option value={Settings.PENT_RAND}>Pentagonal Random</option>
        </Field>
      </div>
    </div>

    <div id="generating-germs">
      <label>Choose type of distribution on a board</label>
      <div>
        <Field name="distributionType" component="select">
          <option value={Settings.CLEAR_BOARD}>Clear</option>
          <option value={Settings.DISTRIBUTED_BOARD}>Evenly</option>
          <option value={Settings.RANDOM_BOARD}>Randomly</option>
          <option value={Settings.RANDOM_RADIUS_BOARD}>Randomly with radius</option>
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
    <Field name="boardSize" component="input" type="text" />

    <button type="submit">Create</button>
  </form>
)

const {func} = PropTypes

CreateBoard.propTypes = {
  createBoard: func,
  handleSubmit: func
}

export default reduxForm({
  form: 'boardCreate',
  defaultValues: { enabled: true}
})(CreateBoard)