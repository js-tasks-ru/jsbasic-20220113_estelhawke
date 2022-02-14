export default class UserTable {
  
  newTable = document.createElement("table")
  
  constructor (rows) {
    this.rows = rows;
    this.createTableHead();
  }
  
  createTableHead () {
    let newHtml = `
    <thead>
    <tr>
    <th>Имя</th>
    <th>Возраст</th>
    <th>Зарплата</th>
    <th>Город</th>
    <th></th>
    </tr>
    </thead>
    </tbody> ${this.rows.map((item) =>
    `<tr>
    <td>${item.name}</td>
    <td>${item.age}</td>
    <td>${item.salary}</td>
    <td>${item.city}</td>
    <td><button>X</button></td>
    </tr>`).join('')} </tbody>`;
  
      this.newTable.insertAdjacentHTML('beforeend', newHtml);

      let button = this.newTable.querySelectorAll("button");

      button.forEach((item) => 
        item.addEventListener("click", () => {
        item.closest("tr").remove();
     }));
  
  }

  get elem() {
    return this.newTable;
  }
  
  };