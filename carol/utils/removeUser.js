module.exports = (users, socketId) => {
  const user = users.find(({id}) => id === socketId);
  delete user.id;
  user.isOnline = false;
  user.lastActive = new Date().toLocaleString();
  return users.filter(({id}) => id !== socketId);
}