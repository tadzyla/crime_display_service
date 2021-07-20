import Home from './Home';
import Navbar from './Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Crimes from './Crimes';



function App() {
  return (
    <Router>
      <div className="App" style={{backgroundColor: 'black'}}>
        <Navbar />
        <div className="content" >
        <Switch>
          <Route exact path="/"> 
            <Home />
          </Route>
          <Route exact path="/crimes"> 
            <Crimes />
          </Route>
          
        </Switch>
        </div>

      </div>
    </Router>
  );
}

export default App;
