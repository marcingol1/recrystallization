import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import { makeInterval, removeInterval } from './actions/animationActions'
import { boardLifecycleAction, cellChange, } from './actions/boardActions'
import Board from './components/Board'
import CreateBoard from './containers/CreateBoard'
import handleBoardCreate from './utils/handleBoardCreate'
import getData from './utils/data/getData'

class App extends Component {
  componentWillUnmount () {
    this.props.removeInterval()
  }

  setInterval = () => {
    if (!this.props.animation.interval) {
      this.props.makeInterval(
        () => this.props.boardLifecycle(this.props.board, this.props.form.boardCreate.values),
        200)
    }
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <CreateBoard onSubmit={this.props.handleBoardCreate}/>
          <button onClick={() => {
            this.setState({
              formVisibility: true
            })
            this.props.removeInterval()
          }}>Stop</button>
          <button onClick={this.setInterval}> Start</button>
          <button onClick={getData}>Click me</button>
        </div>
        <Board cellChange={this.props.cellChange} boardData={this.props.board}/>
      </div>
    )
  }
}

const mapStateToProps = ({board, animation, form}) => {
  return {
    board,
    animation,
    form
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    boardLifecycle: (boardData, settings) => {
      dispatch(boardLifecycleAction(boardData, settings))
    },
    handleBoardCreate: (form) => {
      dispatch(handleBoardCreate(form, dispatch))
    },
    cellChange: (row, column) => {
      dispatch(cellChange(row, column))
    },
    makeInterval: (intervalCb, intervalTime) => {
      dispatch(makeInterval(intervalCb, intervalTime))
    },
    removeInterval: () => {
      dispatch(removeInterval())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
