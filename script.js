const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('button');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

const updateDisplay = () => {
    currentOperandTextElement.innerText = currentOperand;
    if (operation != null) {
        previousOperandTextElement.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandTextElement.innerText = '';
    }
};

const appendNumber = (number) => {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
};

const chooseOperation = (op) => {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        calculate();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
};

const calculate = () => {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation;
    operation = undefined;
    previousOperand = '';
};

const clear = () => {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
};

const del = () => {
    currentOperand = currentOperand.toString().slice(0, -1);
};

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.innerText) {
            case 'AC':
                clear();
                break;
            case 'DEL':
                del();
                break;
            case '=':
                calculate();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                chooseOperation(button.innerText);
                break;
            default:
                appendNumber(button.innerText);
                break;
        }
        updateDisplay();
    });
});
