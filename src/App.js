import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [start,setStart] = useState(false);
  const [min,setMin] = useState('0');
  const [sec,setSec] = useState('00');
  const timeOutID = useRef('');
  const count = useRef(0);
  const minutes = useRef(0);
  const seconds = useRef(0);
 
  useEffect(()=>{
    handleTimer();
    return(()=>clearTimeout(timeOutID));
  },[start]);

  const handleStart = () =>{
    setStart(true);
    handleTimer();
  }
  
  const handleStop = () =>{
    setStart(false);
  }
  
  const handleReset = () =>{
    count.current = 0;
    minutes.current = 0;
    seconds.current = 0;
    setMin('0');
    setSec('00');
    clearTimeout(timeOutID.current);
    handleTimer();
  }
  
  const handleTimer = () =>{
      if(start){
        count.current++;
        if(count.current===100){
          seconds.current++;
          count.current = 0;
        }
        if(seconds.current===60){
          minutes.current++;
          seconds.current = 0;
        }
        if(seconds.current<10)
          setSec('0'+ seconds.current.toString());
        else
          setSec(seconds.current.toString());
        setMin(minutes.current.toString());
        timeOutID.current = setTimeout(()=>{handleTimer()},10);
    }
    else{
      clearTimeout(timeOutID.current)
    }
  }

  return (
    <div className="App">
        <h1>Stopwatch</h1>
        <p>Time: {min}:{sec}</p>
        <div>
          {
            start?
            <button onClick={handleStop}>Stop</button>
            :
            <button onClick={handleStart}>Start</button>
          }
          <button onClick={handleReset}>Reset</button>
        </div>
    </div>
  );
}

export default App;
