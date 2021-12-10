

class Game {
    computerScore = 0;
    userScore = 0;
    totalPlays = 0;
    constructor() {
        const options = document.querySelectorAll('.option');
        options.forEach((option) => {
            option.addEventListener('click', (e) => {
                let element = e.target;
                if (element.nodeName != 'DIV') element = element.parentElement;
                const result = this.playScissor(element.id);
                this.updateScoresAndMessages(result);
            });
        });
    }

    getComputerScissorChoice() {
        const returnValues = ['rock', 'paper', 'scissors'];
        return returnValues[Math.floor(Math.random() * 3)];
    }
    updateScoresAndMessages(result) {
        const messageResult = document.getElementById('result');
        const computerChoice = document.getElementById('computer-choice');
        computerChoice.textContent = `Computer choice: ${result.computer}`;
        if (result.winner == 'computer') {
            messageResult.textContent = `Computer wins!!!`;
            this.computerScore++;
        }
        else if (result.winner == 'user') {
            this.userScore++;
            messageResult.textContent = 'You win!!!';
        }
        else messageResult.textContent = "It's a draw!!!";
        const computer = document.getElementById('computer-score');
        computer.textContent = `Computer:${this.computerScore}`;
        const user = document.getElementById('user-score');
        user.textContent = `You:${this.userScore}`;
        const total = document.getElementById('total-plays');
        total.textContent = `Total plays:${this.totalPlays}`;
        if (this.totalPlays == 0) {
            messageResult.classList.remove('hidden');
            computerChoice.classList.remove('hidden');
        }
        this.totalPlays++;
    }
    playScissor(userChoice) {
        let validOptions = "rock paper scissors";
        if (validOptions.indexOf(userChoice.toLowerCase()) === -1) {
            return { winner: "", computer: 'invalid option' };
        }
        let computerChoice = this.getComputerScissorChoice();
        switch (userChoice) {
            case 'rock':
                if (computerChoice === 'rock') return { winner: 'none', computer: computerChoice };
                if (computerChoice === 'paper') return { winner: 'computer', computer: computerChoice };
                if (computerChoice === 'scissors') return { winner: 'user', computer: computerChoice };
                break;
            case 'paper':
                if (computerChoice === 'paper') return { winner: 'none', computer: computerChoice };
                if (computerChoice === 'scissors') return { winner: 'computer', computer: computerChoice };
                if (computerChoice === 'rock') return { winner: 'user', computer: computerChoice };
                break;
            case 'scissors':
                if (computerChoice === 'scissors') return { winner: 'none', computer: computerChoice };
                if (computerChoice === 'rock') return { winner: 'computer', computer: computerChoice };
                if (computerChoice === 'paper') return { winner: 'user', computer: computerChoice };
                break;
        }
    }
}
let theGame = new Game();
