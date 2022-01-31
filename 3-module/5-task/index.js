function getMinMax(str) {

  str = str.split(" ");

  let onlyNumbers = [];
  
  for(let key of str){
    key = +key;
    if(!isNaN(key)){
      onlyNumbers.push(key);
    }
    };

  let min = Math.min(...onlyNumbers);
  let max = Math.max(...onlyNumbers);
  
  return result = {
    min: min,
    max: max,
  }
};
