// Display elements
const currentOperation = document.getElementById('currentOperation')
const previousOperation = document.getElementById('previousOperation')
// Keypad button elements
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
// Operators list
const operators = ['%', '÷', '/', 'x', '*', '-', '+', '.']
// History elements
const clearHistoryButton = document.getElementById('clearHistoryBtn')
const historyList = document.getElementById('history')
// Theme switch elements
const switchThemeInput = document.getElementById('chk')




// Append numbers to display
numberButtons.forEach(numberBtn => {
    numberBtn.addEventListener('click', () => {
        currentOperation.value += numberBtn.value
    })
})

// Apend operator to display
operationButtons.forEach(operationBtn => {
    operationBtn.addEventListener('click', () => {
        if(operators.some(op => currentOperation.value.endsWith(op))){
            return
        }else{
            currentOperation.value += operationBtn.value
        }
    })
})

// Clear all display values
clearButton.addEventListener('click', allClear)
function allClear(){
    currentOperation.value = ''
    previousOperation.value = ''
}

// Delete a char
deleteButton.addEventListener('click', () => {
    currentOperation.value = currentOperation.value.toString().slice(0, -1)
})

// Calculate
equalsButton.addEventListener('click', () => {
    const noOperatorInDisplay = !operators.some(op => currentOperation.value.includes(op))
    const displayStartsWithOperator = operators.some(op => currentOperation.value.startsWith(op))
    const displayEndsWithOperator = operators.some(op => currentOperation.value.endsWith(op))

    try{
        if(displayStartsWithOperator || displayEndsWithOperator ){
            throw new Error('missing values')
        }else if(noOperatorInDisplay){
            return
        }else if(currentOperation.value.includes('÷0')){
            throw new Error('division by zero')
        }else{
            updateHistory()
            updateDisplay()
        }
    }catch (error){
        allClear()
        previousOperation.value = `ERROR: ${error.message}!`
    }
})

// Update display
function updateDisplay(){
    const expression = currentOperation.value
    const result = eval(expression.replace('÷', '/').replace('x', '*'))

    previousOperation.value = `${expression} = ${result}`
    currentOperation.value = result
}

// Update history
function updateHistory(){
    const expression = currentOperation.value
    const result = eval(expression.replace('÷', '/').replace('x', '*'))
    
    const newHistoryElement = document.createElement('li')
    newHistoryElement.innerHTML = `${expression} <strong>=</strong> ${result}`
    historyList.appendChild(newHistoryElement)
}

// Clear history
clearHistoryButton.addEventListener('click', () => {
    historyList.innerHTML = ''
})

// Switch theme
switchThemeInput.addEventListener('change', () => {
    const calculator = document.getElementById('calculator')
    const historyContainer = document.getElementById('history-container')
    const switchThemeContainer = document.getElementById('switch-theme-container')
    const historyHeader = document.getElementById('history-header')
    const history = document.getElementById('history')

    currentOperation.classList.toggle('dark')
    previousOperation.classList.toggle('dark')
    calculator.classList.toggle('dark')
    historyContainer.classList.toggle('dark')
    switchThemeContainer.classList.toggle('dark')
    historyHeader.classList.toggle('dark')
    history.classList.toggle('dark')
    clearButton.classList.toggle('highlited-text')
    deleteButton.classList.toggle('highlited-text')
    numberButtons.forEach(numberBtn => numberBtn.classList.toggle('dark'))
    operationButtons.forEach(operationBtn => operationBtn.classList.toggle('highlited-text'))
});
