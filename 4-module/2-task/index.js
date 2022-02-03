function makeDiagonalRed(table) { 
  let rowsNumber = table.rows.length;
  
  for(index = 0; index < rowsNumber ;  index++ ) {
    table.rows[index].cells[index].style.backgroundColor =  "red";
  }   
};


