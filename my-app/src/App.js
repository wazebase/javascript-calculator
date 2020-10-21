import React, {useEffect, useState } from 'react';
import './App.css';
import "./grid.css";
function App() {
  return (
    <Calculator />
  );
}


const Calculator = () => {
  const [equation, setEquation] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isEqualised, setIsEqualised] = useState(false);
  const handleNumber = (number) => {
    if (isEqualised === true || equation === null) {
      setCurrent(number);
      setEquation(number);
      setIsEqualised(false);
    }
    else if (/\d/.test(current) === false) {
      setCurrent(number);
      setEquation(equation + number);
    }
    else {
      setCurrent(current + number);
      setEquation(equation + number);
    }
  }
  const handleOperator = (operator) => {
    if (isEqualised === true) {
      setEquation(current + operator);
      setIsEqualised(false);
    }
    else if(/\D\D$/.test(equation) === true) {
      setEquation(equation.slice(0,-2) + operator);
    }
    else if(/\d/.test(current) === false && /-/.test(operator)===false || 
 /-/.test(operator)===true && /-/.test(current) === true) {
      setEquation(equation.slice(0,-1) + operator);
    }
    else {
      setEquation(equation + operator);
    }
    setCurrent(operator);
  }
  const handleClear = () => {
    setCurrent(0);
    setEquation(null);
    setIsEqualised(false);
  }
  const handleDecimal = () => {
    if(isEqualised ===true) {
    setIsEqualised(false);
    }
    if(/\.\d*/.test(current) === true) {
      return null;
    }
    else {
    setCurrent(current + ".");
    setEquation(equation + ".");
    }
  }
  const handleEquals = () => {
    let result = eval(equation);
    setCurrent(result);
    setEquation(equation + "=" + result);
    setIsEqualised(true);
  
  }
  useEffect(()=> {
    let display = document.getElementById("display");
    if(isEqualised===true) {
    display.style.color= "rgb(167, 219, 24)";
    display.style.border ="2px solid rgb(167, 219, 24)"; 
    }
    else {
      display.style.color= "white";
      display.style.border ="2px solid rgba(255, 255, 255, 0.44)"; 
    }
  },[isEqualised])
   
  
  return (
    <div>
      <div id="calculator">
        <div id="display">
        <div id="equation">{equation}</div>
        <div id="result">{current}</div>
        </div>
        <div id="operator-row">
          <button id="clear" onClick={handleClear}>AC</button>
          <button id="divide" onClick={() => handleOperator("/")}>/</button>
          <button id="multiply" onClick={() => handleOperator("*")}>X</button>
        </div>
        <div id="operator-column">
          <button id="subtract" onClick={() => handleOperator("-")}>-</button>
          <button id="add" onClick={() => handleOperator("+")}>+</button>
          <button id="equals" onClick={handleEquals}>=</button>
        </div>
        <div id="numbers">
          <button id="seven" onClick={() => { handleNumber("7") }}>7</button>
          <button id="eight" onClick={() => { handleNumber("8") }}>8</button>
          <button id="nine" onClick={() => { handleNumber("9") }}>9</button>
          <button id="four" onClick={() => { handleNumber("4") }}>4</button>
          <button id="five" onClick={() => { handleNumber("5") }}>5</button>
          <button id="six" onClick={() => { handleNumber("6") }}>6</button>
          <button id="one" onClick={() => { handleNumber("1") }}>1</button>
          <button id="two" onClick={() => { handleNumber("2") }}>2</button>
          <button id="three" onClick={() => { handleNumber("3") }}>3</button>
          <button id="zero" onClick={() => current !== 0 ? handleNumber("0") : null}>0</button>
          <button id="decimal" onClick={handleDecimal}>.</button>
        </div>
      </div>
      <footer id="signed">designed and coded by <br></br>
        <p>Nikita Menkov</p></footer>
      </div>

  );
}
export default App;
