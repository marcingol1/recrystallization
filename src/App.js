import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createBoard, boardLifecycleAction, cellChange, addColor } from './actions/boardActions'
import { makeInterval, removeInterval } from './actions/animationActions'

import CreateBoard from './containers/CreateBoard'
import Board from './components/Board'

import handleBoardCreate from './utils/handleBoardCreate'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  componentWillUnmount () {
    this.props.removeInterval()
  }

  render () {
    return (
      <div className="App">
        <div className="App-header">
          <img onClick={this.props.addColor} src={logo} className="App-logo" alt="logo"/>
          <CreateBoard onSubmit={this.props.handleBoardCreate}/>
          <button onClick={() => {
            this.props.removeInterval()
          }}>Stop </button>
          <button onClick={() => {
            if (!this.props.animation.interval) {
              console.log(this.props.form.boardCreate.values)
              this.props.makeInterval(() => this.props.boardLifecycle(this.props.board, this.props.form.boardCreate.values), 500)
            }
          }}> Start </button>
        </div>
        <Board colors={this.props.settings.colors} cellChange={this.props.cellChange} boardData={this.props.board}/>
      </div>
    )
  }
}

const mapStateToProps = ({board, animation, settings, form}) => {
  return {
    board,
    animation,
    settings,
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
    },
    addColor: () => {
      dispatch(addColor())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
