const choices = ['rock', 'paper', 'scissors']
function getComputerChoice (){
    const randomNum = Math.round(Math.random() * 2)
    const selection = choices[randomNum]

    return selection
}
function playRound(computerSelection){
    let playerSelection = prompt('Insert an option (rock, paper, scissors)').toLowerCase()

    const GAME_RULES = {
        'rock': {
            'scissors': true
        },
        'paper': {
            'rock': true
        },
        'scissors': {
            'paper': true
        },
    }

    if (!GAME_RULES[playerSelection]) {
        alert(`The option you choose is not avalable, your answer was: ${playerSelection}.\nAnd your answer coul be rock, paper or scissors`)
        playerSelection = prompt('escriba una respuesta, (piedra, papel o tijeras)').toLowerCase()
    }

    if (GAME_RULES[playerSelection][computerSelection]) return alert('Tú ganas 🎉')
    else if (playerSelection === computerSelection) return alert('Empate 🏳️')
    else return alert('La computadora gana 😭');
}

function game(rounds){
    if (typeof rounds !== 'number') 
    return console.error(`the value of rounds could be a number type, the actual value is: "${typeof rounds}"`);
    
    let i = 0;

    while (i < rounds) {
        playRound( getComputerChoice() )
        i++
    }
}
game(5)

// const playerChoice = 'ROCK'
// const computerChoice = getComputerChoice()

// playRound(playerChoice, computerChoice)