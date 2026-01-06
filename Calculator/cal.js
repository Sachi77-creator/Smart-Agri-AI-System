const display = document.getElementById("display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
let currentValue = "";
let previousValue = "";
let operator = "";
numbers.forEach(button => {
  button.addEventListener("click", () => {
    currentValue += button.textContent;
    display.value = currentValue;
  });
});
operators.forEach(button => {
  button.addEventListener("click", () => {
    if (currentValue === "") return;
    operator = button.dataset.op;
    previousValue = currentValue;
    currentValue = "";
  });
});
equals.addEventListener("click", () => {
  if (previousValue === "" || currentValue === "") return;
  const num1 = parseFloat(previousValue);
  const num2 = parseFloat(currentValue);
  let result;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num2 === 0 ? "Error" : num1 / num2;
      break;
    default:
      return;
  }
  display.value = result;
  currentValue = result.toString();
  previousValue = "";
  operator = "";
});
clear.addEventListener("click", () => {
  currentValue = "";
  previousValue = "";
  operator = "";
  display.value = "";
});
