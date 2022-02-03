function makeFriendsList (friends) {
  let newUl = document.createElement("ul");
  
  for (let friend of friends){
    let newLi = document.createElement("li");
    newUl.appendChild(newLi);
    newLi.innerHTML = `${friend.firstName} ${friend.lastName}`;
   }
   return newUl;
};

