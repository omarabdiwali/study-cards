import ButtonAppBar from './components/ButtonAppBar';
import { HashRouter, Switch, Route } from 'react-router-dom';
import StudyCard from './components/cards/StudyCard';
import SettingsCard from './components/Settings';
import AddCard from './components/cards/NewCard';

function App() {
  return (
    <HashRouter basename='/'>
      <div className="App">
        <ButtonAppBar />
      </div>
      <Switch>
        <Route path='/cards'>
          {window.localStorage.getItem("cards") ? <StudyCard/> : <Route path='/newCard' />}
        </Route>
        <Route path="/settings">
          <SettingsCard />
        </Route>
        <Route path='/newCard'>
          <AddCard />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;