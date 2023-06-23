import React, { useEffect } from 'react';
import { BrowserRouter as Router} from "react-router-dom"
import './App.css';
import { NavTop } from "./components/NavTop/NavTop";
import { AuthProvider } from './context/AuthContext';
import RouterWrapper from './router/Router';
import addNotification from 'react-push-notification';

function App() {
  useEffect(() => {
    const clickTONotify = () => {
      addNotification({
          title: "Welcome Back!",
          message: "You are the BingeBoss here!",
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
