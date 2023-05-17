import React from "react";
import './App.css';
import { BrowserRouter as Router} from "react-router-dom";
import Routers from './routes'
import { Provider } from 'react-redux';
import store from 'store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routers />
      </Router>
    </Provider>
  );
}

export default App;
