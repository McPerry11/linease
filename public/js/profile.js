$(function() {
  function ajaxError(err) {
    console.log(err);
    Swal.fire({
      icon: 'error',
      title: 'Cannot Connect to Server',
      text: 'Something went wrong. Please try again later.'
    });
  }

  function checkInputs(inputs) {
    $('#submit').removeAttr('disabled');
    $('#sec-actions button[type="submit"]').removeAttr('disabled');
    for (let i in inputs) {
      if (inputs[i] == false) {
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

  $('.pageloader .title').text('Loading Profile');
  $('html').removeClass('has-navbar-fixed-top');
  $('.navbar').removeClass('is-fixed-top');
  $('.content.navbar-item h3').text('Profile');
  if ($('#city').data('val').length) {
    $('#city').find('option[value="' + $('#city').data('val') + '"]').attr('selected', true);
    $('#city').find('option[value=""]').remove();
  }

  $('#username input').bind({
    keydown: function(e) {
      if (e.shiftKey == true) {
        if (e.which == 189 || (e.which >= 65 && e.which <= 90) || e.which <= 40)
          return true;
      } else if (e.shiftKey == false && ((e.which >= 48 && e.which <= 57) || e.which == 190)) {
        return true;
      } else if ((e.which >= 65 && e.which <= 90) || e.which <= 40 || (e.which >= 96 && e.which <= 105) || (e.which >= 112 && e.which <= 123)) {
        return true;
      }
      return false;
    }
  });

  $('#email input').bind({
    keydown: function(e) {
      if (e.shiftKey) {
        if (e.which == 189 || e.which == 50)
          return true;
      } else if (((e.which > 47 && e.which < 58) || e.which == 190) && e.shiftKey == false) {
        return true;
      }
      if ((e.which > 96 && e.which < 123) || (e.which > 64 && e.which < 90) || e.which < 32 || (e.which > 126 && e.which < 160) || (e.which < 41 && e.which > 32))
        return true;
      return false;
    }
  });

  // $('#phone input').bind({
  //   keydown: function(e) {
  //     if (((e.which > 47 && e.which < 58) && e.shiftKey == false) || e.which < 32 || (e.which > 32 && e.which < 41))
  //       return true;
  //     return false;
  //   }
  // });

  $('#back').click(function() {
    let title = $('#navbar-back').data('link') ?? 'Dashboard';
    $('.pageloader .title').text('Loading ' + title);
    $('.pageloader').addClass('is-active');
  });

  $('.tabs a').click(function() {
    let content = $(this).parent().attr('id');
    if (!$('#' + content).hasClass('is-active')) {
      $('.tabs li').removeClass('is-active');
      $('#' + content).addClass('is-active');
      switch (content){
        case 'profile':
        $('#profile_content').removeClass('is-hidden');
        $('#security_content').addClass('is-hidden');
        break;

        case 'security':
        $('#profile_content').addClass('is-hidden');
        $('#security_content').removeClass('is-hidden');
        break;

        case 'reports':
        $('#profile_content').addClass('is-hidden');
        $('#security_content').addClass('is-hidden');
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
    if ($('#city').data('val').length) {
      $('#city').find('option[value="' + $('#city').attr('data-val') + '"]').attr('selected', true);
    } else {
      $('#city').prepend(`<option value="" selected disabled>Choose your city</option>`);
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
          $('#' + data.data + ' input').addClass('is-danger').focus();
          $('#' + data.data + '-warning').text(data.warn);
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
              $('.pageloader .title').text('Reloading Profile');
              $('.pageloader').addClass('is-active');
              window.location.href = data.data.username;
            } else {
              $('#name h4').text(data.name);
              $('#name p').text('@' + data.data.username);
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
              $('#city').find('option[value="' + data.data.city + '"]').attr('selected', true);
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
            console.log(result.isConfirmed);
            if (result.isConfirmed) {
              $('#logout').submit();
              $('.pageloader .title').text('Logging Out');
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
});
