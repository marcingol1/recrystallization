import React, { Component } from 'react'
import { connect } from 'react-redux'
import CreateBoard from './components/CreateBoard'
import { createBoard } from './actions/boardActions'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <CreateBoard createBoard={this.props.createBoard}/>
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
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
