import React  from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Settings from '../constants/Settings'

const initialValues = {
  gameType: Settings.GERM_EXPANSION,
  neighbourhoodType: Settings.MOORE,
  distributionType: Settings.CLEAR_BOARD,
  borderCondition: true,
  boardSize: 40,
  pointsQuantity: 5
}

let CreateBoard = ({createBoard, handleSubmit, isVisible}) => (
  <form
    style={{
      display: isVisible ? 'flex' : 'none'
    }}
    onSubmit={handleSubmit}>
    <div id="game-type">
      <label>Choose type of gameplay</label>
      <div>
        <Field name="gameType" component="select">
          <option value={Settings.GERM_EXPANSION}>Recrystalization</option>
          <option value={Settings.GAME_OF_LIFE}>Game of life</option>
        </Field>
      </div>
    </div>


    <div id="neighbourhood-type">
      <label>Choose neighbourhood type</label>
      <div>
        <Field name="neighbourhoodType" component="select">
          <option value={Settings.MOORE}>Moore</option>
          <option value={Settings.VON_NEUMANN}>Von Neumann</option>
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
          <option value={Settings.RANDOM_BOARD}>Randomly</option>
          <option value={Settings.CLEAR_BOARD}>Clear</option>
          <option value={Settings.DISTRIBUTED_BOARD}>Evenly</option>
          <option value={Settings.RANDOM_RADIUS_BOARD}>Randomly with radius</option>
        </Field>
      </div>
    </div>

    <div id="border-condition">
      <label htmlFor="border">Border condition</label>
      <Field name="borderCondition" id="border" component="input" type="checkbox"/>
    </div>

    <label htmlFor="points-quantity">Enter points quantity</label>
    <Field name="pointsQuantity" component="input" type="text"/>

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

CreateBoard = reduxForm({
  form: 'boardCreate'
})(CreateBoard)

CreateBoard = connect(
  () => ({
    initialValues
  })
)(CreateBoard)

export default CreateBoard