import React, { Component } from 'react';
import { base , app } from '../rebase';
import firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import Login from './Login'
import Tic from './Tic-tac-toe'
import LogOut from './LogOut'

// Css files
import '../CSS/App.css';
import '../CSS/hover.css'

class App extends Component {

  constructor(){
    super()
    this.state = {
      player: {},
      opponent: {},
      Score: {}
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(this.setPlayerState.bind(this))

    if(this.state.player.uid){
      base.syncState(`/player/${this.state.player.uid}`,{
        context: this,
        state: 'player',
        asArray: false
      });
    }
  }


  setPlayerState(user){
    if(user){
      this.setState({ player:
        {
          uid: user.uid
        }
      })
    }
  }

  logInWithUserNameAndPassword(email, password){
    console.log(email , password)
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(user) {
  		if (user) {
  			console.log(user)
      }
    })
  }

    createUserNameAndPassword(email,password){
    console.log(email , password)
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
  		if (user) {
  			console.log(user.uid)
  			// console.log(response)
      }
    })
  }

  logInWithGoogle(){
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token.
          var token = result.credential.accessToken;
        }
        var user = result.user;

        console.log(user,token)

      });
    }

  logOut () {
    console.log('out')
    firebase.auth().signOut().then(() => {
  });
  this.setState({ player: {} })
  window.location.assign("/")
  }

  update(){
    let uid = this.state.player.uid;
    base.update(`player/${uid}`,{
      data : { marvin : 'marvin'}
    })
  }

  render() {
    let player = this.state.player
    let opponent = this.state.opponent

    let uid = this.state.player.uid
    return (
      <Router>
      <div>

        { player.uid ? < LogOut logOut={this.logOut.bind(this)} /> : null }

        <Route exact path={`/`} render={(pickles) =>

          < Login player={player} opponent={opponent}
          logInWithUserNameAndPassword={this.logInWithUserNameAndPassword.bind(this)}
          createUserNameAndPassword={this.createUserNameAndPassword.bind(this)}
          {...pickles} /> } />

        <Route exact path={`/${uid}`} render={ (pickles) =>
          <Tic {...pickles} /> } />

          <button onClick={this.update.bind(this)}> update </button>
      </div>
      </Router>
    );
  }
}

export default App;
