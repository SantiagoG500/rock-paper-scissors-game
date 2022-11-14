const optionsTag = document.getElementById('game-options');
const gameHistory = [];
let machineScore = 0;
let userScore = 0;

const getMachineChoice = () => {
  const options = ['✊', '🤚', '✌️'];
  const randomNum = Math.round(Math.random() * 2);
  const machineSelection = options[randomNum];

  return machineSelection;
};

const getUserChoice = (e) => {
  const target = e.target;

  if (target.className !== 'btn') return;

  const userSelection = target.dataset.option;
  return userSelection;
};

const playRound = (e) => {
  const userChoice = getUserChoice(e);
  const machineChoice = getMachineChoice();
  let result = '';

  if (userChoice === undefined) return;

  const winConditions = {
    '✊': { '✌️': true },
    '🤚': { '✊': true },
    '✌️': { '🤚': true },
  };

  if (winConditions[userChoice][machineChoice]) {
    result = 'win';

    printChoices(userChoice, machineChoice, result);
    checkScore();

    return result;
  } else if (userChoice === machineChoice) {
    result = 'tie';

    printChoices(userChoice, machineChoice, result);
    checkScore();

    return result;
  } else {
    result = 'lose';

    printChoices(userChoice, machineChoice, result);
    checkScore();

    return result;
  }
};

const checkScore = () => {
  if (machineScore === 5) {
    printScore(machineScore, userScore);
    printWinner('The machine wons!!!');

    // userScore = 0;
    // machineScore = 0;

    return;
  } else if (userScore === 5) {
    printScore(machineScore, userScore);
    printWinner('You Win!!!');

    // userScore = 0;
    // machineScore = 0;

    return;
  }

  printScore(machineScore, userScore);
};

// UI

const printWinner = (message) => {
  const messageTemplate = `
  <div>
    <h2 class="title"> ${message} </h2>
    <p class="text">You want to play another roun? Click the button below</p>
    <button id="restart-game" class="btn-refresh-game">Play Again</button>
  </div>
  `;
  optionsTag.innerHTML = messageTemplate;

  const btnRestart = document.getElementById('restart-game');
  btnRestart.addEventListener('click', restartGame);
};

const printChoices = (userChoice, machineChoice, result) => {
  const uChoiceTag = document.getElementById('user-choice');
  const mChoiceTag = document.getElementById('machine-choice');
  const resultTag = document.getElementById('result');

  if (result === 'win') {
    ++userScore;
    resultTag.innerText = 'You win!!!';
  }
  if (result === 'lose') {
    ++machineScore;
    resultTag.innerText = 'The machine wons';
  }
  if (result === 'tie') {
    resultTag.innerText = "It's a tie";
  }

  uChoiceTag.innerText = userChoice;
  mChoiceTag.innerText = machineChoice;
};

const printScore = (machineScore, userScore) => {
  const userCounter = document.getElementById('user-counter');
  const machineCounter = document.getElementById('machine-counter');

  userCounter.innerText = userScore;
  machineCounter.innerText = machineScore;

  // console.log({ machineScore, userScore });
};

const restartGame = () => {
  const uChoiceTag = document.getElementById('user-choice');
  const mChoiceTag = document.getElementById('machine-choice');

  const optionsTemplate = `
  <section class="section game-options" id="game-options">
    <button data-option="✊" id="Rock" class="btn">✊</button>
    <button data-option="🤚" id="Paper" class="btn">🤚</button>
    <button data-option="✌️" id="Scissors" class="btn">✌️</button>
  </section>
  `;

  machineScore = 0;
  userScore = 0;

  printScore(machineScore, userScore);

  uChoiceTag.innerText = '';
  mChoiceTag.innerText = '';

  optionsTag.innerHTML = optionsTemplate;
};

optionsTag.addEventListener('click', playRound);
