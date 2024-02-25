let userEmail = ""; // Initializing userEmail variable

export const setUserEmail = (email) => {
  // Function to set user email
  userEmail = email; // Setting userEmail to the provided email
};

export const getUserEmail = () => {
  // Function to get user email
  return userEmail; // Returning the userEmail
};
