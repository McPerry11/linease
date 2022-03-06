function obAJAX() {
  $.ajax({
    type: 'POST',
    url: `${$('#js').data('auth')}/update`,
    data: {tab:'ob', module:'profile'},
    datatype: 'JSON',
    error: function(err) {
      console.error(err);
      obAJAX();
    }
  });
}

var introbtn;

$(window).on('load', function() {
  $('.title').text('');
  $('.pageloader').removeClass('is-active');
  if ($('#js').data('user') == $('#js').data('auth')) {
    if ($('#js').data('ob') == 0) {
      introJs().setOptions({
        disableInteraction: true,
        showBullets: false,
        exitOnOverlayClick: false,
        exitOnEsc: false,
        steps: [{
          title: 'Profile',
          intro: 'This is your profile module! Here you can manage your information, security, and reports. Let\'s start personalizing your LinEase profile!'
        },
        {
          element: document.querySelector('#avatar'),
          title: 'Profile Picture',
          intro: 'Here you can change your profile picture. Everyone can see your picture if they visit your profile. You can upload PNG, JPG, and JPEG images. You can even upload animated GIFs! Just remember that your file size cannot exceed 5MB.'
        },
        {
          element: document.querySelector('.tabs'),
          title: 'Tabs',
          intro: 'Your profile is divided into 3 parts: Profile Information, Security, and Reports. Use these tabs to navigate in your profile!'
        },
        {
          element: document.querySelector('#profile_content'),
          title: 'Profile Information',
          intro: 'Here you can see your profile information. This part is hidden to visitors of your profile.'
        },
        {
          element: document.querySelector('#edit'),
          title: 'Edit Profile',
          intro: 'To edit your profile, click on this button. This will be your first step to be able to submit reports!',
        }]
      }).start().onafterchange(function() {
        if ($('.introjs-tooltip-title').text() == 'Profile Information') {
          setTimeout(function() {
            if (introbtn == 'next') {
              $('.introjs-arrow').removeClass('top-middle').addClass('top-right');
              $('.introjs-tooltip').css('left', '-150px');
            }
          }, 400);
        }
      }).oncomplete(function() {
        $('#security a').click();
        setTimeout(function() {
          introJs().setOptions({
            disableInteraction: true,
            showBullets: false,
            exitOnOverlayClick: false,
            exitOnEsc: false,
            steps: [{
              element: document.querySelector('#security_content'),
              title: 'Security',
              intro: 'Here you can see the security tab. This part is also hidden to visitors of your profile. There\'s nothing much to do here, but you can change your password any time.'
            },
            {
              element: document.querySelector('#change'),
              title: 'Change Password',
              intro: 'You can change your password by clicking this button.'
            }]
          }).start().oncomplete(function() {
            $('#reports a').click();
            setTimeout(function() {
              introJs().setOptions({
                disableInteraction: true,
                showBullets: false,
                exitOnOverlayClick: false,
                exitOnEsc: false,
                steps: [{
                  element: document.querySelector('#reports_content'),
                  title: 'Reports',
                  intro: 'Here you can see the reports tab. Every report that you submit will be listed here. This part will be visible to visitors of your profile. You can click the report to see the details that you\'ve submitted!'
                }]
              }).start().oncomplete(function() {
                $('#profile a').click();
                obAJAX();
              });
            }, 400);
          });
        }, 400);
      });
    }
  }
});

