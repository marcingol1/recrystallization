import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createBoard, boardLifecycleAction } from './actions/boardActions'
import CreateBoard from './components/CreateBoard'
import Board from './components/Board'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  componentDidMount() {
    this.interval = setInterval(() => this.props.boardLifecycle(this.props.board.board), 300)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Game of Life</h2>
          <CreateBoard createBoard={this.props.createBoard}/>
        </div>
          <Board boardData={this.props.board} />
      </div>
    )
  }
}

const mapStateToProps = ({board}) => {
  return {
    board
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createBoard: (size) => {
      dispatch(createBoard(size))
    },
    boardLifecycle: (boardData) => {
      dispatch(boardLifecycleAction(boardData))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
