import React, {Component} from 'react';

//CSS files

import '../CSS/ResetButton.css'

class ResetButton extends Component {
  render(){
    return(
      <div className="visible">
        <button onClick={this.props.reset}> Reset </button>
      </div>
    )
  }
}

export default ResetButton
