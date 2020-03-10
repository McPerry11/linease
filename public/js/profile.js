$(function() {
  $(".title").text("Loading Profile");
  $('html').removeClass('has-navbar-fixed-top');
  $('.content.navbar-item h3').text('Profile');
  $(".title").text("");
  $('.pageloader').removeClass('is-active');

  $('#back').click(function() {
    $('.title').text('Loading Dashboard');
    $('.pageloader').addClass('is-active');
  });

  $('.menu-list a').click(function() {
    var page = $(this).text();
    $('.title').text('Loading ' + page);
    $('.pageloader').addClass('is-active');
  });
});
