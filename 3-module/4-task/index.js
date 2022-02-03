function showSalary(users, age) {
  let namesSalaries = [];

  for(let user of users) {
    if (user.age <= age) {
      namesSalaries.push(`${user.name}, ${user.balance}`);
     }
  };

  return namesSalaries.join("\n");
};
  