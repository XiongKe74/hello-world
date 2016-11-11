function clearDisplay() {
    var display = document.getElementById('display');
    display.value = '0';
    storedNum = '0';
    calculationFinished = true;
    operation = operations.none;
}

function clearPreviousResult() {
    var display = document.getElementById('display');
    if (calculationFinished) { 
        display.value = '0';
        calculationFinished = false;
    }
}

function numInput(digit) {
    var display = document.getElementById('display');
    clearPreviousResult();
    // Get rid of a 0 if it's the only thing in there.
    // This particular way of doing it lets you enter a 0 and have it show up,
    // as well as leaving a 0 for the decimal point to snuggle up to.
    if (display.value === '0') {
	display.value = '';
    } else if ( display.value === '-0') { 
	display.value = '-';
    }
    display.value += digit;
}

function insertDecimal() {
    var display = document.getElementById('display');
    clearPreviousResult();
    if (display.value.indexOf('.') === -1) display.value += '.';
}

function changeSign() {
    var display = document.getElementById('display');
    if (display.value.indexOf('-') === -1) {
	display.value = '-' + display.value;
    } else {
	display.value = display.value.substring(1, display.value.length);
    }
}

operations = {
    // Outputs display.value
    none:     function(left, right) { return right; },

    // Math ops.
    add:      function(left, right) { return left + right; },
    subtract: function(left, right) { return left - right; },
    multiply: function(left, right) { return left * right; },
    divide:   function(left, right) { return left / right; },
    power:    function(left, right) { return Math.pow(left, right); }
};

function setOperation(command) {
    var display = document.getElementById('display');
    calculate();
    storedNum = display.value;
    if (operations.hasOwnProperty(command))
        operation = operations[command];
}

function memClear() {
    memNum = '0';
}

function memDisplay() {
    display.value = memNum;
}

function memStore() {
    memNum = display.value;
}

function memOp(command) {
    var display = document.getElementById('display');
    if (operations.hasOwnProperty(command))
        operation = operations[command];
    memNum = operation(+memNum, +display.value);
    operation = operations.none;
}

function square() {
    var display = document.getElementById('display');
    display.value =  +display.value * +display.value;
    calculationFinished = true;
}

function inverse() {
    var display = document.getElementById('display');
    display.value =  1/(+display.value);
    calculationFinished = true;
}

function factorial() {
    var display = document.getElementById('display');
    if (+display.value == 0) {
	display.value = '1';
    } else {
    	var i = 1;
    	var N = +display.value;
    	while ( i < N && (+display.value < Infinity)) { 
		display.value = +display.value * (N-i);
   		i++;
    	}
    }
    calculationFinished = true;
}

function calculate() {
    var display = document.getElementById('display');
    display.value = operation(+storedNum, +display.value);
    calculationFinished = true;
    operation = operations.none;
}

if ('addEventListener' in window) {
    window.addEventListener('load', clearDisplay);
    window.addEventListener('load', memClear);
}
else {
    window.attachEvent('onload', clearDisplay);
    window.attachEvent('onload', memClear);
}


