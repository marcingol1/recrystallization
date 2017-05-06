import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBoard, boardLifecycleAction, cellChange } from './actions/boardActions'
import { makeInterval, removeInterval } from './actions/animationActions'
import CreateBoard from './components/CreateBoard'
import Board from './components/Board'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  componentDidMount() {
    //this.interval = setInterval(() => this.props.boardLifecycle(this.props.board.board), 200)
    //this.props.makeInterval(() => this.props.boardLifecycle(this.props.board.board), 300)
  }

  componentWillUnmount() {
    //this.props.removeInterval()
    removeInterval(this.interval)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the `Game of Life`</h2>
          <input type="button" value="Stop the game" onClick={() => {
            clearInterval(this.interval)
            this.interval = null
          }}/>
          <input type="button" value="Start the game" onClick={() => {
            if (!this.interval) {
              this.interval = setInterval(() => this.props.boardLifecycle(this.props.board.board), 200)
            }
          }}/>

          <CreateBoard createBoard={this.props.createBoard}/>
        </div>
          <Board cellChange={this.props.cellChange} boardData={this.props.board} />
      </div>
    )
  }
}

const mapStateToProps = ({board, animation}) => {
  return {
    board,
    animation
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (size, type) => {
      dispatch(createBoard(size, type))
    },
    boardLifecycle: (boardData) => {
      dispatch(boardLifecycleAction(boardData))
    },
    cellChange: (boardData, row, column) => {
      dispatch(cellChange(boardData, row, column))
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
