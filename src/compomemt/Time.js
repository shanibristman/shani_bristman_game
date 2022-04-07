import React, { useState, useEffect,useContext } from 'react';
import { GameContext } from '../Context/GameContext';


const Timer = () => {
  const {time,SetTime}  = useContext(GameContext) ;
  const [isActive, setIsActive] = useState(true);

  const fmtMSS = (s)=>{
      return(s-(s%=60))/60+(9<s?':':'0:0')+s
    }
    // const onTimesup = () =>{

    // }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        SetTime(time => time - 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    if(time === 0){
        setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  return (
   
      <div className="time">
        {fmtMSS(time)}
      </div>
  );
};

export default Timer;