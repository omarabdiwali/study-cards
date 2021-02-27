import React, {useState} from 'react';
import { useSnackbar } from 'notistack';

export default function ChangeCard({ question, answers, correct }) {
  
  const { enqueueSnackbar } = useSnackbar();

  const [quest, setQuest] = useState(question);
  const [a1, setA1] = useState(answers[0]);
  const [a2, setA2] = useState(answers[1]);
  const [a3, setA3] = useState(answers[2]);
  const [a4, setA4] = useState(answers[3]);
  const [corr, setCorr] = useState(correct);

  function handleChange(e) {
    if (e.target.id === "quest") {
      setQuest(e.target.value);
    }
    else if (e.target.id === "a1") {
      setA1(e.target.value);
    }
    else if (e.target.id === "a2") {
      setA2(e.target.value);
    }
    else if (e.target.id === "a3") {
      setA3(e.target.value);
    }
    else if (e.target.id === "a4") {
      setA4(e.target.value);
    }
    else if (e.target.id === "corr") {
      setCorr(e.target.value);
    }
  }

  function saveCard() {
    
    let cards = JSON.parse(window.localStorage.getItem("cards"));
    let number = Number(window.localStorage.getItem("number"));

    let ansList = [a1, a2, a3, a4];
    let card = cards[number];
    let newCard = { question: quest, answers: ansList, correct: corr };

    if (JSON.stringify(card) !== JSON.stringify(newCard)) {
      let cards = JSON.parse(window.localStorage.getItem("cards"));
      if (card !== newCard) {
        let ind = cards.findIndex(x => JSON.stringify(x) === JSON.stringify(card));
        cards[ind] = newCard;
        window.localStorage.setItem("cards", JSON.stringify(cards));
        enqueueSnackbar("Card saved!", {variant: "success", autoHideDuration: 2000});
      }
    }
  }

  return (
    <form style={{top: "50%", width: "80%", margin : "auto", marginTop: "65px"}}>
      <div className="form-group">
        <label htmlFor="question">Question</label>
        <input type="text" className="form-control" id="quest" value={quest} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="answer1">Answer #1</label>
        <input type="text" className="form-control" id="a1" value={a1} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="answer1">Answer #2</label>
        <input type="text" className="form-control" id="a2" value={a2} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="answer2">Answer #3</label>
        <input type="text" className="form-control" id="a3" value={a3} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="answer3">Answer #4</label>
        <input type="text" className="form-control" id="a4" value={a4} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="answer4">Correct Answer</label>
        <input type="text" className="form-control" id="corr" value={corr} onChange={handleChange} />
      </div>
      <center>
        <div style={{ marginTop: "10px" }}>
          <button type="button" className="btn btn-primary" onClick={saveCard}>Save</button>
        </div>
      </center>
    </form>
  )
}
