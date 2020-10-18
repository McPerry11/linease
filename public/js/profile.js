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

  $('.tabs a').click(function() {
    let content = $(this).parent().attr('id');
    if (!$('#' + content).hasClass('is-active')) {
      $('.tabs li').removeClass('is-active');
      $('#' + content).addClass('is-active');
    }
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
  });
});
