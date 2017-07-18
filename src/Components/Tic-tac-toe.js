import React, { Component } from 'react';
// import {base , app } from '../rebase';
// import firebase from 'firebase';

import "../CSS/Tic-tac-toe.css";

import Announcement from './Announcement.js'
import ResetButton from './ResetButton'
import Tile from './Tile'



class Tic extends Component {
  constructor() {
    super();
    this.state = {
      // left spaces to make it look nice
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn:'x',
      winner: null
    }
  }

    componentWillReceiveProps(props) {

    }

    componentDidMount(){

    }

    updateBoard( loc, player){
      let gameBoard = this.state.gameBoard
      let turn = this.state.turn
      let winner = this.state.winner
      // this function handles all invalid moves and stop it from other clicks
      if(gameBoard[loc] === 'x' || gameBoard[loc] === 'o' || winner){
        //Invalid Move
        return;
      }

      let currentGameBoard = gameBoard
      currentGameBoard.splice(loc, 1, turn);
      this.setState({ gameBoard: currentGameBoard})


      // Winning combinations

      let topRow =  gameBoard[0] + gameBoard[1] + gameBoard[2];
      if(topRow.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: turn })
        return;
      }

      let middleRow =  gameBoard[3] + gameBoard[4] + gameBoard[5];
      if(middleRow.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: turn })
        return;
      }


      let bottomRow = gameBoard[6] + gameBoard[7] + gameBoard[8];
      if(bottomRow.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: turn })
        return;
      }

      let leftRow = gameBoard[0] + gameBoard[3] + gameBoard[6];
      if(leftRow.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: turn })
        return;
      }

      let middleCol =  gameBoard[1] + gameBoard[4] + gameBoard[7];
      if(middleCol.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: turn })
        return;
      }

      let rightCol =  gameBoard[2] + gameBoard[5] + gameBoard[8];
      if(rightCol.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: turn })
        return;
      }

      let leftDiag =  gameBoard[0] + gameBoard[4] + gameBoard[8];
      if(leftDiag.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: turn })
        return;
      }

      let rightDiag = gameBoard[2] + gameBoard[4] + gameBoard[6];
      if(rightDiag.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: turn })
        return;
      }

      // join all the elements and chack globally for the
      let moves = gameBoard.join(' ').replace(/ /g, '');
      if(moves.length === 9 ){
        this.setState({ winner: " Draw "})
      }

      this.setState({ turn : (turn === 'x') ? 'o' : 'x'});
    }

    resetBoard(){
      this.setState({
        gameBoard: [
          ' ', ' ', ' ',
          ' ', ' ', ' ',
          ' ', ' ', ' '
        ],
        turn:'x',
        winner: null
      })

    }

  render(){
    return(
      <div className="container">
        <div className="menue">
          <h1> Tic Tac Toe </h1>
          <Announcement
          winner={this.state.winner}/>
          <ResetButton reset={this.resetBoard.bind(this)}/>
        </div>
        <section className="board">
          { this.state.gameBoard.map((value, i) => {
            return(
              <Tile
              key={i}
              loc={i}
              value={value}
              updateBoard={this.updateBoard.bind(this)}
              turn={this.state.turn} />
            )
          })}
        </section>
      </div>
    )
  }
}

export default Tic
