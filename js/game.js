// import {Howl, Howler} from 'howler';

const languages = ['angular','angular','bootstrap','bootstrap','csharp','csharp','css','css','html','html','java','java','js','js','php','php','python','python','react','react','sass','sass','sql','sql'];

let languagesHandle = document.querySelectorAll('.cards');
let timer = document.querySelector('.timer');
let mover = document.querySelector('.mover');
console.log(mover)
let startGame = document.querySelector('.start-game')
languagesHandle = [...languagesHandle];
const start = new Date().getTime();
let active = "";
const activeCards = [];
const pairs = languagesHandle.length/2
let second = '';
let nowTime = 0;
let gameResult = 0;
let moves = 0;


// const sound = new Howl({
//     src: ['sound.webm', 'sound.mp3']
//   });

const clickCard = () => {
    active = event.target;

    if (active === activeCards[0]) return;

    active.classList.remove('hidden');

    if (activeCards.length === 0) {

        activeCards[0] = active;
        return
    } else {
        languagesHandle.forEach(card => card.removeEventListener('click', clickCard));
            activeCards[1] = active;

            setTimeout(function () {
                if (activeCards[0].className === activeCards[1].className) {
                    activeCards.forEach (card => {
                        card.classList.add('off')
                        gameResult ++
                        // moves ++
                        // mover.textContent = 'Liczba ruchów ' + moves;
                        console.log(gameResult)
                        languagesHandle = languagesHandle.filter(card => !card.classList.contains("off"))
                        if (gameResult === pairs * 2) {
                            const end = new Date().getTime();
                            const gameTime = (end - start)/1000;
                            alert(`Done Twoj wynik to: ${gameTime}` + ` sekund. Potrzebowaleś ${moves}` + ` ruchów aby skończyc grę.`)
                            location.reload();
                        }
                    })
                }
                else {
                    // moves ++
                    // mover.textContent = 'Liczba ruchów ' + moves;
                    activeCards.forEach(card => card.classList.add('hidden'));
                    }
                    active = '';
                    activeCards.length = 0;
                    languagesHandle.forEach(card => card.addEventListener("click", clickCard))
             },500);
     };

     if (activeCards.length === 2) {
        console.log(activeCards.length)
        moves ++
        mover.textContent = 'Moves ' + moves;
    }
 }

const sortLanguages = () => {
    languagesHandle.forEach (card => {
        const position = Math.floor(Math.random() * languages.length);
        card.classList.add(languages[position]);
        languages.splice(position, 1)
    });

    setTimeout(function () {
        languagesHandle.forEach (card => {
           card.classList.add('hidden') ;
           card.addEventListener('click', clickCard)
        })
    }, 1000);
}

const initTime = () => {
    nowTime = setInterval(function () {
      timer.textContent = 'Time: ' + second;
      second ++
    }, 1000);
}

startGame.addEventListener('click', sortLanguages);
startGame.addEventListener('click', initTime);
// startGame.addEventListener('click', sound);

