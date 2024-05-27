import React, { useState } from 'react';
import "./App.css";

function App() {
  const [calcDisplay, setCalcDisplay] = useState("0");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (validateInput(inputValue)) {
      setCalcDisplay(inputValue);
    }
  };

  const validateInput = (input) => {
    const regex = /^[\d.()+\-*/%]*$/;
    return regex.test(input);
  };

  const handleButtonClick = (value) => {
    if (value === "c") {
      setCalcDisplay("0");
    } else if (value === "=") {
      evaluateExpression(calcDisplay);
    } else {
      if (calcDisplay === "0" || calcDisplay === "Error") {
        setCalcDisplay(value);
      } else {
        setCalcDisplay(calcDisplay + value);
      }
    }
  };

  const evaluateExpression = (exp) => {
    if (!validateInput(exp)) {
      setCalcDisplay("Error: Entrada inválida");
      return;
    }

    // Reemplazar porcentajes con multiplicación
    exp = replacePercentages(exp);

    try {
      const result = eval(exp);
      setCalcDisplay(result.toString());
    } catch (error) {
      setCalcDisplay("Error: Operación inválida");
    }
  };

  const replacePercentages = (exp) => {
    // Utilizar regex para encontrar y reemplazar porcentajes con la operación correcta
    const regex = /(\d+\.?\d*)%/g;
    return exp.replace(regex, (match, p1) => {
      const number = parseFloat(p1);
      const percent = number / 100;
      const result = number * percent;  // Calcula el valor del porcentaje
      return result.toFixed(2);  // Redondea y devuelve como cadena con dos decimales
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      evaluateExpression(calcDisplay);
    }
    if (e.key === "C" || e.key === "c") {
      setCalcDisplay("0");
    }
  };

  return (
    <>
      <div className='help'>
        <h3>Ayuda</h3>
        <ol>
          <li>Para usar el teclado numérico, <strong>haz clic en el display</strong></li>
          <li>Presiona la tecla "C" o "c" para limpiar el display</li>
          <li>Presiona Enter para calcular</li>
        </ol>
      </div>
  
      <div className='wrapper'> 
        <section className='screen'>
          <input className='calc-display' 
                 type='text'
                 value={calcDisplay}
                 onChange={handleInputChange}
                 onKeyDown={handleKeyDown} />
        </section>
         
        <section className='keypad'>
          <div className='calc-button-row'>
              <button className='calc-button' onClick={() => handleButtonClick("7")}>7</button>
              <button className='calc-button' onClick={() => handleButtonClick("8")}>8</button>
              <button className='calc-button' onClick={() => handleButtonClick("9")}>9</button>
              <button className='calc-button' onClick={() => handleButtonClick("*")}>*</button>
            </div>
  
            <div className='calc-button-row'>
              <button className='calc-button' onClick={() => handleButtonClick("4")}>4</button>
              <button className='calc-button' onClick={() => handleButtonClick("5")}>5</button>
              <button className='calc-button' onClick={() => handleButtonClick("6")}>6</button>
              <button className='calc-button' onClick={() => handleButtonClick("/")}>/</button>
            </div>
  
            <div className='calc-button-row'>
              <button className='calc-button' onClick={() => handleButtonClick("1")}>1</button>
              <button className='calc-button' onClick={() => handleButtonClick("2")}>2</button>
              <button className='calc-button' onClick={() => handleButtonClick("3")}>3</button>
              <button className='calc-button' onClick={() => handleButtonClick("+")}>+</button>
            </div>
  
            <div className='calc-button-row'>
              <button className='calc-button' onClick={() => handleButtonClick("0")}>0</button>
              <button className='calc-button' onClick={() => handleButtonClick("=")}>=</button>
              <button className='calc-button clear' onClick={() => handleButtonClick("c")}>c</button>
              <button className='calc-button' onClick={() => handleButtonClick("-")}>-</button>
          </div>
          <div className='calc-button-row'>
              <button className='calc-button' onClick={() => handleButtonClick("00")}>00</button>
              <button className='calc-button' onClick={() => handleButtonClick("000")}>000</button>
              <button className='calc-button' onClick={() => handleButtonClick(".")}>.</button>
              <button className='calc-button' onClick={() => handleButtonClick("%")}>%</button>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
