import './StudyCard.css';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';

export default class StudyCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: JSON.parse(window.localStorage.getItem("cards")), number: 0, answered: [0]
    }

    this.updateQues = this.updateQues.bind(this);
    this.answerClicked = this.answerClicked.bind(this);
  };

  updateQues() {
    if (this.state.answered.length === this.state.cards.length) {
      return;
    }
    let qNumber = Math.floor(Math.random() * this.state.cards.length);
    while (this.state.answered.includes(qNumber)) {
      qNumber = Math.floor(Math.random() * this.state.cards.length);
    }
    this.setState({ number: qNumber });
    this.setState({ answered: [...this.state.answered, qNumber] });
    
    this.checking("clear");
  }

  answerClicked(event) {
    let userAnswer = event.target.value;
    let answerClass = event.target.classList;

    let correct = this.state.cards[this.state.number].correct;

    if (userAnswer === correct) {
      answerClass.replace("btn-dark", "btn-success");
      this.checking("correct");
    }
    else {
      this.checking("incorrect", correct);
    }
  }

  checking(reason, correctAns=null) {
    let button1 = document.querySelector('.a1');
    let button2 = document.querySelector('.a2');
    let button3 = document.querySelector('.a3');
    let button4 = document.querySelector('.a4');

    let buttons = [button1, button2, button3, button4];
    
    if (reason === "correct") {
      buttons.map((button) => {
        return button.disabled = true;
      })
    }

    else if (reason === "incorrect") {
      buttons.map((button) => {
        if (button.innerText === correctAns) {
          button.disabled = true;
          return button.classList.replace('btn-dark', 'btn-success');
        }
        else {
          return button.disabled = true;
        }
      })
    }

    else if (reason === "clear") {
      buttons.map((button) => {
        if (button.classList.contains('btn-success')) {
          button.disabled = false;
          return button.classList.replace('btn-success', 'btn-dark');
        }
        else {
          return button.disabled = false;
        }
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.cards.length > 0 ? <div>
          <span>
            <IconButton aria-label="settings" style={{ float: "left", margin: "1.5%" }} component={Link} to="/settings">
              <SettingsIcon />
            </IconButton>
            <IconButton aria-label="addCard" style={{ float: "right", margin: "1.5%" }} component={Link} to="/newCard">
              <AddBoxIcon />
            </IconButton>
          </span>
          <main className="main">
            <section className="container">
              <article className="review">
                <div style={{ marginBottom: "20px" }} id="question">
                  {this.state.cards[this.state.number].question}
                </div>
                <p id="info">
                  <button className="btn btn-dark a1" style={{ width: "100%", marginLeft: "1%" }} value={this.state.cards[this.state.number].answers[0]} onClick={this.answerClicked}>
                    <span>{this.state.cards[this.state.number].answers[0]}</span>
                  </button>
                  <button className="btn btn-dark a2" style={{ width: "100%", marginLeft: "1%" }} value={this.state.cards[this.state.number].answers[1]} onClick={this.answerClicked}>
                    <span>{this.state.cards[this.state.number].answers[1]}</span>
                  </button>
                  <button className="btn btn-dark a3" style={{ width: "100%", marginLeft: "1%" }} value={this.state.cards[this.state.number].answers[2]} onClick={this.answerClicked}>
                    <span>{this.state.cards[this.state.number].answers[2]}</span>
                  </button>
                  <button className="btn btn-dark a4" style={{ width: "100%", marginLeft: "1%" }} value={this.state.cards[this.state.number].answers[3]} onClick={this.answerClicked}>
                    <span>{this.state.cards[this.state.number].answers[3]}</span>
                  </button>
                </p>
                <button className="random-btn" id="next" onClick={this.updateQues} style={{ width: "100%", marginLeft: "10px" }}>Next</button>
              </article>
            </section>
          </main>
        </div> : <center><h1 style={{padding: "5%"}}>No Cards.</h1></center>}
      </div>
    )
  }
}
