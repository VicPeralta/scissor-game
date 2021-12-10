
const options = document.querySelectorAll('.option');

let computerScore = 0;
let userScore = 0;
let totalPlays = 0;
options.forEach((option) => {
    option.addEventListener('mousedown', (e) => {
        option.classList.add('selected');
        option.classList.remove('unselected');
    });

    option.addEventListener('mouseup', (e) => {
        if (e.button == 0) {
            option.classList.remove('selected');
            option.classList.add('unselected');
        }
    });

    option.addEventListener('click', (e) => {
        let element = e.target;
        if (element.nodeName != 'DIV') element = element.parentElement;
        const result = playScissor(element.id);
        updateScoresAndMessages(result);
    });
});
function updateScoresAndMessages(result) {
    const messageResult = document.getElementById('result');
    const computerChoice = document.getElementById('computer-choice');
    computerChoice.textContent = result.message;
    if (result.winner == 'computer')
        messageResult.textContent = `Computer wins!!!`;
    else if (result.winner == 'user')
        messageResult.textContent = 'You win!!!';
    else messageResult.textContent = "It's a draw!!!";
    const computer = document.getElementById('computer-score');
    computer.textContent = `Computer:${computerScore}`;
    const user = document.getElementById('user-score');
    user.textContent = `You:${userScore}`;
    const total = document.getElementById('total-plays');
    total.textContent = `Total plays:${totalPlays}`;
    if (totalPlays == 0) {
        messageResult.classList.remove('hidden');
        computerChoice.classList.remove('hidden');
    }
    totalPlays++;
}

function playScissor(userChoice) {
    let validOptions = "rock paper scissors";
    if (validOptions.indexOf(userChoice.toLowerCase()) === -1) {
        return { winner: "", message: 'invalid option' };
    }
    let computerChoice = getComputerScissorChoice();
    switch (userChoice) {
        case 'rock':
            if (computerChoice === 'rock') return { winner: 'none', message: `Computer choice: ${computerChoice}` };
            if (computerChoice === 'paper') return { winner: 'computer', message: `Computer choice:${computerChoice}` };
            if (computerChoice === 'scissors') return { winner: 'user', message: `Computer choice: ${computerChoice}` };
            break;
        case 'paper':
            if (computerChoice === 'paper') return { winner: 'none', message: `Computer choice: ${computerChoice}` };
            if (computerChoice === 'scissors') return { winner: 'computer', message: `Computer choice: ${computerChoice} ` };
            if (computerChoice === 'rock') return { winner: 'user', message: `Computer choice: ${computerChoice} ` };
            break;
        case 'scissors':
            if (computerChoice === 'scissors') return { winner: 'none', message: `Computer choice: ${computerChoice} ` };
            if (computerChoice === 'rock') return { winner: 'computer', message: `Computer choice: ${computerChoice} ` };
            if (computerChoice === 'paper') return { winner: 'user', message: `Computer choice: ${computerChoice} ` };
            break;
    }
}

function getComputerScissorChoice() {
    const returnValues = ['rock', 'paper', 'scissors'];
    return returnValues[Math.floor(Math.random() * 3)];
}