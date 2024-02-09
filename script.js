function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, firstNumber, secondNumber) {
  switch (operator) {
    case '+':
      return add(firstNumber, secondNumber);
    case '-':
      return subtract(firstNumber, secondNumber);
    case '*':
      return multiply(firstNumber, secondNumber);
    case '/':
      return divide(firstNumber, secondNumber);
  }
}

let nextValue = '';
let firstNumber = null;
let operator = null;
let secondNumber = null;

const display = document.querySelector('.display');
display.textContent = '0';
const numbers = document.querySelectorAll('.numbers button');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');
const clear = document.querySelector('#clear');
const deleteBtn = document.querySelector('#delete');
const dot = document.querySelector('#dot');

function populateDisplay(number) {
  nextValue += number;
  display.textContent = nextValue;
}

function depopulateDisplay() {
  if (nextValue.length > 0) {
    if (nextValue[nextValue.length - 1] === '.') {
      nextValue = nextValue.substring(0, nextValue.length - 2);
    } else {
      nextValue = nextValue.substring(0, nextValue.length - 1);
    }
    display.textContent = nextValue || 0;
  }
}

function getResult() {
  secondNumber = +nextValue;
  if (operator == '/' && secondNumber === 0) {
    reset();
    display.textContent = 'Undefined';
  } else {
    firstNumber = operate(operator, firstNumber, secondNumber);
    operator = null;
    secondNumber = null;
    display.textContent = firstNumber;
  }
  nextValue = '';
}

numbers.forEach((button) => {
  button.addEventListener('click', (e) => {
    populateDisplay(e.target.textContent);
  });
});

operators.forEach((operatorBtn) => {
  operatorBtn.addEventListener('click', (e) => {
    if (operator && firstNumber && nextValue != '') {
      getResult();
    }

    operator = e.target.textContent;

    if (nextValue != '') {
      firstNumber = +nextValue;
      nextValue = '';
    }

    if (!firstNumber) {
      firstNumber = 0;
      nextValue = '';
    }
  });
});

equals.addEventListener('click', () => {
  if (firstNumber != null && operator && nextValue) {
    getResult();
  }
});

function reset() {
  firstNumber = null;
  secondNumber = null;
  operator = null;
  nextValue = '';
}

clear.addEventListener('click', () => {
  reset();
  display.textContent = '0';
});

deleteBtn.addEventListener('click', depopulateDisplay);

function addDot() {
  if (!nextValue.includes('.')) {
    if (nextValue.length == 0) {
      populateDisplay('0');
    }
    populateDisplay('.');
  }
}

dot.addEventListener('click', addDot);
