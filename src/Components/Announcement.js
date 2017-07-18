import React, {Component} from 'react';

// Css files
import '../CSS/Announcement.css'

class Announcement extends Component {
  render(){
    return(
      <div className={this.props.winner ? "visible" : "hidden"}>
        <h2> Game Over </h2>
      </div>
    )
  }
}

export default Announcement
