import React from 'react';
import { BrowserRouter as Router} from "react-router-dom"
import './App.css';
import { NavTop } from "../src/app/components/NavTop/NavTop";
import { AuthProvider } from '../src/app/context/AuthContext';
import RouterWrapper from '../src/app/router/Router';
import './messaging_init_in_sw';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <NavTop className="navTop"/>
          <RouterWrapper />
        </div>
      </AuthProvider>
    </Router>
    
  );
}

export default App;
