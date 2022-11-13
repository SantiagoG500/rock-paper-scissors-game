const optionsTag = document.getElementById('game-options');
const gameHistory = [];

const getMachineChoice = () => {
  const options = ['rock', 'paper', 'scissors'];
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

  if (userChoice === undefined) return;

  const winConditions = {
    rock: { scissors: true },
    paper: { rock: true },
    scissors: { paper: true },
  };

  const gameResume = {
    userChoice: userChoice,
    machineChoice: machineChoice,
    result: undefined,
  };

  if (winConditions[userChoice][machineChoice]) {
    gameResume.result = 'win';
    gameHistory.push({ ...gameResume });
    printResult(gameResume);

    return gameResume;
  } else if (userChoice === machineChoice) {
    gameResume.result = 'tie';
    gameHistory.push({ ...gameResume });
    printResult(gameResume);

    return gameResume;
  } else {
    gameResume.result = 'lose';
    gameHistory.push({ ...gameResume });
    printResult(gameResume);

    return gameResume;
  }
};

const cleanHistory = () => {};

optionsTag.addEventListener('click', playRound);
// UI

const printResult = (resume) => {
  const resultTag = document.getElementById('result');
  let message;

  if (resume.result === 'win') message = `You won!!! 🎉`;
  if (resume.result === 'lose') message = `You lose 😭`;
  if (resume.result === 'tie') message = `It's a tie 🏳️`;

  resultTag.innerText = message;
  printScore(gameHistory);
  printHistory();
};

const printScore = (history) => {
  const resultsTag = document.getElementById('results');
  const userCounterTag = document.getElementById('user-counter');
  const machineCounterTag = document.getElementById('machine-counter');

  let winsUser = 0;
  let winsMachine = 0;

  for (const item of history) {
    if (item.result === 'win') winsUser++;
    if (item.result === 'lose') winsMachine++;
  }
  // call a function wich cleans the history and restarts the game

  if (winsUser === 5)
    resultsTag.innerHTML = `<h2 class="title">You Won!!!</h2>`;
  if (winsMachine === 5)
    resultsTag.innerHTML = `<h2 class="title">The machine Wons!!!</h2>`;

  userCounterTag.innerText = winsUser;
  machineCounterTag.innerText = winsMachine;
};

const printHistory = () => {
  const tableBodyTag = document.getElementById('table-body');

  const fragment = document.createDocumentFragment();
  for (const resume of gameHistory) {
    const trTag = document.createElement('tr');

    for (const key in resume) {
      const td = document.createElement('td');
      td.classList.add('text');
      td.classList.add('table-data');
      td.innerText = resume[key];
      trTag.appendChild(td);
    }

    fragment.appendChild(trTag);
  }
  tableBodyTag.innerHTML = '';
  tableBodyTag.appendChild(fragment);
};
