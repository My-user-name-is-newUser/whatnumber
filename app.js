let divContainer = document.createElement('div');
divContainer.className = 'container';

let h1Title = document.createElement('h1');
h1Title.innerHTML = 'Угадайте число?';
h1Title.className = 'title';

let gift = document.createElement('div');
gift.className = 'gift';
gift.innerHTML = '<i class="fa-solid fa-gift"></i>';

let spanText = document.createElement('span');
spanText.innerHTML = 'Секретным числом может быть любое число от 0 до 100. У вас 7 попыток. Удачи :)';
spanText.className = 'span';

let form = document.createElement('form');
form.className = 'form';

let input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Введите число');
input.className = 'input';
input.inputMode = 'numeric';

let button = document.createElement('button');
button.innerHTML = 'Отгадать';
button.setAttribute('type', 'submit');
button.className = 'button';
form.append(input, button);

let divAnswer = document.createElement('div');
divAnswer.className = 'answer';
let spanWithInfoOfSmallOrBig = document.createElement('div');
spanWithInfoOfSmallOrBig.id = 'smallBig';
let spanWithPreviousGuesses = document.createElement('div');
spanWithPreviousGuesses.id = 'guesses';
let spanWithInfoOfWinOrLoss = document.createElement('div');
spanWithInfoOfWinOrLoss.id = 'winOrLoss';

divAnswer.append(spanWithInfoOfSmallOrBig, spanWithPreviousGuesses, spanWithInfoOfWinOrLoss);
divContainer.append(h1Title, gift, spanText, form);
document.body.append(divContainer, divAnswer);

let randomNumber = Math.floor(Math.random() * 101);
let attempts = 1;

const formElement = document.querySelector('form');
const inputText = document.querySelector('input');

const smallOrBig = document.querySelector('#smallBig');
const guesses = document.querySelector('#guesses');
const winOrLoss = document.querySelector('#winOrLoss');

const inputquery = document.querySelector('input');
const buttonquery = document.querySelector('button');
const giftIcon = document.querySelector('.gift');

function showInfoSmallOrBig(value) {
  smallOrBig.innerHTML = `${value}`;
};

function showInfoPreviousGuesses(value) {
  if (attempts === 1) {
    guesses.textContent = 'Ваши попытки: ';
  }
  guesses.textContent += ` ${value}`;
};

function resetGame(element) {
  randomNumber = Math.floor(Math.random() * 101);
  attempts = 1;
  smallOrBig.innerHTML = '';
  guesses.textContent = '';
  winOrLoss.innerHTML = '';
  inputquery.disabled = false;
  inputquery.style.pointerEvents = '';
  inputquery.focus();
  buttonquery.disabled = false;
  buttonquery.style.pointerEvents = '';
  giftIcon.style.display = 'flex';
  element.remove();
};

function showConfetti() {
  for(let i = 0; i < 50; i++) {
    let confetti = document.createElement('div');
    confetti.style = `
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        left: ${Math.random() * 100}vw;
        background: hsl(${Math.random() * 360}, 100%, 50%);
        animation: fall ${Math.random()+2}s linear;
      `;
    document.body.append(confetti);
    setTimeout(() => confetti.remove(), 3000);
  }
}

function showInfoWinOrLoss(value, attemptsMany) {
  attemptsMany && showConfetti();

  winOrLoss.innerHTML = `${value}`;
  smallOrBig.innerHTML = '';
  inputquery.disabled = true;
  inputquery.style.pointerEvents = 'none';
  buttonquery.disabled = true;
  buttonquery.style.pointerEvents = 'none';
  giftIcon.style.display = 'none';

  const divWannaPlayAgain = document.createElement('div')
  divWannaPlayAgain.className = 'playAgain';
  divWannaPlayAgain.innerText = 'Сыграть снова';
  document.body.append(divWannaPlayAgain);

  const playAgain = document.querySelector('.playAgain');

  playAgain.addEventListener('click', () => {
    resetGame(playAgain);
  });
};

giftIcon.addEventListener('click', () => {
  const secretNum = document.createElement('div');
  secretNum.classList.add('secretNum');
  secretNum.textContent = randomNumber;
  giftIcon.append(secretNum);

  setTimeout(() => {
    secretNum.remove();
  }, 2000);
});

function showError() {
  const error = document.createElement('div');
  error.classList.add('error');
  error.textContent = 'Вводите только числа';
  form.append(error);

  setTimeout(() => {
    error.remove();
  }, 2000);
};

formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  const textInput = inputText.value;

  if(textInput.trim() === '' || isNaN(textInput)) {
    inputText.value = '';
    showError();
    return;
  }

  if (+textInput === randomNumber) {
    showInfoWinOrLoss(`Вы угадали! Это <b>${textInput}</b> Вы заслужили тортик <i class="fa-solid fa-cake-candles"></i>`, attempts);
    showInfoPreviousGuesses(textInput);
    inputText.value = '';
  } else if (textInput !== randomNumber && attempts !== 7) {
    if (textInput > randomNumber) {
      const word = 'bigger';
      showInfoSmallOrBig(`Ваше число <b>больше</b> чем секретное число.`);
      showInfoPreviousGuesses(textInput);
      inputText.value = '';
      attempts++;
    } else if (textInput < randomNumber) {
      showInfoSmallOrBig(`Ваше число <b>меньше</b> чем секретное число.`);
      showInfoPreviousGuesses(textInput);
      inputText.value = '';
      attempts++;
    }
  } else {
    showInfoWinOrLoss(`Вы проиграли. Секретное число <b>${randomNumber}</b> Ничего страшного:)`);
    showInfoPreviousGuesses(textInput);
    inputText.value = '';
  }

});
