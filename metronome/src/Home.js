import './Home.css';
import Button from './Button';
import React, {useState} from 'react';
import { BiMenu, BiUpArrow, BiDownArrow, BiPlay, BiPause, BiStop } from 'react-icons/bi';


function Home() {
  const [bpmValue, setBpmValue] = useState(100);
  const [timerValue, setTimerValue] = useState(0);

  const onUpClicked = () => {
    setBpmValue(bpmValue + 1);
  }

  const onDownClicked = () => {
    setBpmValue(bpmValue - 1);
  }

  const upArrow = <BiUpArrow/>;
  const downArrow = <BiDownArrow/>;
  const stopBtn = <BiStop/>;
  const playBtn = <BiPlay/>;
  const pauseBtn = <BiPause/>;
  
  return (
    <div className='container'>
      <Button className='greenButton' display='Add'/>
      <Button display='Del'/>
      
      <div className='bpmRow'>
        <Button className='upArrow' onClick={onUpClicked} display={upArrow}/>
        <p className='bpm'>{bpmValue}</p>
        <Button className='downArrow' onClick={onDownClicked} display={downArrow}/>
      </div>

      <div className='timerRow'>
        <p className='timer'>{timerValue}</p>
      </div>

      <div className='timerControlRow'>
        <Button className='timerBtn' onClick={onUpClicked} display={stopBtn}/>
        <Button className='timerBtn' onClick={onDownClicked} display={playBtn}/>
        <Button className='timerBtn' onClick={onDownClicked} display={pauseBtn}/>
      </div>
    </div>
  );
}

export default Home;
