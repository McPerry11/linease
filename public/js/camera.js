$(function() {
  var imgCap;
  const constraints = {
    audio: false,
    video: {
      width: {ideal: 720},
      height: {ideal: 720},
      facingMode: {ideal: 'environment'}
    },
  };
  $('html').addClass('has-navbar-fixed-bottom');
  $('#right').addClass('inactive');

  function camera() {
    $('canvas').remove();
    $('#right').addClass('inactive');
    $('#center').removeClass('inactive').css('background-color', 'transparent');
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      $('#camera').remove();
      $('body').append('<video autoplay id="camera"></video>');
      $('#camera').css('padding', 0);
      var video = document.querySelector('video');
      video.srcObject = stream;

      const track = stream.getVideoTracks()[0];
      imgCap = new ImageCapture(track);
    }).catch(function(err) {
      console.log(err);
      alert('An error occurred while accessing your device\'s camera');
      $('video').remove();
      $('#center').addClass('inactive').css('background-color', 'transparent');
      $('body').append('<div id="camera"></div>')
      $('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></span></div>');
      $('#warning').append('LinEase had a problem accessing your device\'s camera. Please refresh and try again.<br>If problem persists, we recommend changing browsers. For more browser feature supports, use Google Chrome.');
    });
  }

  if (!Modernizr.getusermedia) {
    alert('Your browser does not support getUserMedia according to Modernizr.');
    $('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-ban fa-stack-2x"></i></span></span></div>');
    $('#warning').append('LinEase cannot access your device\'s camera through this broswer. We recommend Google Chrome for more browser feature supports.');
    $('#center').addClass('inactive').css('background-color', 'transparent');
  } else {
    camera();
  }

  $('#center').click(function() {
    if ( !$('canvas').length ) {
      $('body').append('<canvas></canvas>');
      $('#right').removeClass('inactive');
      const canvas = document.querySelector('canvas');
      imgCap.grabFrame()
      .then(imageBitmap => {
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
        $('#licon').removeClass('fa-times').addClass('fa-redo-alt');
      }).catch(error => {
        console.log(error);
        alert('An error occurred while capturing the image. Please refresh and try again.');
        $('canvas').remove();
        $('body').append('<div id="camera"></div>');
        $('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></span></div>');
        $('#warning').append('LinEase encountered an error while capturing your image. Please refresh the page and try again.<br>If problem persists, please contact us at rndccss@gmail.com');
        $('#right').addClass('inactive');
      });
      $('video').remove();
    }
  });

  $('#left').click(function() {
    if ( $('#licon').hasClass('fa-times') ) {
      // Localhost Computer
      window.location.href = "/linease/public/";
      // Server
      // window.location.href = "/linease-alpha/";
    } else {
      camera();
      $('#licon').removeClass('fa-redo-alt').addClass('fa-times');
    }
  });
});