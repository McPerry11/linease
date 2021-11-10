$(function() {
  var inputs = {'username':true, 'email':true, 'phone':true};
  
  $('.title').text('Loading Accounts');
  $('html').removeClass('has-navbar-fixed-top');
  $('.navbar').removeClass('is-fixed-top');
  $('.content.navbar-item h3').text('Accounts');
  $('#back').attr('title', 'Go back to dashboard');

  $('#add').click(function() {
    $('#loader').addClass('is-hidden');
    $('.modal-content').removeClass('is-hidden');
    $('.field-pass').removeClass('is-hidden');
    $('#password').attr('required', true);
    $('#confirm').attr('required', true);
    $('.modal input').val('');
    $('.modal').addClass('is-active');
  });

  $('.acc-edit').click(function() {
    $('.modal').addClass('is-active');
    $('.field-pass').addClass('is-hidden');
    $('#password').removeAttr('required');
    $('#confirm').removeAttr('required');
    let username = $(this).data('user');
    $.ajax({
      type: 'POST',
      url: `${username}/profile`,
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
              title: 'Deleting Proposal',
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

  $('#submit').click(function() {
    // getting value from inputs
    let username = $('#username').val();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let email = $('#email').val();
    let pass = $('#pass').val();
    console.log('test')
    $.ajax({
    	type: 'POST',
    	url: 'register',
    	data: {username:username, firstname:firstname, lastname:lastname, email:email, pass:pass},
    	data: 'JSON',
    	success: function(response) {
    		console.log(response)
    		Swal.fire({
    			icon: 'success',
    			title: response.msg,
    			showConfirmButton: false,
    			timer: 2500
    		});
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
  });
});
