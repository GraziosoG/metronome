import './Picker.css';
import PropTypes from 'prop-types'
import Button from './Button';
import React, {useState} from 'react';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import {getMusicUnicodes, musicUnicodes} from './utils/GetTimeSignatureNumber';

const Picker = ({ className, beatsOptions, typeOptions, defaultBeatsValue, defaultTypeValue, beatsCallback, typeCallback }) => {
  const [beatsValue, setBeatsValue] = useState({value: defaultBeatsValue, unicode: musicUnicodes[defaultBeatsValue]});
  const [typeValue, setTypeValue] = useState({value: defaultTypeValue, unicode: musicUnicodes[defaultTypeValue]});
  const upArrow = <BiUpArrow/>;
  const downArrow = <BiDownArrow/>;
  const [isOpen, setIsOpen] = useState(false);

  const onPickerUpClicked = (options, setValue, value, callback) => {
    let numToShow = options[(options.indexOf(value.value) + 1) % options.length];
    setValue({value: numToShow, unicode: getMusicUnicodes(numToShow)});
    callback(numToShow)
  }

  const onPickerDownClicked = (options, setValue, value, callback) => {
    let numToShow = 0;
    if (options.indexOf(value.value) === 0){
      numToShow = options[options.length - 1]
      setValue({value: numToShow, unicode: getMusicUnicodes(numToShow)})
    } else {
      numToShow = options[(options.indexOf(value.value) - 1) % options.length]
      setValue({value: numToShow, unicode: getMusicUnicodes(numToShow)})
    }
    callback(numToShow)
  }
  
  const onPickerChangeClicked = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={className}>
      <div className="picker-container">
        <div className={isOpen ? 'visible' : 'gone' + " beats-picker"}>
          <Button className='upArrow' onClick={() => onPickerUpClicked(beatsOptions, setBeatsValue, beatsValue, beatsCallback)} display={upArrow}/>
          <Button className='downArrow' onClick={() => onPickerDownClicked(beatsOptions, setBeatsValue, beatsValue, beatsCallback)} display={downArrow}/>
        </div>
        <div className="timesignature-row" onClick={onPickerChangeClicked}>
          <span className='picker-span beats-span' >{beatsValue.unicode}</span>
          <span className='picker-span type-span'>{typeValue.unicode}</span>
        </div>
        <div className={isOpen ? 'visible' : 'gone' + " type-picker"}>
          <Button className='upArrow' onClick={() => onPickerUpClicked(typeOptions, setTypeValue, typeValue, typeCallback)} display={upArrow}/>
          <Button className='downArrow' onClick={() => onPickerDownClicked(typeOptions, setTypeValue, typeValue, typeCallback)} display={downArrow}/>
        </div>
      </div>
    </div>
  )
}

Picker.defaultProps = {
}

Picker.propTypes = {
    className: PropTypes.string,
    beatsOptions: PropTypes.array,
    typeOptions: PropTypes.array,
    defaultBeatsValue: PropTypes.number,
    defaultTypeValue: PropTypes.number,
    callback: PropTypes.func,
}

export default Picker