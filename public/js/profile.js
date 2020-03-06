$(function() {
  $('html').removeClass('has-navbar-fixed-top');

  $('#back').click(function() {
    $('.pageloader').addClass('is-active');
  });

  $('.menu-list a').click(function() {
    $('.pageloader').addClass('is-active');
  });
});