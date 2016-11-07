function saveUser(user) {
  if (user !== undefined) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }
}

function getUser() {
  const user = JSON.parse(window.localStorage.getItem('user'));
  return user || '';
}

function delUser() {
  window.localStorage.setItem('user', '');
}

export default {
  saveUser,
  getUser,
  delUser,
};
