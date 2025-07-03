// Add the Calculator APIs

const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/main.html'));
});

// ----- CALCULATOR LOGIC -----
const LIMIT = 1000000;
const MIN_LIMIT = -1000000;

function validate(num1, num2, result) {
  if (typeof num1 !== 'number' || typeof num2 !== 'number') {
    return { status: "error", message: "Invalid data types" };
  }
  if (num1 > LIMIT || num2 > LIMIT || result > LIMIT) {
    return { status: "error", message: "Overflow" };
  }
  if (num1 < MIN_LIMIT || num2 < MIN_LIMIT || result < MIN_LIMIT) {
    return { status: "error", message: "Underflow" };
  }
  return null;
}

// /add
app.post('/add', (req, res) => {
  const { num1, num2 } = req.body;
  const sum = num1 + num2;
  const error = validate(num1, num2, sum);
  if (error) return res.status(400).json(error);
  res.json({
    status: "success",
    message: "the sum of given two numbers",
    sum
  });
});

// /sub
app.post('/sub', (req, res) => {
  const { num1, num2 } = req.body;
  const difference = num1 - num2;
  const error = validate(num1, num2, difference);
  if (error) return res.status(400).json(error);
  res.json({
    status: "success",
    message: "the difference of given two numbers",
    difference
  });
});

// /multiply
app.post('/multiply', (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 * num2;
  const error = validate(num1, num2, result);
  if (error) return res.status(400).json(error);
  res.json({
    status: "success",
    message: "The product of given numbers",
    result
  });
});

// /divide
app.post('/divide', (req, res) => {
  const { num1, num2 } = req.body;
  if (num2 === 0) {
    return res.status(400).json({
      status: "error",
      message: "Cannot divide by zero"
    });
  }
  const result = num1 / num2;
  const error = validate(num1, num2, result);
  if (error) return res.status(400).json(error);
  res.json({
    status: "success",
    message: "The division of given numbers",
    result
  });
});

// ----- END LOGIC -----

module.exports = app;
