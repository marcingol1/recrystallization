import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Settings from '../constants/Settings'

const initialValues = {
  neighbourhoodType: Settings.MOORE,
  distributionType: Settings.RANDOM_RADIUS_BOARD,
  borderCondition: true,
  boardSize: 40,
  pointsQuantity: 5
}

let CreateBoard = ({createBoard, handleSubmit}) => (
  <form onSubmit={handleSubmit}>

    <div className="form-part">
      <div id="neighbourhood-type">
        <label>Neighbours</label>
        <Field name="neighbourhoodType" component="select">
          <option value={Settings.MOORE}>Moore</option>
          <option value={Settings.VON_NEUMANN}>Von Neumann</option>
          <option value={Settings.HEX_LEFT}>Hexagonal Left</option>
          <option value={Settings.HEX_RIGHT}>Hexagonal Right</option>
          <option value={Settings.HEX_RAND}>Hexagonal Random</option>
          <option value={Settings.PENT_RAND}>Pentagonal Random</option>
        </Field>
      </div>

      <div id="generating-germs">
        <label>Distribution</label>
        <Field name="distributionType" component="select">
          <option value={Settings.RANDOM_RADIUS_BOARD}>Randomly with radius</option>
          <option value={Settings.RANDOM_BOARD}>Randomly</option>
          <option value={Settings.CLEAR_BOARD}>Clear</option>
          <option value={Settings.DISTRIBUTED_BOARD}>Evenly</option>
        </Field>
      </div>
    </div>

    <div className="form-part">
      <div>
      <label htmlFor="points-quantity">Points number</label>
      <Field name="pointsQuantity" component="input" type="text"/>
      </div>
      <div>
      <label htmlFor="board-size">Board size</label>
      <Field name="boardSize" component="input" type="text"/>
      </div>
    </div>

    <div className="form-part">
      <div id="border-condition">
        <label htmlFor="border">Border condition</label>
        <Field name="borderCondition" id="border" component="input" type="checkbox"/>
      </div>
      <button type="submit">Create</button>
    </div>

  </form>
)

const {func} = PropTypes

CreateBoard.propTypes = {
  createBoard: func,
  handleSubmit: func
}

CreateBoard = reduxForm({
  form: 'boardCreate'
})(CreateBoard)

CreateBoard = connect(
  () => ({
    initialValues
  })
)(CreateBoard)

export default CreateBoard