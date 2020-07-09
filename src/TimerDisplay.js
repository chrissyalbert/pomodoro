import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';
// eslint-disable-next-line
import momentDurationFormatSetup from "moment-duration-format";
const alarm = "https://cfa-sounds.s3-us-west-1.amazonaws.com/Mission+Meow.m4a";

export function TimerDisplay(props) {
  let workTimeLeft;
  props.workTime === 0 ? workTimeLeft = new Date(0).toISOString().substring(14,19) : workTimeLeft = moment.duration(props.workTime, "seconds").format("mm:ss");
  let breakTimeLeft;
  props.breakTime === 0 ? breakTimeLeft = new Date(0).toISOString().substring(14,19) : breakTimeLeft = moment.duration(props.breakTime, "seconds").format("mm:ss");

  return (
    <Card className="timer shadow-lg" >
      <div id="timer-label" ><h3>Session: </h3>
      {props.workTimerOn && <h3>Work</h3>}
      {props.breakTimerOn && <h3>Break</h3>}
      </div>
      {props.working && 
      <Button id="start_stop" variant="danger" onClick={props.handleWorkClick} >{props.workTimerOn  ? "Pause Timer" : "Start Timer"}</Button>
      }
      {!props.working && 
      <Button id="start_stop" variant="danger" onClick={props.handleBreakClick} >{props.breakTimerOn  ? "Pause Timer" : "Start Timer"}</Button>
      }
      
      <h2 id="time-left">{props.working ? workTimeLeft : breakTimeLeft}</h2>
      
        <audio
          id="beep"
          src={alarm} >
            Your browser does not support the
            <code>audio</code> element.
         </audio>
      <Button id="reset" variant="danger" onClick={props.reset} >Reset</Button>
      </Card>
  );
}