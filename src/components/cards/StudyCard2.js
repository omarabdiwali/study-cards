import './StudyCard.css';
import React, { useState } from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';


export default function StudyCard() {

  console.log(studyTasks);
  let qNumber = Math.floor(Math.random() * studyTasks.length);
  const [number, setNumber] = useState(qNumber);
  const [quesAnswered, setQuesAnswered] = useState([qNumber]);
  shuffle(studyTasks[number].answers);
  
  function updateQues() {
    if (quesAnswered.length === studyTasks.length) {
      return;
    }
    let qNumber = Math.floor(Math.random() * studyTasks.length);
    while (quesAnswered.includes(qNumber)) {
      qNumber = Math.floor(Math.random() * studyTasks.length);
    }
    setNumber(qNumber);
    shuffle(studyTasks[number].answers);
    setQuesAnswered([...quesAnswered, qNumber]);
    
    checking("clear");
  }


  function shuffle(array) {
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

  function answerClicked(event) {
    let userAnswer = event.target.value;
    let answerClass = event.target.classList;

    let correct = studyTasks[number].correct
    
    if (userAnswer === correct) {
      answerClass.replace("btn-dark", "btn-success");
      checking("correct");
    }
    else {
      answerClass.replace("btn-dark", "btn-danger");
      checking("incorrect", correct);
    }
  }

  function checking(reason, correctAns=null) {
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
          button.classList.replace('btn-dark', 'btn-success');
        }
        return button.disabled = true;
      })
    }

    else if (reason === "clear") {
      buttons.map((button) => {
        if (button.classList.contains('btn-success')) {
          button.classList.replace('btn-success', 'btn-dark');
        }
        else if (button.classList.contains('btn-danger')) {
          button.classList.replace('btn-danger', 'btn-dark')
        }
        return button.disabled = false;
      
      })
    }
  }
  
  return (
    <div>
      <span>
        <IconButton aria-label="settings" style={{float: "left", margin: "10px"}} component={Link} to="/settings">
          <SettingsIcon />
        </IconButton>
        <IconButton aria-label="addCard" style={{float: "right", margin: "10px"}} component={Link} to="/newCard">
          <AddBoxIcon />
        </IconButton>
      </span>
      <main className="main">
        <section className="container">
            <article className="review">
              <div style={{ marginBottom: "20px" }} id="question">
                {studyTasks[number].question}
              </div>
                <p id="info">
                    <button className="btn btn-dark a1" style={{width: "100%", marginLeft: "10px"}} value={studyTasks[number].answers[0]} onClick={answerClicked}>
                        <span>{studyTasks[number].answers[0]}</span>
                    </button>
                    <button className="btn btn-dark a2" style={{width: "100%", marginLeft: "10px"}} value={studyTasks[number].answers[1]} onClick={answerClicked}>
                        <span>{studyTasks[number].answers[1]}</span>
                    </button>
                    <button className="btn btn-dark a3" style={{width: "100%", marginLeft: "10px"}} value={studyTasks[number].answers[2]} onClick={answerClicked}>
                        <span>{studyTasks[number].answers[2]}</span>
                    </button>
                    <button className="btn btn-dark a4" style={{width: "100%", marginLeft: "10px"}} value={studyTasks[number].answers[3]} onClick={answerClicked}>
                        <span>{studyTasks[number].answers[3]}</span>
                    </button>
                </p>
                <button className="random-btn" id="next" onClick={updateQues} style={{width: "100%", marginLeft: "10px"}}>Next</button>
            </article>
        </section>
      </main>
    </div>
  )
}