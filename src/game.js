import * as Tone from 'tone';

export default class Game {
  constructor(gameConsoleSelector = ".game-console") {
    this.$gameConsole = document.querySelector(gameConsoleSelector);

    this.setup();
  }

  setup() {
    this.isGameActive = false;

    this.actionDuration = 2000;

    this.botActions = [];
    this.playerActions = [];

    this.validatedRounds = 0;
    this.$gameConsole.querySelector('.game-rounds').innerHTML = '0';
    
    this.validatedActions = 0;
    this.$gameConsole.querySelector('.game-actions').innerHTML = '0';

    this.isPlayerTurn = false;
    this.$gameConsole.querySelector('.game-turn span').innerHTML = '';
  }

  newGame() {
    this.setup();

    this.isGameActive = true;

    this.startRounds();
  }

  init() {
    var gameThis = this;

    document.querySelectorAll('.game-start').forEach(function($button) {
      $button.addEventListener('click', function () {
        gameThis.newGame();
      });
    });

    document.querySelectorAll('.game-reset').forEach(function($button) {
      $button.addEventListener('click', function () {
        gameThis.setup();
      });
    });

    this.$gameConsole.querySelectorAll('.game-button').forEach(function($button) {
      $button.addEventListener('click', function () {
        if (gameThis.isPlayerTurn && gameThis.isGameActive) {
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

  randomNote() {
    return Math.floor(Math.random() * 4);
  }

  botTurn() {
    if (this.isGameActive) {
      const gameThis = this;

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
  }

  setPlayerTurn(isPlayerTurn) {
    const $turn = this.$gameConsole.querySelector('.game-turn span');

    if (isPlayerTurn) {
      this.isPlayerTurn = true;
      this.$gameConsole.querySelectorAll('.game-button').forEach(function ($button) {
        $button.classList.add('player');
      });
      $turn.style.color = 'rgb(155 233 33)';
      $turn.innerHTML = "C'est à vous !";
    } else {
      this.isPlayerTurn = false;
      this.$gameConsole.querySelectorAll('.game-button').forEach(function ($button) {
        $button.classList.remove('player');
      });
      $turn.style.color = 'rgb(255 169 13)';
      $turn.innerHTML = "C'est au tour de Simone.";
    }
  }

  playerTurn() {
    if (this.isGameActive) {
      this.setPlayerTurn(true);
    }
  }

  gameOver() {
    this.isGameActive = false;
    this.setPlayerTurn(false);
    this.$gameConsole.querySelector('.game-turn span').innerHTML = '';
    document.querySelector('#game-over-modal').style.display = 'block';
  }

  newRound() {
    if (this.isGameActive) {
      const gameThis = this;

      const eventify = function(arr, callback) {
        arr.push = function(e) {
            Array.prototype.push.call(arr, e);
            callback(arr);
        };
      };

      eventify(this.playerActions, function(playerActions) {
        const equals = (a, b) => a.length === b.length && a.every((v, i) => v === b[i]);

        if (gameThis.botActions.length >= playerActions.length) {
          const relevantBotActions = gameThis.botActions.slice(0, playerActions.length);

          if (equals(relevantBotActions, playerActions)) {
            gameThis.validatedActions++;
            gameThis.$gameConsole.querySelector('.game-actions').innerHTML = gameThis.validatedActions;
          } else {
            gameThis.gameOver();
          }
        }

        if (gameThis.botActions.length === playerActions.length && equals(gameThis.botActions, playerActions)) {
          gameThis.validatedRounds++;
          gameThis.$gameConsole.querySelector('.game-rounds').innerHTML = gameThis.validatedRounds;

          gameThis.playerActions = [];

          gameThis.setPlayerTurn(false);

          setTimeout(() => gameThis.newRound(), 2000);
        }
      });

      this.botTurn();

      setTimeout(() => this.playerTurn(), this.botActions.length * this.actionDuration );
    }
  }

  startRounds() {
    if (this.isGameActive) {
      this.setPlayerTurn(false);
      setTimeout(() => this.newRound(), 1200);
    }
  }
}