// userEmail.js
let userEmail = "";

export const setUserEmail = (email) => {
  userEmail = email;
};

export const getUserEmail = () => {
  return userEmail;
};
