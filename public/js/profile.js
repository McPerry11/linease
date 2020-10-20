$(function() {
  $('.pageloader .title').text('Loading Profile');
  $('html').removeClass('has-navbar-fixed-top');
  $('.navbar').removeClass('is-fixed-top');
  $('.content.navbar-item h3').text('Profile');
  $('#back').attr('title', 'Go back to dashboard');

  $('#username').bind({
    keydown: function(e) {
      if (e.shiftKey == true) {
        if (e.which == 189)
          return true;
      } else if (((e.which > 47 && e.which < 58) || e.which == 190) && e.shiftKey == false) {
        return true;
      }
      if ((e.which > 96 && e.which < 123) || (e.which > 64 && e.which < 90) || e.which < 32 || (e.which > 126 && e.which < 160) || (e.which < 41 && e.which > 34))
        return true;
      return false;
    }
  });

  $('#email').bind({
    keydown: function(e) {
      if (e.shiftKey == true) {
        if (e.which == 189 || e.which == 50)
          return true;
      } else if (((e.which > 47 && e.which < 58) || e.which == 190) && e.shiftKey == false) {
        return true;
      }
      if ((e.which > 96 && e.which < 123) || (e.which > 64 && e.which < 90) || e.which < 32 || (e.which > 126 && e.which < 160) || (e.which < 41 && e.which > 34))
        return true;
      return false;
    }
  });

  // $('body').bind({
  //   keydown: function(e) {
  //     if (!$('input').is(':focus')) {
  //       if (e.which == 80) {
  //         $('#profile a').click();
  //       } else if (e.which == 83) {
  //         $('#security a').click();
  //       } else if (e.which == 82) {
  //         $('#reports a').click();
  //       }
  //     }
  //   }
  // });

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
