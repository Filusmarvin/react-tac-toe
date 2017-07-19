import React, { Component } from 'react';
import base from '../rebase';

//CSS files
import "../CSS/Tic-tac-toe.css";

//Components
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
      wait:'o',
      winner: {
        won : null,
        loss: null
      },
      opponent:{},
      player: {}
    }
  }


  componentDidMount(){
    this.setState({ player: this.props.player})
    this.setState({ opponent: this.props.opponent})

    base.fetch(`${this.props.player.uid}/opponent`,{
      context: this,
      asArray: false,
      then(data){
        this.setState({ opponent: data})
      }
    })
  }


    updateBoard( loc, player){
      let gameBoard = this.state.gameBoard;
      let turn = this.state.turn;
      let winner = this.state.winner;
      let wait = this.state.wait;

      // this function handles all invalid moves and stop it from other clicks
      if(gameBoard[loc] === 'x' || gameBoard[loc] === 'o' || winner.won){
        //Invalid Move
        return;
      }

      let currentGameBoard = gameBoard
      currentGameBoard.splice(loc, 1, turn);
      this.setState({ gameBoard: currentGameBoard})




      // Winning combinations

      let topRow =  gameBoard[0] + gameBoard[1] + gameBoard[2];
      if(topRow.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: {won: turn, loss: wait} })
        this.whoWon(turn)
        return;
      }

      let middleRow =  gameBoard[3] + gameBoard[4] + gameBoard[5];
      if(middleRow.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: {won: turn, loss: wait} })
        this.whoWon(turn)
        return;
      }


      let bottomRow = gameBoard[6] + gameBoard[7] + gameBoard[8];
      if(bottomRow.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: {won: turn, loss: wait} })
        this.whoWon(turn)
        return;
      }

      let leftRow = gameBoard[0] + gameBoard[3] + gameBoard[6];
      if(leftRow.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: {won: turn, loss: wait} })
        this.whoWon(turn)
        return;
      }

      let middleCol =  gameBoard[1] + gameBoard[4] + gameBoard[7];
      if(middleCol.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: {won: turn, loss: wait} })
        this.whoWon(turn)
        return;
      }

      let rightCol =  gameBoard[2] + gameBoard[5] + gameBoard[8];
      if(rightCol.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: {won: turn, loss: wait} })
        this.whoWon(turn)
        return;
      }

      let leftDiag =  gameBoard[0] + gameBoard[4] + gameBoard[8];
      if(leftDiag.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: {won: turn, loss: wait} })
        this.whoWon(turn)
        return;
      }

      let rightDiag = gameBoard[2] + gameBoard[4] + gameBoard[6];
      if(rightDiag.match(/xxx|ooo/)){ // the match function checks for the string combination for a match
        this.setState({ winner: {won: turn, loss: wait} })
        this.whoWon(turn)
        return;
      }

      // join all the elements and check globally for the
      let moves = gameBoard.join(' ').replace(/ /g, '');
      if(moves.length === 9 ){
        this.setState({ winner: {won : " Draw " , loss: " Draw " }})
        this.whoWon()
      }

      this.setState({ turn : (turn === 'x') ? 'o' : 'x'});
      this.setState({ wait : (wait === 'o') ? 'x' : 'o'});


    }

    whoWon(turn){
      let winner = this.state.winner;
      let player = this.state.player;
      let wins = this.state.player.wins
      let losses = this.state.player.losses

      let opponent = this.state.opponent;
      let opponentlosses = this.state.opponent.losses;
      let opponentwins = this.state.opponent.wins;

      if(turn === "x"){
        this.setState( { player : {...player, wins : wins++ } })
        this.setState({ opponent : {...opponent, losses : opponentlosses++ } })
        base.update(`/${this.props.player.uid}`,{
          data:{
              player: {...player, wins : wins++ },
              opponent: {...opponent, losses : opponentlosses++ }
            }
        })
      } else if( turn === "o" ){
        console.log('o')
          this.setState( { player : {...player, losses : losses++ } })
          this.setState({ opponent : {...opponent, wins : opponentwins++ } })
          base.update(`/${this.props.player.uid}`,{
            data:{
              player: {...player, losses : losses++ },
              opponent: {...opponent, wins : opponentwins++ } }
          })
        }
    }

    resetBoard(){
      this.setState({
        gameBoard: [
          ' ', ' ', ' ',
          ' ', ' ', ' ',
          ' ', ' ', ' '
        ],
        turn:'x',
        winner: {
          won : null,
          loss: null
        }
      })
      window.location.reload()
    }

  render(){
    let winner = this.state.winner;
    let player = this.state.player;
    let wait = this.state.wait;
    let opponent = this.state.opponent;
    let turn = this.state.turn;
    return(
      <div className="container">
        <div className="menue">

          <Announcement
          winner={this.state.winner}/>
          <ResetButton reset={this.resetBoard.bind(this)}/>

        </div>
        <div className="player-board-opponent">

          <div className="player-side">
            <h1> {this.props.player.name} {this.props.player.age} </h1>
            <p className="turn"> {turn === 'x' ? " It is your turn " + this.props.player.name  : ' It is Opponents turn ' }</p>
            <p className="won"> {winner.won === 'x' ? 'You are the Winner! ' + player.name : null}  </p>
            <p className="lost"> {winner.won === 'o' ? 'You are the Loser! ' + player.name : null}  </p>

            <p> Wins ever: {player.wins} </p>
            <p> Losses ever: {player.losses}</p>

            <p className="symbol"> You are X </p>

          </div>

          <section className={winner.won ? "transition-out" : "board" } >
            { this.state.gameBoard.map((value, i) => {
              return(
                <Tile className={winner.won ? "transition-out" : null}
                key={i}
                loc={i}
                value={value}
                winner={winner}
                updateBoard={this.updateBoard.bind(this)}
                turn={this.state.turn} />
              )
            })}
          </section>

          <div className="opponent-side">
            <h1> opponent </h1>
            <p className="turn"> {turn === 'o' ? " It is Opponents turn" : ' It is ' + player.name + ' turn ' } </p>
            <p className="won"> {winner.won === 'o' ? 'You are the Winner! Opponent'  : null}  </p>
            <p className="lost"> {winner.won === 'x' ? 'You are the Loser! Opponent' : null}  </p>
            <p> Wins ever: {opponent.wins} </p>
            <p> Losses ever: {opponent.losses}</p>

            <p className="symbol"> You are O</p>
          </div>

        </div>

      </div>
    )
  }
}

export default Tic
