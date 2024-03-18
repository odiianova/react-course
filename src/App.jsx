import React from "react";
import { useState } from 'react';

import Header from './components/Header.jsx';
import UserInputs from './components/UserInputs.jsx';
import Results from './components/Results.jsx';

function App() {
  const [inputData, setInputData] = useState({
    initialInvestment: 10000,
    annualInvestment: 300,
    expectedReturn: 5.5,
    duration: 10 
  });


  const inputIsValid = inputData.duration >=1;

  function applyInputData(inputIdentifier, newValue) {
    setInputData( (prevInputData) => {
        return {
          ...prevInputData,
          [inputIdentifier]: +newValue
        }
    });
  }

  return (
    <>
      <Header />
      <UserInputs userInput={inputData} updateInputDate={applyInputData}/>
      {!inputIsValid && (
        <p className="center">Please provide a correct numbers!</p>
      )}
      {inputIsValid && <Results input={inputData}/>}
    </>
  )
}

export default App;
