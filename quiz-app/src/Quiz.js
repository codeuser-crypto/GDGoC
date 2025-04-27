import React, { useState } from "react";
import "./Quiz.css";

const questions = [
  {
    questionText: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris",
  },
  {
    questionText: "Which language is used for web apps?",
    options: ["Python", "Java", "PHP", "All"],
    answer: "All",
  },
  {
    questionText: "Who is the CEO of Tesla?",
    options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Tony Stark"],
    answer: "Elon Musk",
  },
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [feedback, setFeedback] = useState("");
  const [answered, setAnswered] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    if (!selectedOption) {
      setFeedback("Please select an option!");
      return;
    }

    if (!answered) {
      if (selectedOption === questions[currentQuestion].answer) {
        setScore((prev) => prev + 1);
        setFeedback("Correct!");
      } else {
        setFeedback(`Wrong! Correct answer: ${questions[currentQuestion].answer}`);
      }
      setAnswered(true);
      return;
    }

    setSelectedOption("");
    setFeedback("");
    setAnswered(false);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption("");
    setFeedback("");
    setAnswered(false);
  };

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>
            {score === questions.length
              ? "🎉 Congratulations! Perfect Score!"
              : `You scored ${score} out of ${questions.length}`}
          </h2>
          <button onClick={handleRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <>
          <div className="progress-bar-container">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="question-section">
            <h2>Question {currentQuestion + 1}/{questions.length}</h2>
            <p>{questions[currentQuestion].questionText}</p>
          </div>
          <div className="options-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? "selected" : ""}`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="feedback-section">
            {feedback && (
              <p className={feedback.includes("Correct") ? "correct" : "incorrect"}>
                {feedback}
              </p>
            )}
          </div>
          <button className="next-button" onClick={handleNextQuestion}>
            {answered
              ? currentQuestion === questions.length - 1
                ? "Finish"
                : "Next"
              : "Submit"}
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;