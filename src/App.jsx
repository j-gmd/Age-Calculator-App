import React, { useState, useEffect } from 'react';
import './App.css';
import iconArrow from "./assets/images/icon-arrow.svg"

// Este componente renderiza um campo de entrada com validação de erro
const InputBox = ({ id, placeholder, value, onChange, error, submitted }) => (
  <div className={`input_box ${submitted && error ? 'error' : ''}`}>
    <label htmlFor={id}>{id}</label>
    <input
      type="text"
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={submitted && error ? 'error' : ''}
    />
    <div className="error_message_container">
      {submitted && error && <span className="error_message">{error}</span>}
    </div>
  </div>
);


const App = () =>
  {
    // Define o estado inicial para dia, mês, ano, saída e erro
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [output, setOutput] = useState({ years: '--', months: '--', days: '--' });
    const [error, setError] = useState({ day: '', month: '', year: '' });
    const [submitted, setSubmitted] = useState(false);
  
    // Chama validateAndCalculateAge sempre que day, month ou year mudam
    useEffect(() =>
    {
      validateAndCalculateAge();
    }, [day, month, year]);
  
    // Valida os campos de entrada e calcula a idade
    const validateAndCalculateAge = () =>
    {
      // Cria objetos de data para a data atual e a data de nascimento
      const currentDate = new Date();
      const birthDate = new Date(`${year}-${month}-${day}`);
      const currentYear = currentDate.getFullYear();
      let errors = { day: '', month: '', year: '' };
      let hasError = false;
      let isBissextile = ((year%4===0) && (year%100 !== 0) || year % 400 === 0);
  
      // Valida o campo do dia
      // Valida o campo do dia
      // Valida o campo do dia
      if (!day) {
        errors.day = 'This field is required';
        hasError = true;
      } else {
          // Verifica se o dia é um número entre 1 e 31
          if (day < 1 || day > 31 || isNaN(day)) {
            errors.day = 'Must be a valid day';
            hasError = true;
          }

          // Verifica se o mês é fevereiro e se o dia é maior que 28 (para anos não bissextos)
          else if (month == 2 && day > 28 && !isBissextile) {
            errors.day = 'Must be a valid day';
            hasError = true;
          }

          // Verifica se o mês é fevereiro e se o dia é maior que 29 (para anos bissextos)
          else if (month == 2 && day > 29 && isBissextile) {
            errors.day = 'Must be a valid day';
            hasError = true;
          }

          // Verifica se o mês tem 30 dias e se o dia é maior que 30
          else if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) {
            errors.day = 'Must be a valid day';
            hasError = true;
          }
      }
  
      // Valida o campo do mês
      if (!month)
      {
        errors.month = 'This field is required';
        hasError = true;
      } else if (month < 1 || month > 12 || isNaN(month))
      {
        errors.month = 'Must be a valid month';
        hasError = true;
      }
  
      // Valida o campo do ano
      if (!year)
      {
        errors.year = 'This field is required';
        hasError = true;
      } else if (year > currentYear || isNaN(year))
      {
        errors.year = 'Must be in the past';
        hasError = true;
      }
  
      setError(errors);
  
      // Se houver um erro, limpa a saída e retorna
      if (hasError)
      {
        setOutput({ years: '--', months: '--', days: '--' });
        return;
      }
  
      // Se a data de nascimento for no futuro, define um erro e retorna
      if (birthDate > currentDate)
      {
        errors.year = 'Must be in the past';
        setError(errors);
        setOutput({ years: '--', months: '--', days: '--' });
        return;
      }
  
      // Calcula a diferença de tempo entre a data atual e a data de nascimento
      const diffTime = Math.abs(currentDate - birthDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30) ;
      const days = Math.floor((diffDays % 365) % 30);

      // Define a saída para a diferença de tempo calculada
      setOutput({ years, months, days });
    };
  
    // Define submitted para true e chama validateAndCalculateAge quando o formulário é enviado
    const handleSubmit = () =>
    {
      setSubmitted(true);
      validateAndCalculateAge();
    };
  
    // Renderiza o formulário e a saída
    return (
      <div className="main_content">
        <div className="input_container">

          <InputBox 
            id="DAY" 
            placeholder="DD" 
            value={day} 
            onChange={(e) => setDay(e.target.value)} 
            error={error.day} 
            submitted={submitted} 
          />

          <InputBox 
            id="MONTH"
            placeholder="MM" 
            value={month} 
            onChange={(e) => setMonth(e.target.value)} 
            error={error.month} 
            submitted={submitted} 
          />

          <InputBox 
            id="YEAR" 
            placeholder="YYYY" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            error={error.year} 
            submitted={submitted}
          />
          
        </div>
        <div className='submit_container'>
          <hr className='line'/>
          <button onClick={handleSubmit} className="submit_button">
            <img src={iconArrow} alt="submit-image"/>
          </button>
        </div>
        <div className="output_container">
          <span> <span className='output'>{output.years}</span> years</span> 
          <span> <span className='output'>{output.months}</span> months</span>
          <span> <span className='output'>{output.days} </span> days</span>
        </div>
      </div>
    );
  };
  
  export default App;