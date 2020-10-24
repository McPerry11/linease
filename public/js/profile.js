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
    for (let i in inputs) {
      if (inputs[i] == false) {
        $('#submit').attr('disabled', true);
        break;
      }
    }
  }

  var inputs = {'username':true, 'email':true, 'phone':true};

  $('.pageloader .title').text('Loading Profile');
  $('html').removeClass('has-navbar-fixed-top');
  $('.navbar').removeClass('is-fixed-top');
  $('.content.navbar-item h3').text('Profile');
  $('#back').attr('title', 'Go back to dashboard');

  $('#username input').bind({
    keydown: function(e) {
      if (e.shiftKey) {
        if (e.which == 189)
          return true;
      } else if (((e.which > 47 && e.which < 58) || e.which == 190) && e.shiftKey == false) {
        return true;
      }
      if ((e.which > 96 && e.which < 123) || (e.which > 64 && e.which < 90) || e.which < 32 || (e.which > 126 && e.which < 160) || (e.which < 41 && e.which > 32))
        return true;
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

  $('#phone input').bind({
    keydown: function(e) {
      if (((e.which > 47 && e.which < 58) && e.shiftKey == false) || e.which < 32 || (e.which > 32 && e.which < 41))
        return true;
      return false;
    }
  });

  $('#back').click(function() {
    $('.pageloader .title').text('Loading Dashboard');
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
        break;

        case 'security':
        $('#profile_content').addClass('is-hidden');
        break;

        case 'reports':
        $('#profile_content').addClass('is-hidden');
        break;
      }
    }
  });

  $('#edit').click(function() {
    $(this).slideUp();
    $('.level-right').slideUp();
    $('.field-body').slideDown();
    $('#actions').slideDown().css('display', 'flex');
  });

  $('#cancel').click(function() {
    $('#edit').slideDown();
    $('.level-right').slideDown();
    $('.field-body').slideUp();
    $('#actions').slideUp();
    $('#lastname').val($('#lastname').attr('data-val'));
    $('#firstname').val($('#firstname').attr('data-val'));
    $('#middlename').val($('#middlename').attr('data-val'));
    $('#username input').val($('#username input').attr('data-val'));
    $('#email input').val($('#email input').attr('data-val'));
    $('#city').val($('#city').attr('data-val'));
    $('#phone input').val($('#phone input').attr('data-val'));
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
  });

  $('#phone input').keyup(function() {
    if (!$('#submit').hasClass('is-loading')) {
      if (!$('#phone').hasClass('is-loading')) {
        $('#submit').removeAttr('disabled');
        $('#phone-warning').text('');
        $(this).removeClass('is-success').removeClass('is-danger');
      }
    }
  });

  $('#phone input').focusout(function() {
    if (!$('#submit').hasClass('is-loading')) {
      $('#phone').addClass('is-loading');
      $(this).attr('readonly', true);
      let expr = /^[0-9]{10}$/, phone = $(this).val();
      inputs['phone'] = false;
      checkInputs(inputs);
      if (phone == '') {
        $('#phone-warning').text('Email Address cannot be empty');
        $(this).addClass('is-danger').removeAttr('readonly');
        $('#phone').removeClass('is-loading');
      } else if (expr.test(phone)) {
        $.ajax({
          type: 'POST',
          url: $('#js').data('user') + '/profile',
          data: {data:'phone', phone:phone},
          datatype: 'JSON',
          success: function(response) {
            $('#phone').removeClass('is-loading');
            if (response.status == 'success') {
              inputs['phone'] = true;
              $('#phone-warning').text('');
              $('#phone input').removeClass('is-danger').addClass('is-success').removeAttr('readonly');
            } else {
              $('#phone input').addClass('is-danger').removeAttr('readonly');
              $('#phone-warning').text(response.msg);
            }
            checkInputs(inputs);
          },
          error: function(err) {
            ajaxError(err);
            $('#phone input').removeAttr('readonly');
            $('#phone').removeClass('is-loading');
            checkInputs(inputs);
          }
        });
      } else {
        $('#phone-warning').text('Invalid phone number');
        $(this).addClass('is-danger').removeAttr('readonly');
        $('#phone').removeClass('is-loading');
      }
    }
  });

  $('#profile_form').submit(function(e) {
    e.preventDefault();
    $('#submit').addClass('is-loading');
    $('#actions button').attr('disabled', true);
    $('input').attr('readonly', true);
    var username = $('#username input').val(), firstname = $('#firstname').val(), lastname = $('#lastname').val(), middlename = $('#middlename').val();
    var email = $('#email input').val(), phone = $('#phone input').val(), city = $('#city').val(), birthdate = $('#birthdate').val();
    var data = {'username':username, 'firstname':firstname, 'lastname':lastname, 'middlename':middlename, 'email':email, 'phone':phone, 'city':city, 'birthdate':birthdate};
    $.ajax({
      type: 'POST',
      url: $('#js').data('user') + '/profile/update',
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
              $('#city').val(data.data.city);
              $('#phone-label').text('0' + data.data.phone);
              $('#phone input').val(data.data.phone);
              $('#birthdate-label').text(data.date);
              $('#birthdate').val(data.data.birthdate);

              $('#lastname').attr('data-val', data.data.lastname);
              $('#firstname').attr('data-val', data.data.firstname);
              $('#middlename').attr('data-val', data.data.middlename);
              $('#username input').attr('data-val', data.data.username);
              $('#email input').attr('data-val', data.data.email);
              $('#phone input').attr('data-val', data.data.phone);
              $('#city').attr('data-val', data.data.city);
              $('#birthdate').attr('data-val', data.data.birthdate);

              $('#edit').slideDown();
              $('.level-right').slideDown();
              $('.field-body').slideUp();
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
});
