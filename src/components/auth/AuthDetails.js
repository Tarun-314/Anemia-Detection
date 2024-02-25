import { onAuthStateChanged } from "firebase/auth"; // Importing function to listen for authentication state changes from Firebase
import SignIn from "./SignIn"; // Importing SignIn component
import SignUp from "./SignUp"; // Importing SignUp component
import Routing from "../Pages/Routes"; // Importing Routing component
import React, { useEffect, useState } from "react"; // Importing React and its hooks
import { auth } from "../../firebase"; // Importing authentication instance from Firebase
import { setUserEmail } from "./UserEmail"; // Importing function to set user's email

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null); // State variable to store authenticated user

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      // Listening for authentication state changes
      if (user) {
        setAuthUser(user); // Setting the authenticated user
        const userEmail = user.email; // Get user's email
        setUserEmail(userEmail); // Setting user's email using custom function
      } else {
        setAuthUser(null); // If no user is authenticated, set authUser to null
      }
    });

    return () => {
      listen(); // Cleaning up the listener when component unmounts
    };
  }, []); // This effect runs once on component mount

  const [page, setPage] = useState(false); // State variable to manage current page
  const updateState = () => {
    setPage(!page); // Function to toggle page state
  };

  useEffect(() => {}, [page]); // This effect does not have any functionality and runs when `page` state changes

  return (
    <div>
      {authUser ? ( // Rendering Routing component if user is authenticated
        <Routing />
      ) : page ? ( // Rendering SignUp component if page state is true
        <SignUp updateState={updateState} />
      ) : (
        // Rendering SignIn component if user is not authenticated and page state is false
        <SignIn updateState={updateState} />
      )}
    </div>
  );
};

export default AuthDetails;
