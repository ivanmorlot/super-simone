import * as Tone from 'tone'

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

    const synth = new Tone. Synth().toDestination();
    const now = Tone.now();
    const delay = 0.4;
    
    if ($button.classList.contains('red')) {
      $button.innerHTML = 'Do';
      synth.triggerAttack("C4", now)
      synth.triggerRelease(now + delay)
    }
    
    if ($button.classList.contains('blue')) {
      $button.innerHTML = 'Ré';
      synth.triggerAttack("D4", now)
      synth.triggerRelease(now + delay)
    }
    
    if ($button.classList.contains('green')) {
      $button.innerHTML = 'Mi';
      synth.triggerAttack("E4", now)
      synth.triggerRelease(now + delay)
    }
    
    if ($button.classList.contains('yellow')) {
      $button.innerHTML = 'Fa';
      synth.triggerAttack("F4", now)
      synth.triggerRelease(now + delay)
    }

    setTimeout(() => {
      $button.classList.toggle('click');
      $button.innerHTML = '';
    }, 500);
  });
});