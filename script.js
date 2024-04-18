// Display elements:
const currentDisplay = document.getElementById('currentOperation') // Element for displaying the current operation
const previousDisplay = document.getElementById('previousOperation') // Element for displaying the previous operation
const operators = ['%', '/', 'x', '-', '+', '.', '÷', 'AC', 'DEL'] // Supported operators list

const history = document.getElementById('history') // Element for displaying the history of operations
const clearHistoryBtn = document.getElementById('clearHistoryBtn') // Button for clearing the history
clearHistoryBtn.addEventListener('click', clearHistory) // Add an event listener to clear the history

const themeButton = document.getElementById('chk')
themeButton.addEventListener('change', switchTheme)

// Add event listeners to the keypad buttons
const keypadButtons = document.getElementsByClassName('keypad-button')
for (i in keypadButtons) {
    keypadButtons[i].addEventListener('click', verifyButton)
}

// Verify the clicked button and perform the corresponding action
function verifyButton(event) {
    const buttonValue = event.target.value
    const displayEndsWithOperator = operators.some(op => currentDisplay.value.endsWith(op))
    const buttonIsOperator = operators.some(op => buttonValue.includes(op))

    if (buttonIsOperator && displayEndsWithOperator) {
        return
    } else {
        switch (buttonValue) {
            case 'AC':
                allClear()
                break
            case 'DEL':
                deleteValue()
                break
            case '=':
                calculateAll()
                break
            default:
                currentDisplay.value += buttonValue
                break
        }
    }
}

// Clear the display fields
function allClear() {
    currentDisplay.value = ''
    previousDisplay.value = ''
}

// Delete the last character in the current display field
function deleteValue() {
    currentDisplay.value = currentDisplay.value.slice(0, -1)
}

// Calculate the mathematical expression and display the result
function calculateAll() {
    try {
        const expression = currentDisplay.value.replace('x', '*').replace('÷', '/')

        if(operators.some(op => currentDisplay.value.startsWith(op)) || 
        operators.some(op => currentDisplay.value.endsWith(op))){
            throw new Error('Missing values')
        } else if (expression.trim() === '' || !operators.some(op => currentDisplay.value.includes(op)))  {
            return
        } else if (expression.includes('/0')) {
            throw new Error('Division by zero')
        } else {
            const result = eval(expression)
            addToHistory(currentDisplay.value, result) // Add the operation to the history
            previousDisplay.value = `${currentDisplay.value} = ${result}`
            currentDisplay.value = result
        }
    } catch (error) {
        allClear()
        previousDisplay.value = `ERROR: ${error.message}!`
    }
}

// Clear the history of operations
function clearHistory() {
    history.innerHTML = ''
}

// Add the operation to the history
function addToHistory(operation, result) {
    const newHistoryItem = document.createElement('li')
    newHistoryItem.innerText = `${operation} = ${result}`
    history.appendChild(newHistoryItem)
}

function switchTheme() {
    document.getElementById('calculator').classList.toggle('dark')
    document.getElementById('history-container').classList.toggle('dark')
    document.getElementById('switch-theme-container').classList.toggle('dark')
    document.getElementById('history-header').classList.toggle('dark')
    currentDisplay.classList.toggle('dark')
    previousDisplay.classList.toggle('dark')
    history.classList.toggle('dark')


    // Convert the keypad buttons collection into an array
    const keypadArray = Array.from(keypadButtons)

    // Iterate through each keypad button
    keypadArray.forEach(button => {
        const buttonValue = button.value
        const isOperator = operators.some(op => buttonValue.includes(op))
        
        // Toggle the class based on whether the button is an operator or not
        if (isOperator) {
            button.classList.toggle('highlited-text')
        }

        if(!isOperator){
            button.classList.toggle('dark')
        }
    })
}
