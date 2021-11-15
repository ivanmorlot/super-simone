import Game from './game';

const game = new Game();
game.init();

var $infoModal = document.querySelector('#info-modal');
var $infoButton = document.querySelector('#info-button');
var $infoClose = document.querySelector('#info-modal .close');
var $gameOverModal = document.querySelector('#game-over-modal');
var $gameOverClose = document.querySelector('#game-over-modal .close');
var $gameOverNewGame = document.querySelector('#game-over-modal .game-start');

$infoButton.onclick = function() {
  $infoModal.style.display = 'block';
}

$infoClose.onclick = function() {
  $infoModal.style.display = 'none';
}

$gameOverClose.onclick = function() {
  $gameOverModal.style.display = 'none';
}

$gameOverNewGame.onclick = function() {
  $gameOverModal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == $infoModal) {
    $infoModal.style.display = 'none';
  }

  if (event.target == $gameOverModal) {
    $gameOverModal.style.display = 'none';
  }
}