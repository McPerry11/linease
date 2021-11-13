var geocoder, tutorcam = tutorform = false, introbtn, introtxt;

function initMap() {
 geocoder = new google.maps.Geocoder();
}

$(function() {
  function obAJAX() {
    $.ajax({
      type: 'POST',
      url: `${$('#camjs').data('user')}/update`,
      data: {tab:'ob', module:'camera'},
      datatype: 'JSON',
      error: function(err) {
        console.error(err);
        obAJAX();
      }
    });
  }

  function camera() {
    $('canvas').remove();
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(stream) {
      $('#camera').remove();
      $('body').append('<video autoplay id="camera"></video>');
      $('#camera').css('padding', 0);
      var video = document.querySelector('video');
      video.srcObject = stream;

      const track = stream.getVideoTracks()[0];
      imgCap = new ImageCapture(track);
      $('.title').text('');
      $('.pageloader').removeClass('is-active');
      $('#center').removeAttr('disabled');
      if ($('#camjs').data('ob') == 0 && tutorcam == false) {
        tutorcam = true;
        introJs().setOptions({
          disableInteraction: true,
          showBullets: false,
          exitOnOverlayClick: false,
          exitOnEsc: false,
          steps: [{
            title: 'Camera',
            intro: 'This is the camera module. Here you will be submitting reports by taking a picture of the polluted location.'
          },
          {
            element: document.querySelector('#camera'),
            title: 'Camera View',
            intro: 'Make sure to take the picture of the polluted area and not something else. What you report will be seen by everyone!'
          },
          {
            element: document.querySelector('#left'),
            title: 'Back Button',
            intro: 'If you want to return to the dashboard, click the red X on the left side here. This will cancel your report and you will be returned to the dashboard.'
          },
          {
            element: document.querySelector('#center'),
            title: 'Capture',
            intro: 'To capture the polluted location you want to report, click the LinEase icon here. As an example, let\'s take a picture right now!'
          }
          ]
        }).start().oncomplete(function() {
          $('#center').click();
          setTimeout(function() {
            introJs().setOptions({
              disableInteraction: true,
              showBullets: false,
              exitOnOverlayClick: false,
              exitOnEsc: false,
              steps: [{
                element: document.querySelector('#left'),
                title: 'Retake',
                intro: 'Once a picture has been taken, the back button will become a retake button. If you want to retake the picture, click the retake button. Once clicked, this will return back into a back button.'
              },
              {
                element: document.querySelector('#right'),
                title: 'Submit Photo',
                intro: 'To proceed with the submission of report, click the green check mark on the right side. As an example, let\'s submit this photo right now!'
              }]
            }).start().oncomplete(function() {
              $('#right').click();
            });
          }, 400);
        });
      }
    }).catch(function(err) {
      $('.title').text('');
      $('.pageloader').removeClass('is-active');
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Cannot Access Device Camera',
        text: 'An error occurred while accessing your device\'s camera.',
        showConfirmButton: false,
        timer: 10000
      });
      $('video').remove();
      $('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></span></div>');
      $('#warning').append('LinEase had a problem accessing your device\'s camera. Please allow camera permissions for LinEase to work properly.');
    });
  }

  function gps_success (position) {
    $('.title').text('Initializing Camera');
    camera();
  }

  function gps_error (err) {
    console.warn(`Error ${err.code}: ${err.message}`);
    $('.title').text('');
    $('.pageloader').removeClass('is-active');
    Swal.fire({
      icon: 'error',
      title: 'Cannot Access Device Location',
      text: 'An error occurred while accessing your device\'s location.',
      showConfirmButton: false,
      timer: 10000
    });
    $('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-map-marker-alt fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></div>');
    if (err.code == err.PERMISSION_DENIED)
      $('#warning').append('LinEase cannot access your device\'s location. Please allow location permissions for LinEase to work properly.');
    else
      $('#warning').append('LinEase cannot access your device\'s location.');
  }

  var imgCap, w, h, lat, lng;
  const constraints = {
    audio: false,
    video: {
      width: {ideal: 720},
      height: {ideal: 720},
      facingMode: {exact: 'environment'}
    },
  };

  $('html').addClass('has-navbar-fixed-bottom');
  $('#center').attr('disabled', true);
  $('#right').addClass('inactive');
  // Create Custom Select Dropdown with Thumbnails
  $.widget('custom.iconselectmenu', $.ui.selectmenu, {
    _renderItem: function(ul, item) {
      var li = $('<li>'),
      wrapper = $('<div>', {
        text: item.label,
        'data-img': item.element.attr('data-img')
      });

      if (item.disabled)
        li.addClass('ui-state-disabled');

      $('<span>', {
        style: item.element.attr('data-style'),
        'class': `ui-icon ${item.element.attr('data-class')}`
      }).appendTo(wrapper);

      return li.append(wrapper).appendTo(ul);
    }
  });
  $('#severity').iconselectmenu().iconselectmenu('menuWidget').addClass('ui-menu-icons avatar');
  $('#severity-button').css('height', '40px');
  $('.modal-card-body').bind('touchmove', function(e) {
    if ($('.ui-selectmenu-menu').hasClass('ui-selectmenu-open'))
      e.preventDefault();
  });

  if (!Modernizr.getusermedia) {
  	Swal.fire({
  		icon: 'error',
      title: 'Cannot Access Device Camera',
      text: 'An error occurred while accessing your device\'s camera.',
      showConfirmButton: false,
      timer: 10000
    });
  	$('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-ban fa-stack-2x"></i></span></span></div>');
  	$('#warning').append('LinEase cannot access your device\'s camera.');
  } else {
  	$('.title').text('Initializing Geolocation');
    navigator.geolocation.getCurrentPosition(gps_success, gps_error);
  }

  $(document).on('click', '.introjs-prevbutton', function() {
    introbtn = 'previous';
  });

  $(document).on('click', '.introjs-nextbutton', function() {
    introbtn = 'next';
  });

  $(window).click(function() {
    if ($('.ui-selectmenu-menu').hasClass('ui-selectmenu-open'))
      $('.modal-card-body').addClass('no-scroll');
    else
      $('.modal-card-body').removeClass('no-scroll');
  });

  $('#center').click(function() {
  	if ($('#center').attr('disabled')) {
  		return false;
  	} else if (!$('canvas').length) {
  		$('body').append('<canvas></canvas>');
  		const canvas = document.querySelector('canvas');
  		try {
  			imgCap.grabFrame().then(imageBitmap => {
  				canvas.width = w = imageBitmap.width;
  				canvas.height = h = imageBitmap.height;
  				canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
  				$('#licon').removeClass('fa-times').addClass('fa-redo-alt');
          $('#right').removeClass('inactive');
        }).catch(err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Cannot Capture Image',
            text: 'An error occurred while capturing the image.',
            showConfirmButton: false,
            timer: 10000
          });
          $('canvas').remove();
          $('body').append('<div id="camera"></div>');
          $('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></span></div>');
          $('#warning').append('LinEase encountered an error while capturing your image.');
        });
        $('video').remove();
        $('#center').attr('disabled', true);
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Cannot Capture Image',
          text: 'An error occurred while capturing the image.',
          showConfirmButton: false,
          timer: 10000
        });
        $('canvas').remove();
        $('video').remove();
        $('body').append('<div id="camera"></div>');
        $('#camera').append('<div id="warning"><span class="icon is-large is-block">\n<span class="fa-stack fa-lg">\n<i class="fas fa-camera fa-stack-1x has-text-black"></i>\n<i class="fas fa-exclamation-triangle fa-stack-2x"></i></span></span></div>');
        $('#warning').append('LinEase encountered an error while capturing your image.');
      }
    }
  });

  $('#left').click(function() {	
  	if ($('#licon').hasClass('fa-times')) {	
      $('.pageloader').addClass('is-active');	
      $('.title').text('Loading Dashboard');	
      window.location.href = $('#camjs').data('link');
    } else {	
    	camera();
      $('.help').removeClass('has-text-danger').text('Latitude, Longitude, and Address cannot be edited.');
      $('#licon').removeClass('fa-redo-alt').addClass('fa-times');	
      $('#right').addClass('inactive');	
    }	
  });

  $('#right').click(function() {
  	if ($('#right').hasClass('inactive')) {
  		return false;
  	} else {
      $('#createReport').addClass('is-active');
      // HTML5 Geolocation
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        geocoder.geocode({'location':{lat:lat, lng:lng}}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK)
            $('#address').val(results[1].formatted_address);
          else
            $('.help').addClass('has-text-danger').text('Cannot fetch readable address.');
        });

        var canvas = document.querySelector('canvas');
        var img = canvas.toDataURL('image/jpeg', 1.0);

        $('#lat').val(lat);
        $('#lng').val(lng);
        $('#left').addClass('inactive');
        $('#right').addClass('inactive');
        $('#center').attr('disabled', true);
        $('#preview').attr('src', img);
        $('.icon.is-left img').attr('src', 'img/S4Label.png');
        $('#loader').addClass('is-hidden');
        $('.modal-card-body form').removeClass('is-hidden');
        if ($('#camjs').data('ob') == 0 && tutorform == false) {
          tutorform = true;
          introJs().setOptions({
            disableInteraction: true,
            showBullets: false,
            exitOnOverlayClick: false,
            exitOnEsc: false,
            steps: [{
              element: document.querySelector('#createReport'),
              title: 'Report Form',
              intro: 'This form will hold the details of your report. After submitting this form, your report will be displayed on the dashboard!'
            },
            {
              element: document.querySelector('#preview'),
              title: 'Preview',
              intro: 'This is the preview of the photo you have captured. This will serve as proof for your report!',
              position: 'bottom'
            },
            {
              element: document.querySelector('#auto'),
              title: 'Auto-Generated',
              intro: 'These fields are auto-generated by LinEase and cannot be edited.'
            },
            {
              element: document.querySelector('#severity_field'),
              title: 'Severity',
              intro: 'Here you will pick the severity of the report, ranging from Light, Moderate, Major, to Critical. Please try to be rational when selecting the severity. We trust your judgement!'
            },
            {
              element: document.querySelector('#description_field'),
              title: 'Description',
              intro: 'Enter other details of your report. This will add more credibility for your report!'
            },
            {
              title: 'Report Submission',
              intro: 'After submitting a report, the report will be added on the dashboard for everyone to see. We would really appreciate your contribution and we hope that you keep on reporting!'
            },
            {
              title: 'LinEase',
              intro: 'As we say with LinEase, we can linis with ease!'
            }]
          }).start().oncomplete(function() {
            $('#cancel').click();
            $('#left').click();
            obAJAX();
          });
        }
      }, function(err) {
        console.warn(`Error ${err.code}: ${err.message}`);
        Swal.fire({
          icon: 'error',
          title: 'Cannot Access Device Location',
          text: 'An error occurred while accessing your device\'s location.',
          showConfirmButton: false,
          timer: 10000
        });
      });
    }
  });

  $('body').click(function(e) {
  	var target = e.target;
  	if ($(target).hasClass('ui-menu-item-wrapper')) {
      let img = $(target).data('img');
      $('.icon.is-left img').attr('src', `img/${img}`);
    }
  });

  $('#cancel').click(function() {
  	$('.modal').removeClass('is-active');
    $('#loader').removeClass('is-hidden');
    $('.modal-card-body form').addClass('is-hidden');
    $('#left').removeClass('inactive');
    $('#right').removeClass('inactive');
  });

  $('form').submit(function(e) {
  	e.preventDefault();
  	$('#submit').addClass('is-loading');
  	$('#cancel').attr('disabled', true);
  	var des = $('#description').val();
    var img = $('#preview').attr('src');
    var add = $('#address').val();
    var sev = $('.ui-selectmenu-text').text().toUpperCase();
    $.ajax({
      type: 'POST',
      url: 'camera',
      data: {lat:lat, lng:lng, sev:sev, des:des, img:img, add:add},
      datatype: 'JSON',
      success: function(response) {
        $('#submit').removeClass('is-loading').attr('disabled', true);
        Swal.fire({
          icon: 'success',
          title: response,
          showConfirmButton: false,
          timer: 2500,
        }).then(function() {
          $('.title').text('Redirecting to Dashboard');
          $('.pageloader').addClass('is-active');
          window.location.href = $('#camjs').data('link');
        });
      },
      error: function(err) {
        console.error(err);
        $('#submit').removeClass('is-loading');
        $('#cancel').removeAttr('disabled');
        Swal.fire({
          icon: 'error',
          title: 'Cannot Upload Report',
          text: 'Something went wrong. Please try again later.',
          showConfirmButton: false,
          timer: 10000
        });
      }
    });
  });
});
