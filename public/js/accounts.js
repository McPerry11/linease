$(function() {
	$('.title').text('Loading Accounts');
	$('html').removeClass('has-navbar-fixed-top');
	$('.navbar').removeClass('is-fixed-top');
	$('.content.navbar-item h3').text('Accounts');
	$('#back').attr('title', 'Go back to dashboard');

	$('#add').click(function() {
		$('.modal').addClass('is-active');
	});

	$('.acc-edit').click(function() {
		$('.modal').addClass('is-active');
	});

  $('.acc-delete').click(function() {
    Swal.fire({
      title: 'Hello'
    });
  });

  $('#cancel').click(function() {
    $('.modal').removeClass('is-active');
  });

	// $('#submit').click(function() {
 //    // getting value from inputs
 //    let username = $('#username').val();
 //    let firstname = $('#firstname').val();
 //    let lastname = $('#lastname').val();
 //    let email = $('#email').val();
 //    let pass = $('#pass').val();
 //    console.log('test')
 //    $.ajax({
 //    	type: 'POST',
 //    	url: 'register',
 //    	data: {username:username, firstname:firstname, lastname:lastname, email:email, pass:pass},
 //    	data: 'JSON',
 //    	success: function(response) {
 //    		console.log(response)
 //    		Swal.fire({
 //    			icon: 'success',
 //    			title: response.msg,
 //    			showConfirmButton: false,
 //    			timer: 2500
 //    		});
 //    	},
 //    	error: function(err) {
 //    		console.log(err)
 //    		Swal.fire({
 //    			icon: 'error',
 //    			title: 'Cannot Connect to Server',
 //    			text: 'Something went wrong. Please try again later.'
 //    		});
 //    	}
 //    });
});
