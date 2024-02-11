import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // This function will be called after each render
    const timerId = setTimeout(() => {
      // Decrease the time remaining by 1 second
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup function for useEffect
    return () => {
      // Clear the timeout when the component unmounts or when the timer is reset
      clearTimeout(timerId);
    };
  }, [timeRemaining]); // Include timeRemaining as a dependency

  useEffect(() => {
    // Check if time has run out
    if (timeRemaining === 0) {
      // Reset the timer for the next question
      setTimeRemaining(10);
      // Trigger behavior in the App component by calling onAnswered with a value of false
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]); // Include timeRemaining and onAnswered as dependencies

  function handleAnswer(isCorrect) {
    // Reset the timer when an answer is chosen
    setTimeRemaining(10);
    // Trigger behavior in the App component by calling onAnswered with the correct value
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
