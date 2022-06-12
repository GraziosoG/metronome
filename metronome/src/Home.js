import './Home.css';
import Button from './Button';
import React, {useEffect, useState} from 'react';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { GrPlay, GrPause, GrStop } from 'react-icons/gr';
import Metronome from '../src/components/metronome-component';

function Home() {
  const [bpmValue, setBpmValue] = useState(120);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timerOn])

  const onUpClicked = () => {
    setBpmValue(bpmValue + 1);
  }

  const onDownClicked = () => {
    setBpmValue(bpmValue - 1);
  }

  const onStartMetronomeClicked = () => {
    setTimerOn(true);
  }

  const upArrow = <BiUpArrow/>;
  const downArrow = <BiDownArrow/>;
  const playBtn = <GrPlay/>;
  const pauseBtn = <GrPause/>;
  const stopBtn = <GrStop/>;
  
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
        <span>{("0" + Math.floor((time / 3600))).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
      </div>

      <Metronome
        tempo={bpmValue}
        render={({
          tempo,
          beatsPerMeasure,
          playing,
          beat,
          subdivision,
          onPlay,
          onBpmChange,
        }) => (
          <div>
            <main>
              {beat}/{beatsPerMeasure}
              <div className='timerControlRow'>
                {!timerOn && time === 0 && (
                  <Button className='timerBtn' onClick={() => { onStartMetronomeClicked(); onPlay(); }} display={playBtn}/>
                )}
                {timerOn && (
                  <Button className='timerBtn' onClick={() => { setTimerOn(false); onPlay(); }} display={pauseBtn}/>
                )}
                {!timerOn && time !== 0 && (
                  <Button className='timerBtn' onClick={() => { onStartMetronomeClicked(); onPlay(); }} display={playBtn}/>
                )}
                {!timerOn && time > 0 && (
                  <Button className='timerBtn' onClick={() => { setTime(0); onPlay();}} display={stopBtn}/>
                )}
              </div>
            </main>
          </div>
        )}
      />

        <p className="beats">{'\uE083'}</p>
    </div>
  );
}

export default Home;
