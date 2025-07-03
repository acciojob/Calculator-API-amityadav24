const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(__dirname));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/main.html"));
});

// ----- CONSTANTS -----
const MAX = 1000000;
const MIN = -1000000;

function validateInputs(num1, num2, result) {
  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return { status: "error", message: "Invalid data types" };
  }
  if (num1 < MIN || num2 < MIN || result < MIN) {
    return { status: "error", message: "Underflow" };
  }
  if (num1 > MAX || num2 > MAX || result > MAX) {
    return { status: "error", message: "Overflow" };
  }
  return null;
}

// ----- ADDITION -----
app.post("/add", (req, res) => {
  const { num1, num2 } = req.body;
  const sum = num1 + num2;

  const error = validateInputs(num1, num2, sum);
  if (error) return res.status(400).json(error);

  res.status(200).json({
    status: "success",
    message: "the sum of given two numbers",
    sum: sum,
  });
});

// ----- SUBTRACTION -----
app.post("/sub", (req, res) => {
  const { num1, num2 } = req.body;
  const difference = num1 - num2;

  const error = validateInputs(num1, num2, difference);
  if (error) return res.status(400).json(error);

  res.status(200).json({
    status: "success",
    message: "the difference of given two numbers",
    difference: difference,
  });
});

// ----- MULTIPLICATION -----
app.post("/multiply", (req, res) => {
  const { num1, num2 } = req.body;
  const result = num1 * num2;

  const error = validateInputs(num1, num2, result);
  if (error) return res.status(400).json(error);

  res.status(200).json({
    status: "success",
    message: "The product of given numbers",
    result: result,
  });
});

// ----- DIVISION -----
app.post("/divide", (req, res) => {
  const { num1, num2 } = req.body;

  if (typeof num1 !== "number" || typeof num2 !== "number") {
    return res.status(400).json({
      status: "error",
      message: "Invalid data types",
    });
  }

  if (num2 === 0) {
    return res.status(400).json({
      status: "error",
      message: "Cannot divide by zero",
    });
  }

  const result = num1 / num2;

  const error = validateInputs(num1, num2, result);
  if (error) return res.status(400).json(error);

  res.status(200).json({
    status: "success",
    message: "The division of given numbers",
    result: result,
  });
});

module.exports = app;
