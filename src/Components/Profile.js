import React, { Component } from 'react';
import  base from '../rebase';

import firebase from 'firebase';

// CSS files
import '../CSS/Profile.css';

//Components
import  Players from './Players'

//Variables
 var storageRef = firebase.storage().ref();

export default class Profile extends Component {
  constructor (){
    super()
    this.state = {
      player: {},
      images: [],
      num: 1,
      players:[]
    }
  }


  componentDidMount(){
    let images = this.state.images
    let player = this.state.player
    this.setState({ player: this.props.player})

    base.fetch(`/${this.props.player.uid}/player`, {
      context: this,
      asArray: false,
      then(data){
        console.log(data)
        this.setState({ player : { ...this.state.player, ...data }})
      }
    })

    base.fetch(`/`, {
      context: this,
      asArray: true,
      then(data){
        console.log(data)
        this.setState({ players : data })
      }
    })


      document.getElementById('file').addEventListener('change', this.handleFileSelect, false);
      document.getElementById('file').disabled = true;
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log('Anonymous user signed-in.', user);
          document.getElementById('file').disabled = false;
        } else {
          console.log('There was no anonymous session. Creating a new anonymous user.');
          // Sign the user in anonymously since accessing Storage requires the user to be authorized.
          firebase.auth().signInAnonymously();
        }
      });
  }

    // handleFileSelect(evt) {
    //   evt.stopPropagation();
    //   evt.preventDefault();
    //   var file = evt.target.files[0];
    //   var metadata = {
    //     'contentType': file.type
    //   };
    //   // Push to child path.
    //   // [START oncomplete]
    //   console.log(file.name)
    //   storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
    //     console.log('Uploaded', snapshot.totalBytes, 'bytes.');
    //     console.log(snapshot.metadata);
    //     console.log(snapshot);
    //     var url = snapshot.downloadURL;
    //     console.log('File available at', url);
    //
    //     // [START_EXCLUDE]
    //     document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
    //     // [END_EXCLUDE]
    //   }).catch(function(error) {
    //     // [START onfailure]
    //     console.error('Upload failed:', error);
    //     // [END onfailure]
    //   });
    //   // [END oncomplete]
    //   this.addToState(file.name)
    //
    // }

    addToState(file){
      console.log(file)
    }

    next(){
      let num = this.state.num
      let player = this.state.player

      if(num === 1){
        this.setState({ num: 2 })
        console.log(num)
        console.log(this.name.value)
        return;
      } else if( num === 2 ){
        this.setState({ num: 3 })
        console.log(this.age.value)
        return;
      } else if(num === 3){
        let name = this.name.value;
        let age = this.age.value;

        this.setState( { player : {...this.state.player,
          name: name,
          age: age,
          uid: this.state.player.uid,
          wins:0,
          losses:0
        }})

        base.update(`${this.state.player.uid}/player`, {
          data: {
            name: name,
            age: age,
            uid: this.state.player.uid,
            wins:0,
            losses:0
          }
        })

        base.update(`${this.state.player.uid}/opponent`, {
          data: {
            wins:0,
            losses:0
          }
        })

        this.props.newUser(name , age )
      }
    }

  render(){
    let images = this.state.images
    let num = this.state.num
    let player = this.state.player
    let players = this.state.players
    return (
      <div className="profile-box">
        <div className={ player.age ? "" : "hidden"}>
          <header className="profile-header">
            <h1> Hello {player.name} </h1>
          </header>
          <section>
            {images.map((image , i ) => {
              return(
                <img className="image" key={i} src={image} />
              )
            })}
          </section>


          <div className="player-stats">
            <header>
              <h2> Player Stats </h2>
            </header>
            <section className="player-container">

              <div className="player-boxes">
                <p> Wins </p>
                <div className="stats">
                  Wins:{player.wins}
                </div>
              </div>

              <div className="player-boxes">
                <p> Losses </p>
                <div className="stats">
                  losses:{player.losses}
                </div>
              </div>

            </section>
          </div>

            {/*  This is to add images */}

          <div>
            <input type="file" id="file" name="file"/>
            <span id="linkbox"> </span>
          </div>

          <div>
            <div>
              {players.map(( play, index) => {
                return (
                  <Players key={index}
                  player={player}
                  play={play}
                   />
                )
              })}
            </div>
          </div>

        </div>

        {/*  Below here is for new users */}

        <div className={ this.state.player.age ? "hidden" : "new-user"}>
          <div>
            <h2> Just a few steps to get you set up </h2>

            <div className="user-steps">
              <div className={num === 1 ? "name-box" : "hidden"}>
                <p> Step {num} of 2 </p>
                <p> What is your name? </p>
                <input className="name-input" type="text" ref={(input) => {this.name = input} } />
                <label > Your name </label>
              </div>

              <div className={num === 2 ? "age-box" : "hidden"}>
                <p> Step {num} of 2 </p>
                <p> What is your age? </p>
                <input className="age-input" type="text" ref={(input) => {this.age = input} } />
                <label > Your age </label>
              </div>

              <div className={num === 3 ? null : "hidden"}>
                <p> Please press Next to continue </p>
              </div>

              <button className="" onClick={ this.next.bind(this)}> Next </button>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
