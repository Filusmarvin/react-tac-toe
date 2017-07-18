import React, {Component} from 'react';

// Css files
import '../CSS/LogOut.css'

class LogOut extends Component {

  logOut(props){
    props.logOut();
  }




  render(){
    return(
      <div className='log-out'>
        <button onClick={this.props.logOut.bind(this)}> Log Out </button>
      </div>
    )
  }
}

export default LogOut
