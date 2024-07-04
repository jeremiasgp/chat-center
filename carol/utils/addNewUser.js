module.exports = (users, allUsers, id) => {
  const user = users.find(({isOnline}) => !isOnline);
  user.id = id;
  user.isOnline = true;
  return [...users]
}