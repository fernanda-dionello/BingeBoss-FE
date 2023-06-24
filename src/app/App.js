import React from 'react';
import { BrowserRouter as Router} from "react-router-dom"
import './App.css';
import { NavTop } from "./components/NavTop/NavTop";
import { AuthProvider } from './context/AuthContext';
import RouterWrapper from './router/Router';
import { Notifications } from 'react-push-notification';

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <div className="App">
            <Notifications />
            <NavTop className="navTop"/>
            <RouterWrapper />
          </div>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
