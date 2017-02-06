function saveUser(user) {
  if (user !== undefined) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }
}

function getUser() {
  const userStr = window.localStorage.getItem('user');
  if (userStr === '' || userStr === null) {
    return '';
  }
  return JSON.parse(userStr);
}

function saveToken(token) {
  window.localStorage.setItem('token', token);
}

function getToken() {
  return window.localStorage.getItem('token') || '';
}

function delUser() {
  window.localStorage.setItem('user', '');
  window.localStorage.setItem('token', '');
}

export default {
  saveUser,
  getUser,
  delUser,
  saveToken,
  getToken,
};
