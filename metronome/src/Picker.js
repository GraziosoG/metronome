import './Picker.css';
import PropTypes from 'prop-types'
import Button from './Button';
import React, {useState} from 'react';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';

const Picker = ({ className, options, defaultValue }) => {
  const musicUnicodes = ['\uE080', '\uE081', '\uE082', '\uE083', '\uE084', '\uE085', '\uE086', '\uE087', '\uE088', '\uE089'];
  const timeTop = '\uE09E';
  const timeMiddle = '\uE09F';
  const [value, setValue] = useState({default: defaultValue, unicode: musicUnicodes[defaultValue]});
  const upArrow = <BiUpArrow/>;
  const downArrow = <BiDownArrow/>;

  const getMusicUnicodes = (num) => {
    if (num < 10){
      return musicUnicodes[num];
    } else {
      let strValue = num.toString();
      let firstNum = parseInt(strValue[0]);
      let secondNum = parseInt(strValue[1]);
      return musicUnicodes[firstNum] + musicUnicodes[secondNum];
    }
  }

  const onPickerUpClicked = () => {
    let numToShow = options[(options.indexOf(value.default) + 1) % options.length];
    setValue({default: numToShow, unicode: getMusicUnicodes(numToShow)});
  }

  const onPickerDownClicked = () => {
    if (options.indexOf(value.default) === 0){
      let numToShow = options[options.length - 1]
      setValue({default: numToShow, unicode: getMusicUnicodes(numToShow)})
    } else {
      let numToShow = options[(options.indexOf(value.default) - 1) % options.length]
      setValue({default: numToShow, unicode: getMusicUnicodes(numToShow)})
    }
  }

  return (
    <div className={className}>
        <Button className='upArrow' onClick={onPickerUpClicked} display={upArrow}/>
        <span className='picker-span'>{value.unicode}</span>
        <Button className='downArrow' onClick={onPickerDownClicked} display={downArrow}/>
    </div>
  )
}

Picker.defaultProps = {
}

Picker.propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    defaultValue: PropTypes.number,
}

export default Picker