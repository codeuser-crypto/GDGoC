import React from "react";
import Quiz from "./Quiz";
import "./App.css"; // Assuming you have a CSS file for styling

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Welcome to the Quiz App</h1>
        <p>Test your knowledge and have fun!</p>
      </header>
      <main className="quiz-section">
        <Quiz />
      </main>
      <footer className="app-footer">
        <p>&copy; 2025 Quiz App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
