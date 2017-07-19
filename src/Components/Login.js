import React, { Component } from 'react';
import  { Link } from 'react-router-dom';
// import {base , app } from '../rebase';
// import firebase from 'firebase';
import '../CSS/Login.css'


class App extends Component {

  constructor(){
    super()
    this.state = {
      player: {},
      opponent: {}
    }
  }

  login(e){
    e.preventDefault()
    let email = this.username1.value;
    let password = this.password1.value;
    this.props.logInWithUserNameAndPassword(email, password)
  }

  createUser(e){
    e.preventDefault()
    let email = this.username2.value;
    let password = this.password2.value;
    // console.log(email , password);
    this.props.createUserNameAndPassword(email, password)
  }


  render() {
    return (
      <div>

        <div className={ this.props.player.uid ? 'hidden' : "login" }>
          <header className="lets-play">
            <h1> Lets Play Tic Tac Toe! </h1>
          </header>
          <section className="login-signup">
            <div className="sign-in">
              <h1 className="sign-in-h1"> Please Sign In</h1>

              <form className="username-form" onSubmit={this.login.bind(this)}>
                <input type="text"  className="username" ref={ (input) => {this.username1 = input} } />
                <label> Username </label>

                <input type="password"  className="password" ref={ (input) => {this.password1 = input} } />
                <label> Password </label>
                <button> Enter </button>
              </form >

            </div>

            <div className="sign-up">
              <h1 className="no-account"> No account? Then sign up </h1>

              <form className="username-form" onSubmit={this.createUser.bind(this)}>
                <input type="text"  className="username"  ref={ (input) => {this.username2 = input} } />
                <label> username </label>

                <input type="password"  className="password" ref={ (input) => {this.password2 = input} } />
                <label> Password </label>
                <button> Submit </button>
              </form>

            </div>

          </section>
        </div>

        <div className={this.props.player.uid ? " continue" : "hidden"}>
          <header>
            <h1> Welcome {this.props.player.name} </h1>
          </header>
          <div className="continue-option">
            <p> You are now logged in </p>
            <p> Please press next to continue </p>
            < Link className="next-button hvr-grow" to={`/player/profile/${this.props.player.uid}`} > Next </Link>
          </div>
        </div>

      </div>
    );
  }
}

export default App;
