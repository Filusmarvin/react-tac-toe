import React, { Component } from 'react';
import base from '../rebase';
import firebase from 'firebase';
import { BrowserRouter as Router, Route } from 'react-router-dom'

// Components
import Login from './Login'
import Profile from './Profile'
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
      opponent:{}
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(this.setPlayerState.bind(this))

  }


  setPlayerState(user){
    if(user){
      console.log(user.uid)
      base.update(`/${user.uid}/player`,{
        data:{ uid:  user.uid }
      })

      base.fetch(`/${user.uid}/player`,{
        context: this,
        asArray: false,
        then(data){
          this.setState({ player : {
            uid:user.uid, ...data
          }})
        }
      });


      base.fetch(`/${user.uid}/opponent`,{
        context: this,
        asArray: false,
        then(data){
          this.setState({ opponent : data })
        }
      });

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
    this.setState({ player: { uid:""} })
    console.log('out')
    firebase.auth().signOut().then(() => {
  });
  window.location.assign("/")
  }

  newUser(name, age){
    this.setState({ player : {
      ...this.state.player,
      name:name,
      age:age,
      wins:0,
      losses:0
    }})

    this.setState({
      opponent:{
        wins:0,
        losses:0
    }})
  }


  render() {
    let player = this.state.player
    let opponent = this.state.opponent

    let uid = this.state.player.uid
    return (
      <Router>
      <div>

        {/* This is to render the Log out Component  if there is a UID */}
        { player.uid ? < LogOut logOut={this.logOut.bind(this)} player={player} /> : null }

        {/* This is to render the Log in Component */}
        <Route exact path={`/`} render={(pickles) =>
          < Login player={player} opponent={opponent}
          logInWithUserNameAndPassword={this.logInWithUserNameAndPassword.bind(this)}
          createUserNameAndPassword={this.createUserNameAndPassword.bind(this)}
          {...pickles} /> } />


        {/* This is to render the users Profile Component */}
        <Route exact path={`/player/profile/${uid}`} render={(pickles) =>
          < Profile player={player} opponent={opponent} newUser={this.newUser.bind(this)}
          {...pickles} /> }
        />
          {/* This is to render the Log out Component  if there is a UID */}
        <Route exact path={`/player/${uid}/play`} render={ (pickles) =>
          <Tic {...pickles} player={player} opponent={opponent}/> } />

      </div>
      </Router>
    );
  }
}

export default App;
