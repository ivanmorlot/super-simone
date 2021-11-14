var $infoModal = document.getElementById('info-modal');
var $infoButton = document.getElementById('info-button');
var $infoClose = document.getElementsByClassName('close')[0];
var $simoneButtons = document.querySelectorAll('.simone button');

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

$simoneButtons.forEach(function($button) {
  $button.addEventListener('click', function (target) {
    $button.classList.toggle('click');

    if ($button.classList.contains('red')) $button.innerHTML = 'Do';
    if ($button.classList.contains('blue')) $button.innerHTML = 'Ré';
    if ($button.classList.contains('green')) $button.innerHTML = 'Mi';
    if ($button.classList.contains('yellow')) $button.innerHTML = 'Fa';

    setTimeout(() => {
      $button.classList.toggle('click');
      $button.innerHTML = '';
    }, 500);
  });
});