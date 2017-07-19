import React, {Component} from 'react';

// Css files
import '../CSS/Tile.css'

class Tile extends Component {

  tileClick(props){
    // console.log(props.loc, props.turn)
    props.updateBoard(props.loc, props.turn);
  }




  render(){
    return(
      <div className={'tile ' + this.props.loc } onClick={() => this.tileClick(this.props)}>
        <p> {this.props.value}</p>
      </div>
    )
  }
}

export default Tile
