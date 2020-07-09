import React, {useState, useEffect} from 'react';
import moment from 'moment';

import Container from 'react-bootstrap/Container';
import CardDeck from 'react-bootstrap/CardDeck';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {TimerDisplay} from '../src/TimerDisplay';
import {ChooseWorkTime, ChooseBreakTime} from '../src/ChangeTime';
import './App.css';
import './scss/_variables.scss';



function App(props) {
  const work= moment.duration({'minutes': 25});
  const breaker = moment.duration({'minutes': 5});
  
  const [workTime, setWorkTime] = useState(work.minutes());
  const [workSeconds, setWorkSeconds] = useState(work.asSeconds());
  const [breakTime, setBreakTime] = useState(breaker.minutes());
  const [breakSeconds, setBreakSeconds] = useState(breaker.asSeconds());
  
  const [working, setWorking] = useState(true);
  const [workTimerOn, setWorkTimerOn] = useState(false);
  const [breakTimerOn, setBreakTimerOn] = useState(false);
  const [alarmOn, setAlarmOn] = useState(false);
  
  function changeWork(changer) {
    if (changer === "increase" && workTime < 60) {
      setWorkTime(workTime => workTime + 1);
    } else if (changer === "decrease" && workTime > 1) {
      setWorkTime(workTime => workTime - 1)
    } else {
      return;
    }
  }
  
  function changeBreak(changer) {
    if (changer === "increase" && breakTime < 60) {
      setBreakTime(breakTime => breakTime + 1);
    } else if (changer === "decrease" && breakTime > 1) {
      setBreakTime(breakTime => breakTime - 1)
    } else {
      return;
    }
  }
  function resetSound() {
    let sound = document.getElementById("beep");
    sound.pause();
    sound.load();
  }
 
  function reset() {
    resetSound();
    setWorkTime(work.minutes());
    setWorkSeconds(work.asSeconds());
    setBreakTime(breaker.minutes());
    setBreakSeconds(breaker.asSeconds());
    setAlarmOn(false);
    setWorkTimerOn(false);
    setBreakTimerOn(false);
    setWorking(true);
  }
  
  function switchTimers() {
    if (workTimerOn) {
      let minutes = moment.duration({"minutes": breakTime});
      setBreakSeconds(breakSeconds => minutes.asSeconds());
      setWorkTimerOn(false);
      setBreakTimerOn(true);
    } else if (breakTimerOn){
      let minutes = moment.duration({"minutes": workTime});
      setWorkSeconds(workSeconds => minutes.asSeconds());
      setWorkTimerOn(true);
      setBreakTimerOn(false);
    }
  }
  
  function playSound() {
    let sound = document.getElementById("beep");
      sound.load();
      sound.play();
  }
  
  function handleWorkClick() {
    setWorkTimerOn(!workTimerOn);
  }
  
  function handleBreakClick() {
    setBreakTimerOn(!breakTimerOn);
  }
  
  useEffect(() => {
    if (workTime <= 0) {
      setWorkTime(1);
    } else if (workTime > 60) {
      setWorkTime(60);
    }
    let minutes = moment.duration({"minutes": workTime});
    setWorkSeconds(workSeconds => minutes.asSeconds());
  }, [workTime]);
  
  useEffect(() => {
    if (breakTime <= 0 ) {
      setBreakTime(1);
    } else if (breakTime > 60) {
      setBreakTime(60);
    }
    let minutes = moment.duration({"minutes": breakTime});
    setBreakSeconds(breakSeconds => minutes.asSeconds());
  }, [breakTime]);

  useEffect(() => {
    let workInterval = null;
    if (workTimerOn && workSeconds > 0) {
      workInterval = setInterval(() => {
        setWorkSeconds(workSeconds => workSeconds - 1);
      }, 1000);
    }  else if (workSeconds === 0) {
      clearInterval(workInterval);
    }
    return () => clearInterval(workInterval);
  }, [workTimerOn, workSeconds]);
  
  useEffect(() => { 
    let breakInterval = null;
    if (breakTimerOn  && breakSeconds > 0) {
      breakInterval = setInterval(() => {
        setBreakSeconds(breakSeconds => breakSeconds - 1);
      }, 1000);
    } else if (breakSeconds === 0) {
      clearInterval(breakInterval);
    }
    return () => clearInterval(breakInterval);
  }, [breakTimerOn, breakSeconds]);
  
  useEffect(() => {
    if (workSeconds === 0) {
      setAlarmOn(true);
      setWorking(false);
    }
  }, [workSeconds]);
  
  useEffect(() => {
    if (breakSeconds === 0) {
      setAlarmOn(true);
      setWorking(true);
    }
  }, [breakSeconds]);
  
  useEffect(() => {
    if (alarmOn) {
      playSound();
    }
    return () => {
      switchTimers();
      setAlarmOn(false);
    }
     // eslint-disable-next-line
  }, [alarmOn])
  
  return (
  <Container fluid className="app bg-gradient-info">
      <Row>
        <Col md={10} className="offset-md-1" >
          <h1 className="m-4">Pomodoro Timer</h1>
          <CardDeck className="deck">
              <ChooseWorkTime  
                increaseTime={() => changeWork("increase")} 
                decreaseTime={() => changeWork("decrease")}  
                minutes={workTime} 
                />
              <TimerDisplay 
                workTime={workSeconds}
                breakTime={breakSeconds}
                handleWorkClick={handleWorkClick} 
                handleBreakClick={handleBreakClick}
                workTimerOn={workTimerOn} 
                breakTimerOn={breakTimerOn}
                reset={reset}
                working={working}
                />
              <ChooseBreakTime  
                increaseTime={() => changeBreak("increase")} 
                decreaseTime={() => changeBreak("decrease")}  
                minutes={breakTime} 
                />
          </CardDeck>
          <div id="credits">Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </Col>
      </Row>
      
  </Container>
  );
}

export default App;
