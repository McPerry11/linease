function obAJAX() {
  $.ajax({
    type: 'POST',
    url: `${$('#accounts').data('user')}/update`,
    data: {tab:'ob', module:'accounts'},
    datatype: 'JSON',
    error: function(err) {
      console.error(err);
      obAJAX();
    }
  });
}

$(window).on('load', function() {
  $('.title').text('');
  $('.pageloader').removeClass('is-active');
  if ($('#accounts').data('ob') == 0) {
    introJs().setOptions({
      disableInteraction: true,
      showBullets: false,
      exitOnOverlayClick: false,
      exitOnEsc: false,
      steps: [{
        title: 'Accounts',
        intro: 'This is your accounts module. Get started in building your team here!'
      },
      {
        element: document.querySelector('#add'),
        title: $('#add').find('span:last-child()').text(),
        intro: `Click the add button to start adding ${$('#accounts').data('role')} accounts.`
      }
      ]
    }).start().oncomplete(function() {
      $('#add').click();
      setTimeout(function() {
        introJs().setOptions({
          disableInteraction: true,
          showBullets: false,
          exitOnOverlayClick: false,
          exitOnEsc: false,
          steps: [{
            element: document.querySelector('.modal'),
            title: 'Form',
            intro: `Complete the ${$('#accounts').data('role')}'s details in this form to start building your team!`
          }]
        }).start().oncomplete(function() {
          obAJAX();
        });
      }, 400);
    });
  }
});

