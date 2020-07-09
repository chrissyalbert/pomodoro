import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export function ChooseWorkTime(props) {
  return ( 
    <Card className="shadow-lg time"> 
      <h3 id="session-label">Set your work interval time</h3>
      <Button id="session-increment" variant="secondary" onClick={props.increaseTime} >Increase Time</Button>
      <h2 id="session-length">{props.minutes}</h2>
      <Button id="session-decrement" variant="secondary" onClick={props.decreaseTime}>Decrease Time</Button>
    </Card>
  );
}

export function ChooseBreakTime(props) {
  return (
    <Card className="shadow-lg time">
      <h3 id="break-label">Set your break interval time</h3>
      <Button id="break-increment" variant="secondary" onClick={props.increaseTime} >Increase Time</Button>
      <h2 id="break-length">{props.minutes}</h2>
      <Button id="break-decrement" variant="secondary" onClick={props.decreaseTime}>Decrease Time</Button>
    </Card>
  );
}