$(function() {
  $('.pageloader .title').text('Loading Profile');
  $('html').removeClass('has-navbar-fixed-top');
  $('.navbar').removeClass('is-fixed-top');
  $('.content.navbar-item h3').text('Profile');
  $('#back').attr('title', 'Go back to dashboard');

  $('#back').click(function() {
    $('.pageloader .title').text('Loading Dashboard');
    $('.pageloader').addClass('is-active');
  });

  $('.menu-list a').click(function() {
    var page = $(this).text();
    switch(page) {
      case 'Account Details':
      $('.pageloader .title').text('Loading Details');
      break;

      case 'Your Reports':
      $('.pageloader .title').text('Loading Reports');
      break;

      default:
      $('.pageloader .title').text('Loading Page');
      break;
    }
    $('.pageloader').addClass('is-active');
  });

  $('form').submit(function() {
    $('#logout').addClass('is-loading');
    $('.pageloader .title').text('Logging Out');
    $('.pageloader').addClass('is-active');
  });
});
