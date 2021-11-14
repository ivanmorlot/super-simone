import * as Tone from 'tone';

export default class Game {
  constructor(gameConsoleSelector = ".game-console") {
    this.$gameConsole = document.querySelector(gameConsoleSelector);
    this.newGame();
  }

  newGame() {
    this.isGameActive = false;

    this.actionDuration = 2000;

    this.botActions = [];
    this.playerActions = [];

    this.validatedRounds = 0;
    this.$gameConsole.querySelector('.game-rounds').innerHTML = '0';
    
    this.validatedActions = 0;
    this.$gameConsole.querySelector('.game-actions').innerHTML = '0';

    this.isPlayerTurn = false;
    this.$gameConsole.querySelector('.game-turn span').style.fontWeight = 'normal';
    this.$gameConsole.querySelector('.game-turn span').innerHTML = '';
  }

  init() {
    var gameThis = this;

    document.querySelectorAll('.game-start').forEach(function($button) {
      $button.addEventListener('click', function () {
        gameThis.isGameActive = true;
        gameThis.startRounds();
      });
    });

    document.querySelectorAll('.game-reset').forEach(function($button) {
      $button.addEventListener('click', function () {
        gameThis.newGame();
      });
    });

    this.$gameConsole.querySelectorAll('.game-button').forEach(function($button) {
      $button.addEventListener('click', function () {
        if (gameThis.isPlayerTurn) {
          const synth = new Tone.Synth().toDestination();
          const now = Tone.now();
          const delay = 0.4;

          $button.classList.toggle('click');
          
          if ($button.classList.contains('red')) {
            gameThis.playerActions.push(0);

            $button.innerHTML = 'Do';
            synth.triggerAttack("C4", now);
            synth.triggerRelease(now + delay);
          }
          
          if ($button.classList.contains('blue')) {
            gameThis.playerActions.push(1);

            $button.innerHTML = 'Ré';
            synth.triggerAttack("D4", now);
            synth.triggerRelease(now + delay);
          }
          
          if ($button.classList.contains('green')) {
            gameThis.playerActions.push(2);

            $button.innerHTML = 'Mi';
            synth.triggerAttack("E4", now);
            synth.triggerRelease(now + delay);
          }
          
          if ($button.classList.contains('yellow')) {
            gameThis.playerActions.push(3);

            $button.innerHTML = 'Fa';
            synth.triggerAttack("F4", now);
            synth.triggerRelease(now + delay);
          }
      
          setTimeout(() => {
            $button.classList.toggle('click');
            $button.innerHTML = '';
          }, 500);
        }
      });
    });
  }

  eventify = function(arr, callback) {
    arr.push = function(e) {
        Array.prototype.push.call(arr, e);
        callback(arr);
    };
  };

  randomNote() {
    return Math.floor(Math.random() * 4);
  }

  botTurn() {
    const gameThis = this;

    this.isPlayerTurn = false;
    this.$gameConsole.querySelector('.game-turn span').style.fontWeight = 'normal';
    this.$gameConsole.querySelector('.game-turn span').innerHTML = "C'est au tour de Simone.";

    const $redButton = this.$gameConsole.querySelector('.game-button.red');
    const $blueButton = this.$gameConsole.querySelector('.game-button.blue');
    const $greenButton = this.$gameConsole.querySelector('.game-button.green');
    const $yellowButton = this.$gameConsole.querySelector('.game-button.yellow');

    this.botActions.push(this.randomNote());

    if (this.validatedRounds < 8) {
      this.actionDuration = this.actionDuration - 150;
    }

    this.botActions.forEach(function(action, index) {
      setTimeout(function () {
        const synth = new Tone.Synth().toDestination();
        const now = Tone.now();
        const delay = 0.4;

        if (action === 0) {
          $redButton.classList.toggle('click');

          $redButton.innerHTML = 'Do';
          synth.triggerAttack("C4", now);
          synth.triggerRelease(now + delay);

          setTimeout(() => {
            $redButton.classList.toggle('click');
            $redButton.innerHTML = '';
          }, 500);
        }
        
        if (action === 1) {
          $blueButton.classList.toggle('click');

          $blueButton.innerHTML = 'Ré';
          synth.triggerAttack("D4", now);
          synth.triggerRelease(now + delay);

          setTimeout(() => {
            $blueButton.classList.toggle('click');
            $blueButton.innerHTML = '';
          }, 500);
        }
        
        if (action === 2) {
          $greenButton.classList.toggle('click');

          $greenButton.innerHTML = 'Mi';
          synth.triggerAttack("E4", now);
          synth.triggerRelease(now + delay);

          setTimeout(() => {
            $greenButton.classList.toggle('click');
            $greenButton.innerHTML = '';
          }, 500);
        }
        
        if (action === 3) {
          $yellowButton.classList.toggle('click');

          $yellowButton.innerHTML = 'Fa';
          synth.triggerAttack("F4", now);
          synth.triggerRelease(now + delay);

          setTimeout(() => {
            $yellowButton.classList.toggle('click');
            $yellowButton.innerHTML = '';
          }, 500);
        }
      }, index * gameThis.actionDuration);
    });
  }

  playerTurn() {
    this.isPlayerTurn = true;
    this.$gameConsole.querySelector('.game-turn span').style.fontWeight = 'bold';
    this.$gameConsole.querySelector('.game-turn span').innerHTML = "C'est à vous !";
  }

  newRound() {
    this.botTurn();
    setTimeout(() => this.playerTurn(), this.botActions.length * this.actionDuration );
  }

  startRounds() {
    this.eventify(this.playerActions, function(playerActions) {
      // TODO: when player click a button, check arrays are equal when they have same length
    });

    this.newRound();
  }
}