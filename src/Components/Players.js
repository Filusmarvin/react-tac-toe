import React, {Component} from 'react';

//CSS files
import '../CSS/Players.css'


class Players extends Component {
  constructor(){
    super()
    this.state = {
      player:{},
      turn:'x',
      wait:'o',
      winner: {
        won : null,
        loss: null
      },
      opponent:{}
    }
  }

  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    this.setState( { ...nextProps })
  }


  render(){
    let winner = this.state.winner;
    let player = this.state.player;
    let wait = this.state.wait;
    let opponent = this.state.opponent;

    return(
      <section className="card">
        <div className="player-card">
          <h1> Name: {this.props.play.player.name ? this.props.play.player.name : this.props.play.player.key} </h1>
          <h2> Wins: {this.props.play.player.wins} </h2>
          <h3> Losses: {this.props.play.player.losses} </h3>
        </div>

        <div className="draw-card">
          <h1> Draws: 0 </h1>
          <p> Sorry did not have enough to finish this portion </p>
        </div>

        <div className="opponent-card">
          <h1> Name: {this.props.play.opponent.name ? this.props.play.opponent.name : "Opponent"} </h1>
          <h2> Wins: {this.props.play.opponent.wins} </h2>
          <h3> Losses: {this.props.play.opponent.losses} </h3>
        </div>


      </section>
    )
  }
}

export default Players
