import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [output, setOutput] = useState({ years: '--', months: '--', days: '--' });
  const [error, setError] = useState({ day: '', month: '', year: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    validateAndCalculateAge();
  }, [day, month, year]);

  const validateAndCalculateAge = () => {
    const currentDate = new Date();
    const birthDate = new Date(`${year}-${month}-${day}`);
    const currentYear = currentDate.getFullYear();
    let errors = { day: '', month: '', year: '' };
    let hasError = false;

    if (!day) {
      errors.day = 'This field is required';
      hasError = true;
    } else if (day < 1 || day > 31 || isNaN(day)) {
      errors.day = 'Must be a valid day';
      hasError = true;
    }

    if (!month) {
      errors.month = 'This field is required';
      hasError = true;
    } else if (month < 1 || month > 12 || isNaN(month)) {
      errors.month = 'Must be a valid month';
      hasError = true;
    }

    if (!year) {
      errors.year = 'This field is required';
      hasError = true;
    } else if (year > currentYear || isNaN(year)) {
      errors.year = 'Must be in the past';
      hasError = true;
    }

    setError(errors);

    if (hasError) {
      setOutput({ years: '--', months: '--', days: '--' });
      return;
    }

    if (birthDate > currentDate) {
      errors.year = 'Must be in the past';
      setError(errors);
      setOutput({ years: '--', months: '--', days: '--' });
      return;
    }

    const diffTime = Math.abs(currentDate - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365.25);
    const months = Math.floor((diffDays % 365.25) / 30);
    const days = Math.floor((diffDays % 365.25) % 30);

    setOutput({ years, months, days });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    validateAndCalculateAge();
  };

  return (
    <div className="main_container">
      <div className="main_content">
        <div className="input_container">
          <div className={`input_box ${submitted && error.day ? 'error' : ''}`}>
            <label htmlFor="day">Day</label>
            <input
              type="text"
              id="day"
              placeholder="DD"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={submitted && error.day ? 'error' : ''}
            />
            {submitted && error.day && <span className="error_message">{error.day}</span>}
          </div>
          <div className={`input_box ${submitted && error.month ? 'error' : ''}`}>
            <label htmlFor="month">Month</label>
            <input
              type="text"
              id="month"
              placeholder="MM"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={submitted && error.month ? 'error' : ''}
            />
            {submitted && error.month && <span className="error_message">{error.month}</span>}
          </div>
          <div className={`input_box ${submitted && error.year ? 'error' : ''}`}>
            <label htmlFor="year">Year</label>
            <input
              type="text"
              id="year"
              placeholder="YYYY"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className={submitted && error.year ? 'error' : ''}
            />
            {submitted && error.year && <span className="error_message">{error.year}</span>}
          </div>
          <button onClick={handleSubmit} className="submit_button">Submit</button>
        </div>
        <div className="output_container">
          <p><span>{output.years}</span> years</p>
          <p><span>{output.months}</span> months</p>
          <p><span>{output.days}</span> days</p>
        </div>
      </div>
    </div>
  );
};

export default App;