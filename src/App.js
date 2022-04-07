import React from "react";
import { useState, useEffect, useContext } from "react";
import './App.css';
import Start from "./Start"
import GameContextProvider from "./Context/GameContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const App = () => {

  return (
    <GameContextProvider className="all-game-app">
      <Router>
          <Start />
      </Router>
    </GameContextProvider>
  )
}

export default App;
