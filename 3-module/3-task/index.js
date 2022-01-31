function camelize(str) {
  let array = str.split("");
 
   for (let key in array){ 
   if(array.includes("-")){
     let upper = (array.indexOf("-"));
     let upperNew = (array.indexOf("-")  +  1);
     upperTwo = array[upperNew].toUpperCase();
     array.splice(upperNew, 1, upperTwo);
     array.splice(upper, 1);
   }
   };

  return string=array.join("");
 }
 