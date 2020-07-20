import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/navbar";
import Home from "./components/homepage/home";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { AWS, Azure, GCP} from './components'
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navbar />
          <Router>
            <div>
              <Route exact path='/' component={Home} />
              <Route path='/aws' component={AWS}/>
              <Route path='/azure' component={Azure} />
              <Route path='/gcp' component={GCP}/>
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
