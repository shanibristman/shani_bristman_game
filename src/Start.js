import React from 'react';
import { useState, useEffect, useContext } from "react";
import { GameContext } from './Context/GameContext';
import Question from "./compomemt/Question";


export default function Start() {

  const { name, SetName, start, SetStart, load } = useContext(GameContext);


  const Start = () => {
    SetStart(true);
    load();
  }

  return (
    <>
      {start ?
        <div>
          <Question />
        </div> :
        <div className="home">
          <span className="loc">
            <div className="title">
              <p className="big"> WELCOME !  </p>
              <p>READY TO PLAY?? </p>
            </div>
            <label className="name">ENTER YOUE NAME:
              <br></br>
              <input type="text" value={name} onChange={(event) => SetName(event.target.value)}></input>
            </label>
            <button className="app-btn" onClick={Start}>START GAME :)</button>
          </span>
        </div>
      }
    </>
  )
}
