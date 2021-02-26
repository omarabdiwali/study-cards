import React from 'react';

export default class AddCard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { question: '', answer1: '', answer2: '', answer3: '', answer4: '', correct: '' };

    this.handleChange = this.handleChange.bind(this);
    this.addToQues = this.addToQues.bind(this);
  }
  
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  handleChange(event) {
    this.setState({[event.target.id] : event.target.value})
  }
  
  addToQues() {
    if (this.state.question === '' || this.state.answer1 === '' || this.state.answer2 === '' || this.state.answer3 === '' || this.state.answer4 === '' || this.state.correct === '') {
      alert("Input cannot be a null value.")
    }
    else {
      let ans = [this.state.answer1, this.state.answer2, this.state.answer3, this.state.answer4];
      ans = this.shuffle(ans);
      let newcard = { question: this.state.question, answers: ans, correct: this.state.correct };
      let cards = JSON.parse(window.localStorage.getItem("cards"));
      
      cards = cards ? cards = JSON.stringify([...cards, newcard]) : JSON.stringify([newcard]);
      
      window.localStorage.setItem("cards", cards);
      
      document.getElementById('question').value = '';
      document.getElementById('answer1').value = '';
      document.getElementById('answer2').value = '';
      document.getElementById('answer3').value = '';
      document.getElementById('answer4').value = '';
      document.getElementById('correct').value = '';
    }
  }

  render() {
    return (
      <form style={{ top: "50%", width: "80%", margin: "auto", marginTop: "65px" }}>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input type="text" className="form-control" id="question" onChange={ this.handleChange }/>
        </div>
        <div className="form-group">
          <label htmlFor="answer1">Answer #1</label>
          <input type="text" className="form-control" id="answer1" onChange={ this.handleChange }/>
        </div>
        <div className="form-group">
          <label htmlFor="answer1">Answer #2</label>
          <input type="text" className="form-control" id="answer2" onChange={ this.handleChange }/>
        </div>
        <div className="form-group">
          <label htmlFor="answer2">Answer #3</label>
          <input type="text" className="form-control" id="answer3" onChange={ this.handleChange }/>
        </div>
        <div className="form-group">
          <label htmlFor="answer3">Answer #4</label>
          <input type="text" className="form-control" id="answer4" onChange={ this.handleChange }/>
        </div>
        <div className="form-group">
          <label htmlFor="answer4">Correct Answer</label>
          <input type="text" className="form-control" id="correct" onChange={ this.handleChange }/>
        </div>
        <center>
          <div style={{ marginTop: "10px" }}>
          <button type="button" className="btn btn-primary" onClick={this.addToQues}>Add</button>
          </div>
        </center>
      </form>
    )
  }
}
