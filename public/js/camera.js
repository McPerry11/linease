$(function() {
  $('html').addClass('has-navbar-fixed-bottom');

  if (!Modernizr.getusermedia) {
    alert('Your browser does not support getUserMedia according to Modernizr.');
    $('#camera').append('<span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-ban fa-stack-2x"></i></span></span>');
    $('#camera').append('LinEase cannot access your device\'s camera through this broswer. We recommend Google Chrome for more browser feature supports.');
  } else {
    const constraints = {
      audio: false,
      video: {
        width: {ideal: 720},
        height: {ideal: 720},
        facingMode: {ideal: 'environment'}
      },
    };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      $('#camera').remove();
      $('body').append('<video autoplay id="camera"></video>');
      $('#camera').css('padding', 0);
      var video = document.querySelector('video');
      video.srcObject = stream;
    }).catch(function(err) {
      console.log(err);
      alert('An error occurred while accessing your device\'s camera');
      $('#camera').append('<span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></span>');
      $('#camera').append('LinEase had a problem accessing your device\'s camera. Please refresh and try again.<br>If problem persists, we recommend changing browsers. For more browser feature supports, use Google Chrome.');
    });
  }
});