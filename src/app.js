import Game from './game';

var $infoModal = document.getElementById('info-modal');
var $infoButton = document.getElementById('info-button');
var $infoClose = document.getElementsByClassName('close')[0];

$infoButton.onclick = function() {
  $infoModal.style.display = 'block';
}

$infoClose.onclick = function() {
  $infoModal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == $infoModal) {
    $infoModal.style.display = 'none';
  }
}

const game = new Game();
game.init();