$(function() {
  $('html').removeClass('has-navbar-fixed-top');
  $('.content.navbar-item h3').text('Profile');

  $('#back').click(function() {
    $('.pageloader').addClass('is-active');
  });

  $('.menu-list a').click(function() {
    $('.pageloader').addClass('is-active');
  });
});