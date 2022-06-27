import './Home.css';
import Button from './Button';
import Picker from './Picker';
import React, {useEffect, useState, useContext} from 'react';
import { FaTimes } from 'react-icons/fa';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { GrPlay, GrPause, GrStop } from 'react-icons/gr';
import Metronome from '../src/components/metronome-component';
import UserContext from './UserContext';

function Home() {
  const [bpmValue, setBpmValue] = useState(100);
  const [beatsValue, setBeatsValue] = useState(2);
  const [typeValue, setTypeValue] = useState(4);
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  const userContext = useContext(UserContext);

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
  }, [timerOn]) // when timerOn value is changed, useEffect is executed

  const beatsPickerCallback = (bv) => {
    setBeatsValue(bv);
  }
  
  const typePickerCallback = (tv) => {
    setTypeValue(tv);
  }


  const onBpmUpClicked = (threshold) => {
    if (bpmValue < threshold){
      setBpmValue(bpmValue + 1)
    }
  }

  const onBpmDownClicked = (threshold) => {
    if (bpmValue > threshold){
      setBpmValue(bpmValue - 1)
    }
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
      <p>{userContext.username}</p>
      <div className='bpmRow'>
        <Button className='upArrow' onClick={() => onBpmUpClicked(218)} display={upArrow}/>
        <p className='bpm'>{bpmValue}</p>
        <Button className='downArrow' onClick={() => onBpmDownClicked(40)} display={downArrow}/>
      </div>

      <div className='timerRow'>
        <span>{("0" + Math.floor((time / 3600))).slice(-2)}:</span>
        <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
        <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
      </div>

      <Metronome
        tempo={bpmValue}
        beatsPerMeasure={beatsValue}
        render={({
          beatsPerMeasure,
          beat,
          onPlay,
        }) => (
          <div>
            <main>
              {beat}/{beatsValue}
              <div className='timerControlRow'>
                {!timerOn && time === 0 && ( // timer has not started, show only the play button
                  <Button className='timerBtn' onClick={() => { onStartMetronomeClicked(); onPlay(); }} display={playBtn}/>
                )}
                {timerOn && ( // timer has started running, show only the pause button
                  <Button className='timerBtn' onClick={() => { setTimerOn(false); onPlay(); }} display={pauseBtn}/>
                )}
                {!timerOn && time !== 0 && ( // timer is not running and time is not zero, timer started and paused, show play button, stop button is also shown on the right from the next condition
                  <Button className='timerBtn' onClick={() => { onStartMetronomeClicked(); onPlay(); }} display={playBtn}/>
                )}
                {!timerOn && time > 0 && ( // timer is not running and time is greater than 0, show stop button, play button is also shown together from the above condition
                  <Button className='timerBtn' onClick={() => { setTime(0);}} display={stopBtn}/>
                )}
              </div>
            </main>
          </div>
        )}
      />
      <div className='beatsRow'>
        <Picker className='beats-picker' 
                beatsOptions={[...Array(21).keys()].slice(1)}
                typeOptions={[1,2,4,8,16,32]} 
                defaultBeatsValue={beatsValue} 
                defaultTypeValue={typeValue} 
                beatsCallback={beatsPickerCallback}
                typeCallback={typePickerCallback}></Picker>
      </div>
    </div>
  );
}

export default Home;
