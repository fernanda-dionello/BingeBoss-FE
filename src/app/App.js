import React, { useEffect } from 'react';
import { BrowserRouter as Router} from "react-router-dom"
import './App.css';
import { NavTop } from "../src/app/components/NavTop/NavTop";
import { AuthProvider } from '../src/app/context/AuthContext';
import RouterWrapper from '../src/app/router/Router';
import addNotification from 'react-push-notification';

function App() {
  useEffect(() => {
    const clickTONotify = () => {
      addNotification({
          title: "Test",
          message: "testing",
          duration: 10000,
          native: true
      })
    }
      clickTONotify();
  }, []);

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
