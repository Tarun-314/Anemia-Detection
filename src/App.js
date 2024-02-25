import "./App.css"; // Importing CSS file for styling
import AuthDetails from "./components/auth/AuthDetails"; // Importing AuthDetails component

function App() {
  return (
    <div className="App">
      {/* Root component with class name "App" */}
      <AuthDetails /> {/* Rendering AuthDetails component */}
    </div>
  );
}

export default App; // Exporting the App component as default