$(function() {
  function ajaxError(err) {
    console.error(err);
    Swal.fire({
      icon: 'error',
      title: 'Cannot Connect to Server',
      text: 'Something went wrong. Please try again later.'
    });
  }

  function checkInputs(inputs) {
    $('#submit').removeAttr('disabled');
    $('#sec-actions button[type="submit"]').removeAttr('disabled');
    for (let input of inputs) {
      if (input == false) {
        if ($('#profile').hasClass('is-active'))
          $('#submit').attr('disabled', true);
        else
          $('#sec-actions button[type="submit"]').attr('disabled', true);
        break;
      }
    }
  }

  var inputs = {'username':true, 'email':true, 'phone':true};
  var passwords = {'current':true, 'new':true, 'confirm':true};

  $('.title').text('Loading Profile');
  $('html').removeClass('has-navbar-fixed-top');
  $('.navbar').removeClass('is-fixed-top');
  $('.content.navbar-item h3').text('Profile');
  if ($('#js').data('user') == $('#js').data('auth')) {
    if ($('#city').data('val').length) {
      $('#city').find('option[value="' + $('#city').data('val') + '"]').attr('selected', true);
      $('#city').find('option[value=""]').remove();
    }
  }

  // $('#username input').bind({
  //   keydown: function(e) {
  //     if (e.shiftKey == true) {
  //       if (e.which == 189 || (e.which >= 65 && e.which <= 90) || e.which <= 40)
  //         return true;
  //     } else if (e.shiftKey == false && ((e.which >= 48 && e.which <= 57) || e.which == 190)) {
  //       return true;
  //     } else if ((e.which >= 65 && e.which <= 90) || e.which <= 40 || (e.which >= 96 && e.which <= 105) || (e.which >= 112 && e.which <= 123)) {
  //       return true;
  //     }
  //     return false;
  //   }
  // });

  // $('#email input').bind({
  //   keydown: function(e) {
  //     if (e.shiftKey) {
  //       if (e.which == 189 || e.which == 50)
  //         return true;
  //     } else if (((e.which > 47 && e.which < 58) || e.which == 190) && e.shiftKey == false) {
  //       return true;
  //     }
  //     if ((e.which > 96 && e.which < 123) || (e.which > 64 && e.which < 90) || e.which < 32 || (e.which > 126 && e.which < 160) || (e.which < 41 && e.which > 32))
  //       return true;
  //     return false;
  //   }
  // });

  // $('#phone input').bind({
  //   keydown: function(e) {
  //     if (((e.which > 47 && e.which < 58) && e.shiftKey == false) || e.which < 32 || (e.which > 32 && e.which < 41))
  //       return true;
  //     return false;
  //   }
  // });
  
  $(document).on('click', '.introjs-prevbutton', function() {
    introbtn = 'previous';
  });

  $(document).on('click', '.introjs-nextbutton', function() {
    introbtn = 'next';
  });

  $('#back').click(function() {
    $('.title').text(`Loading ${$('#navbar-back').data('link')}`);
    $('.pageloader').addClass('is-active');
  });

  $('.tabs a').click(function() {
    let content = $(this).parent().attr('id');
    if (!$(`#${content}`).hasClass('is-active')) {
      $('.tabs li').removeClass('is-active');
      $(`#${content}`).addClass('is-active');
      switch (content) {
        case 'profile':
        $('#profile_content').removeClass('is-hidden');
        $('#security_content').addClass('is-hidden');
        $('#reports_content').addClass('is-hidden');
        break;

        case 'security':
        $('#profile_content').addClass('is-hidden');
        $('#security_content').removeClass('is-hidden');
        $('#reports_content').addClass('is-hidden');
        break;

        case 'reports':
        $('#profile_content').addClass('is-hidden');
        $('#security_content').addClass('is-hidden');
        $('#reports_content').removeClass('is-hidden');
        break;
      }
    }
  });

  $('#edit').click(function() {
    $(this).slideUp();
    $('.level-right').slideUp();
    $('#profile_content .field-body').slideDown();
    $('#actions').slideDown().css('display', 'flex');
  });

  $('#cancel').click(function() {
    $('#edit').slideDown();
    $('.level-right').slideDown();
    $('#profile_content .field-body').slideUp();
    $('#actions').slideUp();
    $('#lastname').val($('#lastname').attr('data-val'));
    $('#firstname').val($('#firstname').attr('data-val'));
    $('#middlename').val($('#middlename').attr('data-val'));
    $('#username input').val($('#username input').attr('data-val'));
    $('#email input').val($('#email input').attr('data-val'));
    if ($('#city').attr('data-val').length) {
      $('#city option[value="' + $('#city').attr('data-val') + '"]').prop('selected', true);
    } else {
      $('#city').prepend(`<option value="" selected disabled>Choose your city</option>`);
      $('#city option[value=""]').prop('selected', true);
    }
    // $('#phone input').val($('#phone input').attr('data-val'));
    $('#birthdate').val($('#birthdate').attr('data-val'));
    $('input').removeClass('is-success').removeClass('is-danger').removeAttr('readonly');
    $('#submit').removeAttr('disabled');
    $('control').removeClass('is-loading');
    $('#username-warning').text('');
    $('#email-warning').text('');
    $('#phone-warning').text('');
  });

  $('#username input').keyup(function() {
    if (!$('#submit').hasClass('is-loading')) {
      if (!$('#username').hasClass('is-loading')) {
        $('#submit').removeAttr('disabled');
        $('#username-warning').text('');
        $(this).removeClass('is-success').removeClass('is-danger');
      }
    }
  });

  $('#username input').focusout(function() {
    if (!$('#submit').hasClass('is-loading')) {
      if (!$('#username').hasClass('is-loading')) {
        $('#username').addClass('is-loading');
        $(this).attr('readonly', true);
        let expr = /^(?=.{5,20})[\w\.]*[a-z0-9]+[\w\.]*$/i, username = $(this).val();
        inputs['username'] = false;
        checkInputs(inputs);
        if (username == '') {
          $('#username-warning').text('Username cannot be empty');
          $(this).addClass('is-danger').removeAttr('readonly');
          $('#username').removeClass('is-loading');
        } else if (expr.test(username)) {
          $.ajax({
            type: 'POST',
            url: $('#js').data('user') + '/profile',
            data: {data:'username', username:username},
            datatype: 'JSON',
            success: function(response) {
              $('#username').removeClass('is-loading');
              if (response.status == 'success') {
                inputs['username'] = true;
                $('#username-warning').text('');
                $('#username input').removeClass('is-danger').addClass('is-success').removeAttr('readonly');
              } else {
                $('#username input').addClass('is-danger').removeAttr('readonly');
                $('#username-warning').text(response.msg);
              }
              checkInputs(inputs);
            },
            error: function(err) {
              ajaxError(err);
              $('#username input').removeAttr('readonly');
              $('#username').removeClass('is-loading');
              checkInputs(inputs);
            }
          });
        } else {
          $('#username-warning').text('Username must be between 5 to 20 characters with at least 1 alphanumeric character');
          $(this).addClass('is-danger').removeAttr('readonly');
          $('#username').removeClass('is-loading');
        }
      }
    }
  });

  $('#email input').keyup(function() {
    if (!$('#submit').hasClass('is-loading')) {
      if (!$('#email').hasClass('is-loading')) {
        $('#submit').removeAttr('disabled');
        $('#email-warning').text('');
        $(this).removeClass('is-success').removeClass('is-danger');
      }
    }
  });

  $('#email input').focusout(function() {
    if (!$('#submit').hasClass('is-loading')) {
      if (!$('#email').hasClass('is-loading')) {
        $('#email').addClass('is-loading');
        $(this).attr('readonly', true);
        let expr = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, email = $(this).val();
        inputs['email'] = false;
        checkInputs(inputs);
        if (email == '') {
          $('#email-warning').text('Email Address cannot be empty');
          $(this).addClass('is-danger').removeAttr('readonly');
          $('#email').removeClass('is-loading');
        } else if (expr.test(email)) {
          $.ajax({
            type: 'POST',
            url: $('#js').data('user') + '/profile',
            data: {data:'email', email:email},
            datatype: 'JSON',
            success: function(response) {
              $('#email').removeClass('is-loading');
              if (response.status == 'success') {
                inputs['email'] = true;
                $('#email-warning').text('');
                $('#email input').removeClass('is-danger').addClass('is-success').removeAttr('readonly');
              } else {
                $('#email input').addClass('is-danger').removeAttr('readonly');
                $('#email-warning').text(response.msg);
              }
              checkInputs(inputs);
            },
            error: function(err) {
              ajaxError(err);
              $('#email input').removeAttr('readonly');
              $('#email').removeClass('is-loading');
              checkInputs(inputs);
            }
          });
        } else {
          $('#email-warning').text('Invalid email address');
          $(this).addClass('is-danger').removeAttr('readonly');
          $('#email').removeClass('is-loading');
        }
      }
    }
  });

  $('#city').change(function() {
    $(this).find('option[value=""]').remove();
  });

  // $('#phone input').keyup(function() {
  //   if (!$('#submit').hasClass('is-loading')) {
  //     if (!$('#phone').hasClass('is-loading')) {
  //       $('#submit').removeAttr('disabled');
  //       $('#phone-warning').text('');
  //       $(this).removeClass('is-success').removeClass('is-danger');
  //     }
  //   }
  // });

  // $('#phone input').focusout(function() {
  //   if (!$('#submit').hasClass('is-loading')) {
  //     $('#phone').addClass('is-loading');
  //     $(this).attr('readonly', true);
  //     let expr = /^[0-9]{10}$/, phone = $(this).val();
  //     inputs['phone'] = false;
  //     checkInputs(inputs);
  //     if (phone == '') {
  //       $('#phone-warning').text('Email Address cannot be empty');
  //       $(this).addClass('is-danger').removeAttr('readonly');
  //       $('#phone').removeClass('is-loading');
  //     } else if (expr.test(phone)) {
  //       $.ajax({
  //         type: 'POST',
  //         url: $('#js').data('user') + '/profile',
  //         data: {data:'phone', phone:phone},
  //         datatype: 'JSON',
  //         success: function(response) {
  //           $('#phone').removeClass('is-loading');
  //           if (response.status == 'success') {
  //             inputs['phone'] = true;
  //             $('#phone-warning').text('');
  //             $('#phone input').removeClass('is-danger').addClass('is-success').removeAttr('readonly');
  //           } else {
  //             $('#phone input').addClass('is-danger').removeAttr('readonly');
  //             $('#phone-warning').text(response.msg);
  //           }
  //           checkInputs(inputs);
  //         },
  //         error: function(err) {
  //           ajaxError(err);
  //           $('#phone input').removeAttr('readonly');
  //           $('#phone').removeClass('is-loading');
  //           checkInputs(inputs);
  //         }
  //       });
  //     } else {
  //       $('#phone-warning').text('Invalid phone number');
  //       $(this).addClass('is-danger').removeAttr('readonly');
  //       $('#phone').removeClass('is-loading');
  //     }
  //   }
  // });

  $('#profile_form').submit(function(e) {
    e.preventDefault();
    $('#submit').addClass('is-loading');
    $('#actions button').attr('disabled', true);
    $('input').attr('readonly', true);
    var username = $('#username input').val(), firstname = $('#firstname').val(), lastname = $('#lastname').val(), middlename = $('#middlename').val();
    var email = $('#email input').val(), city = $('#city').val(), birthdate = $('#birthdate').val();
    var data = {'username':username, 'firstname':firstname, 'lastname':lastname, 'middlename':middlename, 'email':email, 'city':city, 'birthdate':birthdate};
    $.ajax({
      type: 'POST',
      url: $('#js').data('user') + '/update',
      data: {tab:'profile', data:data},
      datatype: 'JSON',
      success: function(data) {
        $('#submit').removeClass('is-loading');
        $('#actions button').removeAttr('disabled');
        $('input').removeAttr('readonly');
        if (data.status == 'error') {
          Swal.fire({
            icon: 'error',
            title: data.msg
          });
          $(`#${data.data} input`).addClass('is-danger').focus();
          $(`#${data.data}-warning`).text(data.warn);
          inputs[data.data] = false;
          checkInputs(inputs);
        } else {
          Swal.fire({
            icon: 'success',
            title: data.msg,
            timer: 2500,
            showConfirmButton: false
          }).then(function() {
            if (data.data.username != $('#js').data('user')) {
              $('.title').text('Reloading Profile');
              $('.pageloader').addClass('is-active');
              window.location.href = data.data.username;
            } else {
              $('#name h4').text(data.name);
              $('#name p').text(`@${data.data.username}`);
              $('#name-label').text(data.name);
              $('#lastname').val(data.data.lastname);
              $('#firstname').val(data.data.firstname);
              $('#middlename').val(data.data.middlename);

              $('#username-label').text(data.data.username);
              $('#username input').val(data.data.username);
              $('#email-label') .text(data.data.email);
              $('#email input').val(data.data.email);
              $('#city-label').text(data.data.city);
              $('#city').attr('data-val', data.data.city);
              $('#city').find(`option[value="${data.data.city}"]`).prop('selected', true);
              // $('#phone-label').text('0' + data.data.phone);
              // $('#phone input').val(data.data.phone);
              $('#birthdate-label').text(data.date);
              $('#birthdate').val(data.data.birthdate);

              $('#lastname').attr('data-val', data.data.lastname);
              $('#firstname').attr('data-val', data.data.firstname);
              $('#middlename').attr('data-val', data.data.middlename);
              $('#username input').attr('data-val', data.data.username);
              $('#email input').attr('data-val', data.data.email);
              // $('#phone input').attr('data-val', data.data.phone);
              $('#city').attr('data-val', data.data.city);
              $('#birthdate').attr('data-val', data.data.birthdate);

              $('#edit').slideDown();
              $('.level-right').slideDown();
              $('#profile_content .field-body').slideUp();
              $('#actions').slideUp();
            }
          });
        }
      },
      error: function(err) {
        ajaxError(err);
        $('#submit').removeClass('is-loading');
        $('#actions button').removeAttr('disabled');
        $('input').removeAttr('readonly');
      }
    });
  });

  $('#change').click(function() {
    $('#change-pass-form').slideDown();
    $(this).slideUp();
  });

  $('#sec-actions button[type="button"]').click(function() {
    $('#change-pass-form').slideUp();
    $('#change').slideDown();
    $('#security_form input').removeClass('is-success').removeClass('is-danger').removeAttr('readonly');
    $('#security_form button[type="submit"]').removeAttr('disabled');
    $('#security_form .control').removeClass('is-loading');
    $('#security_form .help').text('');
    $('#security_form input').val('');
    if ($('#current').attr('type') == 'text' || $('#new').attr('type') == 'text' || $('#confirm').attr('type') == 'text') {
      $('#current').attr('type', 'password');
      $('#new').attr('type', 'password');
      $('#confirm').attr('type', 'password');
      $('.view').addClass('has-background-grey-light').removeClass('has-background-grey-dark');
      $('.view').find('.icon').removeClass('has-text-white');
      $('.view').find('svg').removeClass('fa-eye-slash').addClass('fa-eye');
    }
  });

  $('.view').click(function() {
    $(this).parent().prev().find('input').attr('type', $(this).parent().prev().find('input').attr('type') == 'password' ? 'text' : 'password');
    if ($(this).parent().prev().find('input').attr('type') == 'text') {
      $(this).removeClass('has-background-grey-lighter').addClass('has-background-grey-dark');
      $(this).find('.icon').addClass('has-text-white');
      $(this).find('svg').removeClass('fa-eye').addClass('fa-eye-slash');
    } else {
      $(this).addClass('has-background-grey-lighter').removeClass('has-background-grey-dark');
      $(this).find('.icon').removeClass('has-text-white');
      $(this).find('svg').removeClass('fa-eye-slash').addClass('fa-eye');
    }
  });

  $('#current').focusout(function() {
    if (!$('#sec-actions button[type="submit]').hasClass('is-loading')) {
      if (!$(this).parent().hasClass('is-loading')) {
        $(this).parent().addClass('is-loading');
        $(this).attr('readonly', true);
        let pass = $(this).val(), elem = this;
        passwords['current'] = false;
        checkInputs(passwords);
        $.ajax({
          type: 'POST',
          url: $('#js').data('user') + '/profile',
          data: {data:'current', password:pass},
          datatype: 'JSON',
          success: function(response) {
            $(elem).parent().removeClass('is-loading');
            $(elem).removeAttr('readonly');
            if (response.status == 'success') {
              $(elem).addClass('is-success');
              passwords['current'] = true;
              checkInputs(passwords);
            } else {
              $(elem).addClass('is-danger');
              $(elem).next().text(response.msg);
            }
          },
          error: function(err) {
            $(elem).parent().removeClass('is-loading');
            passwords['current'] = true;
            checkInputs(passwords);
            ajaxError(err);
          }
        });
      }
    }
  });

  $('#current').keyup(function() {
    if (!$('#sec-actions button[type="submit"]').hasClass('is-loading')) {
      if (!$(this).parent().hasClass('is-loading')) {
        $(this).removeClass('is-danger').removeClass('is-success');
        $(this).next().text('');
        passwords['current'] = true;
        checkInputs(passwords);
      }
    }
  });

  $('#new').focusout(function() {
    if (!$('#sec-actions button[type="submit]').hasClass('is-loading')) {
      if (!$(this).parent().hasClass('is-loading')) {
        if ($(this).val().length >= 8) {
          $(this).parent().addClass('is-loading');
          $(this).attr('readonly', true);
          let pass = $(this).val(), elem = this;
          passwords['new'] = false;
          checkInputs(passwords);
          $.ajax({
            type: 'POST',
            url: $('#js').data('user') + '/profile',
            data: {data:'new', password:pass},
            datatype: 'JSON',
            success: function(response) {
              $(elem).parent().removeClass('is-loading');
              $(elem).removeAttr('readonly');
              if (response.status == 'success') {
                $(elem).addClass('is-success');
                passwords['new'] = true;
                checkInputs(passwords);
              } else {
                $(elem).addClass('is-danger');
                $(elem).next().text(response.msg);
              }
            },
            error: function(err) {
              $(elem).parent().removeClass('is-loading');
              passwords['new'] = true;
              checkInputs(passwords);
              ajaxError(err);
            }
          });
        } else {
          $(this).addClass('is-danger');
          $(this).next().text('Password must be a minimum length of 8 characters');
          passwords['new'] = false;
          checkInputs(passwords);
        }
      }
    }
  });

  $('#new').keyup(function() {
    if (!$('#sec-actions button[type="submit"]').hasClass('is-loading')) {
      if (!$(this).parent().hasClass('is-loading')) {
        $(this).removeClass('is-danger').removeClass('is-success');
        $(this).next().text('');
        passwords['new'] = true;
        checkInputs(passwords);
      }
    }
  });

  $('#confirm').focusout(function() {
    if ($('#confirm').val() != $('#new').val()) {
      $(this).addClass('is-danger');
      $(this).next().text('Passwords don\'t match');
      passwords['confirm'] = false;
      checkInputs(passwords);
    } else {
      $(this).addClass('is-success');
    }
  });

  $('#confirm').keyup(function() {
    $(this).removeClass('is-danger').removeClass('is-success');
    $(this).next().text('');
    passwords['confirm'] = true;
    checkInputs(passwords);
  });

  $('#security_form').submit(function(e) {
    e.preventDefault();
    if ($('#current').attr('type') == 'text' || $('#new').attr('type') == 'text' || $('#confirm').attr('type') == 'text') {
      $('#current').attr('type', 'password');
      $('#new').attr('type', 'password');
      $('#confirm').attr('type', 'password');
      $('.view').addClass('has-background-grey-light').removeClass('has-background-grey-dark');
      $('.view').find('.icon').removeClass('has-text-white');
      $('.view').find('svg').removeClass('fa-eye-slash').addClass('fa-eye');
    }
    $('#sec-actions button[type="submit"]').addClass('is-loading');
    $('#security_form button').attr('disabled', true);
    $('#security_form input').attr('readonly', true);
    var newpass = $('#new').val();
    $.ajax({
      type: 'POST',
      url: $('#js').data('user') + '/update',
      data: {tab:'security', new:newpass},
      datatype: 'JSON',
      success: function(response) {
        $('#sec-actions button[type="submit"]').removeClass('is-loading');
        $('#security_form button').removeAttr('disabled');
        $('#security_form input').removeAttr('readonly');
        Swal.fire({
          icon: 'success',
          title: response.msg,
          showConfirmButton: false,
          timer: 2500
        }).then(function() {
          $('#sec-actions button[type="button"]').click();
          Swal.fire({
            icon: 'question',
            title: 'Want to try out your new password?',
            confirmButtonText: 'Yes, log out',
            showCancelButton: true,
            cancelButtonText: 'No, stay logged in'
          }).then((result) => {
            if (result.isConfirmed) {
              $('#logout').submit();
              $('.title').text('Logging Out');
              $('.pageloader').addClass('is-active');
            }
          });
        });
      },
      error: function(err) {
        ajaxError(err);
        $('#sec-actions button[type="submit"]').removeClass('is-loading');
        $('#security_form button').removeAttr('disabled');
        $('#security_form input').removeAttr('readonly');
      }
    });
  });

  $('.box').click(function() {
    var report_id = $(this).data('id');
    $('.modal').addClass('is-active');
    $.ajax({
      type: 'POST',
      url: 'report/' + report_id,
      datatype:'JSON',
      success: function(data) {
        var color;
        switch(data.severity) {
          case 'CRITICAL':
          color = '#4e1e73';
          break;
          case 'MAJOR':
          color = '#3598db';
          break;
          case 'MODERATE':
          color = '#9E1C21';
          break;
          case 'LIGHT':
          color = '#e8ca4d';
          break;
          case 'RESOLVED':
          color = '#087F38';
          break;
        }
        $('#report_date').text(data.date);
        $('#report_title').text(data.severity).css({'color': color});
        $('#report_address').text(data.address);
        $('#report_description').text(data.description);
        $('.modal img').attr('src', `${$('.modal img').data('base')}/${data.picture}`).attr('alt', `Report #${data.id}`);
        $('#loader').addClass('is-hidden');
        $('.modal-content').removeClass('is-hidden');
      },
      error: function(err) {
        console.error(err);
        $('.modal').removeClass('is-active');
        Swal.fire({
          icon: 'error',
          title: 'Cannot Connect to Server',
          text: 'Something went wrong. Please try again later.'
        });
      }
    });
  });

  $('.modal-background').click(function() {
    $('.modal').removeClass('is-active');
    $('#loader').removeClass('is-hidden');
    $('.modal-content').addClass('is-hidden');
  });

  $('#avatar').click(function() {
    if ($('#edit-avatar').data('user') == $('#edit-avatar').data('auth'))
      $('#edit-avatar input').val(null).click();
  });

  $('#edit-avatar input').change(function() {
    Swal.fire({
      html: '<span class="icon is-large"><i class="fas fa-circle-notch fa-spin fa-2x"></i></span>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    let image = $('#avatar img').attr('src');
    $('#avatar img').attr('src', $('#avatar img').data('placeholder'));
    let data = new FormData(document.getElementById('edit-avatar'));
    data.append('file', this.files[0]);
    $.ajax({
      type: 'POST',
      url: `${$('#edit-avatar').data('user')}/update`,
      data: data,
      contentType: false,
      processData: false,
      datatype: 'JSON',
      success: function(response) {
        $('#avatar img').attr('src', `${$('#avatar img').data('base')}/${response.avatar}`);
        Swal.fire({
          icon: 'success',
          title: response.msg,
          showConfirmButton: false,
          timer: 10000
        });
      },
      error: function(err) {
        console.error(err);
        $('#avatar img').attr('src', image);
        let title, text;
        if (err.status == 422) {
          title = 'Invalid File';
          text = 'Only upload PNG, JPG, JPEG, or GIF images with a maximum file size of 5MB.';
        } else if (err.status == 413) {
          title = 'Cannot Handle File Size';
          text = 'Please upload an image with a maximum file size of 5MB.';
        } else {
          title = 'Cannot Upload Image';
          text = 'Something went wrong. Please try again later.';
        }
        Swal.fire({
          icon: 'error',
          title: title,
          text: text,
          showConfirmButton: false,
          timer: 10000
        });
      }
    });
  });
});
