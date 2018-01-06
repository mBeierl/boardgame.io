import React from "react";
import PropTypes from "prop-types";

import "./scoreCard.css";

const Number = props => {
  return (
    <div
      className="number"
      onClick={() => props.onClick(props.color, props.number)}
    >
      <div className="inner">{props.number}</div>
      {props.clicked ? <div className="inner clicked">X</div> : ''}
    </div>
  );
};

Number.propTypes = {
  onClick: PropTypes.func,
  color: PropTypes.string,
  number: PropTypes.number,
  clicked: PropTypes.bool
};

class ScoreCard extends React.Component {
  static propTypes = {
    playerCard: PropTypes.object,
    numberClicked: PropTypes.func
  };

  numberClicked = (color, number) => {
    console.log(`Clicked ${color} '${number}'`);
  };

  render() {
    const { playerCard, numberClicked } = this.props;

    return <div className="score-card">
        <div className="red">
          <Number color="red" number={2} clicked={playerCard.red[0].clicked} onClick={() => numberClicked("red", 0)} />
          <Number color="red" number={3} clicked={playerCard.red[1].clicked} onClick={() => numberClicked("red", 1)} />
          <Number color="red" number={4} clicked={playerCard.red[2].clicked} onClick={() => numberClicked("red", 2)} />
          <Number color="red" number={5} clicked={playerCard.red[3].clicked} onClick={() => numberClicked("red", 3)} />
          <Number color="red" number={6} clicked={playerCard.red[4].clicked} onClick={() => numberClicked("red", 4)} />
          <Number color="red" number={7} clicked={playerCard.red[5].clicked} onClick={() => numberClicked("red", 5)} />
          <Number color="red" number={8} clicked={playerCard.red[6].clicked} onClick={() => numberClicked("red", 6)} />
          <Number color="red" number={9} clicked={playerCard.red[7].clicked} onClick={() => numberClicked("red", 7)} />
          <Number color="red" number={10} clicked={playerCard.red[8].clicked} onClick={() => numberClicked("red", 8)} />
          <Number color="red" number={11} clicked={playerCard.red[9].clicked} onClick={() => numberClicked("red", 9)} />
          <Number color="red" number={12} clicked={playerCard.red[10].clicked} onClick={() => numberClicked("red", 10)} />
        </div>
        <div className="yellow">
          <Number color="yellow" number={2} clicked={playerCard.yellow[0].clicked} onClick={() => numberClicked("yellow", 0)} />
          <Number color="yellow" number={3} clicked={playerCard.yellow[1].clicked} onClick={() => numberClicked("yellow", 1)} />
          <Number color="yellow" number={4} clicked={playerCard.yellow[2].clicked} onClick={() => numberClicked("yellow", 2)} />
          <Number color="yellow" number={5} clicked={playerCard.yellow[3].clicked} onClick={() => numberClicked("yellow", 3)} />
          <Number color="yellow" number={6} clicked={playerCard.yellow[4].clicked} onClick={() => numberClicked("yellow", 4)} />
          <Number color="yellow" number={7} clicked={playerCard.yellow[5].clicked} onClick={() => numberClicked("yellow", 5)} />
          <Number color="yellow" number={8} clicked={playerCard.yellow[6].clicked} onClick={() => numberClicked("yellow", 6)} />
          <Number color="yellow" number={9} clicked={playerCard.yellow[7].clicked} onClick={() => numberClicked("yellow", 7)} />
          <Number color="yellow" number={10} clicked={playerCard.yellow[8].clicked} onClick={() => numberClicked("yellow", 8)} />
          <Number color="yellow" number={11} clicked={playerCard.yellow[9].clicked} onClick={() => numberClicked("yellow", 9)} />
          <Number color="yellow" number={12} clicked={playerCard.yellow[10].clicked} onClick={() => numberClicked("yellow", 10)} />
        </div>
        <div className="green">
          <Number color="green" number={12} clicked={playerCard.green[0].clicked} onClick={() => numberClicked("green", 0)} />
          <Number color="green" number={11} clicked={playerCard.green[1].clicked} onClick={() => numberClicked("green", 1)} />
          <Number color="green" number={10} clicked={playerCard.green[2].clicked} onClick={() => numberClicked("green", 2)} />
          <Number color="green" number={9} clicked={playerCard.green[3].clicked} onClick={() => numberClicked("green", 3)} />
          <Number color="green" number={8} clicked={playerCard.green[4].clicked} onClick={() => numberClicked("green", 4)} />
          <Number color="green" number={7} clicked={playerCard.green[5].clicked} onClick={() => numberClicked("green", 5)} />
          <Number color="green" number={6} clicked={playerCard.green[6].clicked} onClick={() => numberClicked("green", 6)} />
          <Number color="green" number={5} clicked={playerCard.green[7].clicked} onClick={() => numberClicked("green", 7)} />
          <Number color="green" number={4} clicked={playerCard.green[8].clicked} onClick={() => numberClicked("green", 8)} />
          <Number color="green" number={3} clicked={playerCard.green[9].clicked} onClick={() => numberClicked("green", 9)} />
          <Number color="green" number={2} clicked={playerCard.green[10].clicked} onClick={() => numberClicked("green", 10)} />
        </div>
        <div className="blue">
          <Number color="blue" number={12} clicked={playerCard.blue[0].clicked} onClick={() => numberClicked("blue", 0)} />
          <Number color="blue" number={11} clicked={playerCard.blue[1].clicked} onClick={() => numberClicked("blue", 1)} />
          <Number color="blue" number={10} clicked={playerCard.blue[2].clicked} onClick={() => numberClicked("blue", 2)} />
          <Number color="blue" number={9} clicked={playerCard.blue[3].clicked} onClick={() => numberClicked("blue", 3)} />
          <Number color="blue" number={8} clicked={playerCard.blue[4].clicked} onClick={() => numberClicked("blue", 4)} />
          <Number color="blue" number={7} clicked={playerCard.blue[5].clicked} onClick={() => numberClicked("blue", 5)} />
          <Number color="blue" number={6} clicked={playerCard.blue[6].clicked} onClick={() => numberClicked("blue", 6)} />
          <Number color="blue" number={5} clicked={playerCard.blue[7].clicked} onClick={() => numberClicked("blue", 7)} />
          <Number color="blue" number={4} clicked={playerCard.blue[8].clicked} onClick={() => numberClicked("blue", 8)} />
          <Number color="blue" number={3} clicked={playerCard.blue[9].clicked} onClick={() => numberClicked("blue", 9)} />
          <Number color="blue" number={2} clicked={playerCard.blue[10].clicked} onClick={() => numberClicked("blue", 10)} />
        </div>
      </div>;
  }
}

export default ScoreCard;
