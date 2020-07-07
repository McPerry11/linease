$(function() {
  $('.title').text('Loading Profile');
  $('html').removeClass('has-navbar-fixed-top');
  $('.content.navbar-item h3').text('Profile');
  $('.title').text('');
  $('.pageloader').removeClass('is-active');

  $('.menu-list a').click(function() {
    var page = $(this).text();
    switch(page) {
      case 'Account Details':
      $('.title').text('Loading Details');
      break;

      case 'Your Reports':
      $('.title').text('Loading Reports');
      break;

      default:
      $('.title').text('Loading Page');
      break;
    }
    $('.pageloader').addClass('is-active');
  });

  $('form').submit(function() {
    $('#logout').addClass('is-loading');
    $('.title').text('Logging Out');
    $('.pageloader').addClass('is-active');
  });
});
