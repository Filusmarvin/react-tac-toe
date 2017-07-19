import React, {Component} from 'react';
import  { Link } from 'react-router-dom';
import  base from '../rebase';

// Css files
import '../CSS/LogOut.css'

class LogOut extends Component {


  render(){
    let uid = this.props.player.uid
    return(
      <div className='log-out'>
        <Link to={`/player/profile/${uid}`}> My Account </Link>

        <Link to={`/player/${uid}/play`}> Play Tic Tac Toe </Link>

        <button onClick={this.props.logOut.bind(this)}> Log Out </button>
      </div>
    )
  }
}

export default LogOut