$(function() {
  var inputs = {'username':true, 'email':true, 'phone':true}, action, account;

  $('.title').text('Loading Accounts');
  $('html').removeClass('has-navbar-fixed-top');
  $('.navbar').removeClass('is-fixed-top');
  $('.content.navbar-item h3').text('Accounts');
  $('#back').attr('title', 'Go back to dashboard');


  $(document).on('click', '.introjs-prevbutton', function() {
    introbtn = 'previous';
  });

  $(document).on('click', '.introjs-nextbutton', function() {
    introbtn = 'next';
  });

  $('#add').click(function() {
    action = 'add';
    $('#loader').addClass('is-hidden');
    $('.modal-content').removeClass('is-hidden');
    $('.field-pass').removeClass('is-hidden');
    $('#password').attr('required', true);
    $('#confirm').attr('required', true);
    $('.modal input').val('');
    $('.modal').addClass('is-active');
  });

  $('.acc-edit').click(function() {
    action = 'edit';
    $('.modal').addClass('is-active');
    $('.field-pass').addClass('is-hidden');
    $('#password').removeAttr('required');
    $('#confirm').removeAttr('required');
    account = $(this).data('user');
    $.ajax({
      type: 'POST',
      url: `${account}/profile`,
      data: {data:'user'},
      datatype: 'JSON',
      success: function(data) {
        $('#username').val(data.username);
        $('#firstname').val(data.firstname);
        $('#lastname').val(data.lastname);
        $('#email').val(data.email);
        $('')
        $('#loader').addClass('is-hidden');
        $('.modal-content').removeClass('is-hidden');
      },
      error: function(err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Cannot Get Account Details',
          text: 'Please try agian later.',
          showConfirmButton: false,
          timer: 10000
        });
        $('.modal').removeClass('is-active');
      }
    });
  });

  $('.acc-delete').click(function() {
    Swal.fire({
      html: '<span class="icon is-large"><i class="fas fa-circle-notch fa-spin fa-2x"></i></span>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    let username = $(this).data('user');
    $.ajax({
      type: 'POST',
      url: `${username}/profile`,
      data: {data:'user'},
      datatype: 'JSON',
      success: function(data) {
        let role = data.type == 'ADMIN' ? 'Admin' : 'Facilitator';
        Swal.fire({
          icon: 'warning',
          title: `Delete ${role} Account?`,
          text: `This action is irreversible. Do you wish to remove ${username}?`,
          confirmButtonText: 'Yes',
          showCancelButton: true,
          cancelButtonText: 'Cancel',
          reverseButtons: true
        }).then((result) => {
          if (result.value) {
            Swal.fire({
              title: 'Deleting Account',
              html: '<span class="icon is-large"><i class="fas fa-spin fa-circle-notch fa-2x"></i></span>',
              showConfirmButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false
            });
            $.ajax({
              type: 'POST',
              url: `${username}/delete`,
              datatype: 'JSON',
              success: function(response) {
                Swal.fire({
                  icon: 'success',
                  title: 'Account Deleted',
                  showConfirmButton: false,
                  timer: 10000
                }).then(function() {
                  $('.title').text('Reloading Accounts');
                  $('.pageloader').addClass('is-active');
                  window.location.href = $('#accounts').data('link');
                });
              },
              error: function(err) {
                console.error(err);
                Swal.fire({
                  icon: 'error',
                  title: 'Cannot Connect to Server',
                  text: 'Something went wrong. Please try again later.',
                  showConfirmButton: false,
                  timer: 10000
                });
              }
            });
          }
        });
      },
      error: function(err) {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Cannot Get Account Details',
          text: 'Please try agian later.',
          showConfirmButton: false,
          timer: 10000
        });
      }
    });
  });

  $('#cancel').click(function() {
    $('.modal').removeClass('is-active');
    $('#loader').removeClass('is-hidden');
    $('.modal-content').addClass('is-hidden');
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

  $('#submit').click(function() {    
    let username = $('#username').val();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let email = $('#email').val();
    let pass = $('#pass').val();
    let confirm = $('#confirm').val();
    Swal.fire({
      html: '<span class="icon is-large"><i class="fas fa-spin fa-circle-notch fa-2x"></i></span>',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    if (action == 'add') {
      if (username && firstname && lastname && email && pass && confirm) {
        $.ajax({
          type: 'POST',
          url: 'register',
          data: {data:'accounts', username:username, firstname:firstname, lastname:lastname, email:email, password:pass, confirm:confirm},
          datatype: 'JSON',
          success: function(response) {
            if (response.status == 'error') {
              Swal.fire({
                icon: response.status,
                title: response.msg,
                showConfirmButton: false,
                timer: 10000
              }).then(function() {
                if (response.status == 'error') {
                  $(`#${response.data}`).focus();
                }
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: response.msg,
                showConfirmButton: false,
                timer: 10000
              }).then(function() {
                $('.title').text('Reloading Accounts');
                $('.pageloader').addClass('is-active');
                window.location.href = $('#accounts').data('link');
              });
            }
          },
          error: function(err) {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Cannot Connect to Server',
              text: 'Something went wrong. Please try again later.'
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Incomplete Form',
          text: 'Please complete all of the fields before submitting.',
          showConfirmButton: false,
          timer: 10000
        });
      }
    } else {
      if (username && firstname && lastname && email) {
        let data = {'username':username, 'firstname':firstname, 'lastname':lastname, 'email':email};
        $.ajax({
          type: 'POST',
          url: `${account}/update`,
          data: {tab:'profile', data:data, module:'accounts'},
          datatype: 'JSON',
          success: function(response) {
            if (response.status == 'error') {
              Swal.fire({
                icon: response.status,
                title: response.msg,
                showConfirmButton: false,
                timer: 10000
              }).then(function() {
                if (response.status == 'error') {
                  $(`#${response.data}`).focus();
                }
              });
            } else {
              Swal.fire({
                icon: 'success',
                title: response.msg,
                showConfirmButton: false,
                timer: 10000
              }).then(function() {
                $('.title').text('Reloading Accounts');
                $('.pageloader').addClass('is-active');
                window.location.href = $('#accounts').data('link');
              });
            }
          },
          error: function(err) {
            console.log(err)
            Swal.fire({
              icon: 'error',
              title: 'Cannot Connect to Server',
              text: 'Something went wrong. Please try again later.'
            });
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Incomplete Form',
          text: 'Please complete all of the fields before submitting.',
          showConfirmButton: false,
          timer: 10000
        });
      }
    }
  });
});
