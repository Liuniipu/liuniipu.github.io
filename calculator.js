let displayValue = ''; // 用於儲存輸入的數字
let operatorValue = ''; // 用於儲存運算符號
let previousValue = ''; // 用於儲存之前輸入的數字

function input(num) {
    // 避免多個小數點
    if (num === '.' && displayValue.includes('.')) return;
    displayValue += num;
    updateDisplay();
}

function operator(op) {
    if (displayValue === '') return; // 防止在沒有數字時輸入運算符號
    if (operatorValue !== '') calculate(); // 如果有運算符號，先計算之前的結果
    operatorValue = op;
    previousValue = displayValue;
    displayValue = '';
}

function calculate() {
    if (operatorValue === '' || displayValue === '') return; // 沒有數字或運算符號則不計算
    let result;
    switch (operatorValue) {
        case '+':
            result = parseFloat(previousValue) + parseFloat(displayValue);
            break;
        case '-':
            result = parseFloat(previousValue) - parseFloat(displayValue);
            break;
        case '*':
            result = parseFloat(previousValue) * parseFloat(displayValue);
            break;
        case '/':
            result = parseFloat(previousValue) / parseFloat(displayValue);
            break;
        default:
            return;
    }
    displayValue = parseFloat(result.toFixed(10)).toString();
    operatorValue = '';
    previousValue = '';
    updateDisplay();
}

function clearDisplay() {
    displayValue = '';
    operatorValue = '';
    previousValue = '';
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('display').value = displayValue;
}
