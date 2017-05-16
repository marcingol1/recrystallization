import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBoard, boardLifecycleAction, cellChange } from './actions/boardActions'
import { makeInterval, removeInterval } from './actions/animationActions'
import CreateBoard from './containers/CreateBoard'
import Board from './components/Board'
import handleBoardCreate from './utils/handleBoardCreate'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  componentWillUnmount() {
    this.props.removeInterval()
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the `Game of Life`</h2>
          <input type="button" value="Stop the game" onClick={() => {
              this.props.removeInterval()
          }}/>
          <input type="button" value="Start the game" onClick={() => {
            if (!this.props.animation.interval) {
              this.props.makeInterval(() => this.props.boardLifecycle(this.props.board, this.props.settings), 500)
            }
          }}/>
          <CreateBoard onSubmit={this.props.handleBoardCreate}/>
        </div>
          <Board cellChange={this.props.cellChange} boardData={this.props.board} />
      </div>
    )
  }
}

const mapStateToProps = ({board, animation, settings}) => {
  return {
    board,
    animation,
    settings
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (type, size) => {
      dispatch(createBoard(type, size))
    },
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
