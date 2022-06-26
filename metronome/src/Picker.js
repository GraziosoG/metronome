import './Picker.css';
import PropTypes from 'prop-types'
import Button from './Button';
import React, {useState} from 'react';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import {getMusicUnicodes} from './utils/GetTimeSignatureNumber';

const Picker = ({ className, beatsOptions, typeOptions, defaultBeatsValue, defaultTypeValue, beatsCallback, typeCallback }) => {
  
  const [beatsValue, setBeatsValue] = useState({value: defaultBeatsValue, unicode: getMusicUnicodes(defaultBeatsValue)});
  const [typeValue, setTypeValue] = useState({value: defaultTypeValue, unicode: getMusicUnicodes(defaultTypeValue)});
  const upArrow = <BiUpArrow/>;
  const downArrow = <BiDownArrow/>;

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

  return (
    <div className={className}>
        <Button className='upArrow' onClick={() => onPickerUpClicked(beatsOptions, setBeatsValue, beatsValue, beatsCallback)} display={upArrow}/>
        <span className='picker-span'>{beatsValue.unicode}</span>
        <Button className='downArrow' onClick={() => onPickerDownClicked(beatsOptions, setBeatsValue, beatsValue, beatsCallback)} display={downArrow}/>

        <Button className='upArrow' onClick={() => onPickerUpClicked(typeOptions, setTypeValue, typeValue, typeCallback)} display={upArrow}/>
        <span className='picker-span'>{typeValue.unicode}</span>
        <Button className='downArrow' onClick={() => onPickerDownClicked(typeOptions, setTypeValue, typeValue, typeCallback)} display={downArrow}/>
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