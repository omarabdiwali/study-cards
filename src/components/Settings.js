import React from 'react';
import ChangeCard from './cards/ChangeCard';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

class SettingsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: window.localStorage.getItem("number") !== 0 ? 0 : Number(window.localStorage.getItem("number")), cards: JSON.parse(window.localStorage.getItem("cards"))};

    this.handleChange = this.handleChange.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.prevQuestion = this.prevQuestion.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
  }
  
  componentDidMount() {
    window.localStorage.setItem("number", Number(0));
  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }
  nextQuestion() {
    if (this.state.number < this.state.cards.length - 1) {
      window.localStorage.setItem("number", Number(this.state.number + 1));
      window.location.reload();
    }
  }
  prevQuestion() {
    if (this.state.number >= 1) {
      window.localStorage.setItem("number", Number(this.state.number - 1));
      window.location.reload();
    }
  }
  deleteCard() {
    let cards = window.localStorage.getItem("cards");
    cards = JSON.parse(cards);
    cards.splice(this.state.number, 1);
    cards = JSON.stringify(cards);
    window.localStorage.setItem("cards", cards);
    window.location.reload();
  }

  render() {
    return (
      <div>
        {this.state.cards.length > 0 ? <div>
          <IconButton aria-label="delete" style={{ float: "right", marginRight: "40px" }} onClick={this.deleteCard}>
            <DeleteIcon />
          </IconButton>
          <ChangeCard question={this.state.cards[this.state.number].question} correct={this.state.cards[this.state.number].correct} answers={this.state.cards[this.state.number].answers} />
          <button type="button" className="btn btn-primary" style={{ margin: "10px", float: "right" }} onClick={this.nextQuestion}>Next</button>
          <button type="button" className="btn btn-primary" style={{ margin: "10px", float: "left" }} onClick={this.prevQuestion}>Prev</button>
        </div> : <center><h1 style={{padding: "5%"}}>No Cards.</h1></center> }
      </div>
    );
  }
}

export default SettingsCard;