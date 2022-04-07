import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { GameContext } from '../Context/GameContext';
import './Question.css';
import Time from './Time';
import End from '../End';


export default function Question() {

    const { ChangeStatuse, name, bestScore, score, time, question, answers, correctAnswer, load, testAnswer, rep, style, showStyle } = useContext(GameContext);

    return (
        <div className="all-game">
            {rep < 12 && rep > 0 ? time === 0 ?

                <div className="end">
                    <p>Time is up</p>
                    <button className="endstartBtn" onClick={ChangeStatuse}>START AGAIN</button>
                </div>
                :

                <div className="WihtTime">
                    <div className="WithoutTime">
                        <div className="question">
                            {question}
                        </div>
                        <div className="answer">
                            {answers.map((a, index) =>
                                <button className={`${style} ${showStyle ? a === correctAnswer ? 'contG' : 'contR' : null}`} key={index} onClick={() => { testAnswer(a, correctAnswer) }}>{a}</button>
                            )}
                        </div>
                        <button className="nextOrGo" onClick={load}>NEXT</button>

                    </div>
                    <div className="category">
                        <p>Player : {name}</p>
                        <p>Score : {score}</p>
                        <p>Top Score: {bestScore}</p>
                        <p className="timer">{rep == 1 ?
                            null :
                            <Time

                            />}</p>
                    </div>

                </div>
                :
                <div className="gameOver">
                    <p >GAME OVER</p>
                    <div className="main">
                        <div className="over">
                            <p>YOUR SCORE - {score}</p>
                            {/* {score <60 ?
                            <img src="../pic/lose"></img> : null} */}
                            { score>60 ? score == 100 ? 
                              <img className= "image"src={require("../pic/winner3.png")}></img> :
                              <img className= "image" src={require("../pic/good1.png")}></img> :
                               <img className= "image" src={require("../pic/lose3.png")}></img> 
                            }
                        </div>
                        <div className="over">
                            <p>PLAY AGAIN??</p>
                            <button className="btn-start" onClick={ChangeStatuse}> CLICK HERE !</button>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
