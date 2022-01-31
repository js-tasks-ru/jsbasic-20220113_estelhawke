function namify(users) { 

  let namesUsers = []; 

  for (let user of users) {
    if(user.name){
      namesUsers.push(user.name);
    };
  }

   return namesUsers;
};
