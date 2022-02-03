function highlight(table) {
  
  let rowLength = table.rows.length;
 
  for(let index = 1; index < rowLength; index++) { 
   let cellAge = table.rows[index].cells[1].innerText;

   if(cellAge < 18) {
     table.rows[index].style.textDecoration = "line-through";
   };

   let cellSex = table.rows[index].cells[2].innerText;

   cellSex === 'f' ? table.rows[index].classList.add("female") : table.rows[index].classList.add("male");

   let attrAvailable =  table.rows[index].cells[3].dataset.available;

   attrAvailable === "true" ?  table.rows[index].classList.add("available") : table.rows[index].classList.add("unavailable");

   if (attrAvailable === undefined ) {
     table.rows[index].setAttribute('hidden', 'true');
    }
  }
};

