export const musicUnicodes = ['\uE080', '\uE081', '\uE082', '\uE083', '\uE084', '\uE085', '\uE086', '\uE087', '\uE088', '\uE089'];

export function getMusicUnicodes(num){
    if (num < 10){
      return musicUnicodes[num];
    } else {
      let strValue = num.toString();
      let firstNum = parseInt(strValue[0]);
      let secondNum = parseInt(strValue[1]);
      return musicUnicodes[firstNum] + musicUnicodes[secondNum];
    }
  }