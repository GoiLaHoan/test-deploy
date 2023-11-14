$(document).ready(() => {
  $(window).load(function () {
    $('#preloader').delay(600).fadeOut()
  })

  // Scrollspy
  $('body').scrollspy({
    target: '#nav',
    offset: $(window).height() / 2,
  })

  ///////////////////////////
  // Btn nav collapse
  $('#nav .nav-collapse').on('click', function () {
    $('#nav').toggleClass('open')
  })

  ///////////////////////////
  // Mobile dropdown
  $('.has-dropdown a').on('click', function () {
    $(this).parent().toggleClass('open-drop')
  })

  ///////////////////////////
  // On Scroll
  $(window).on('scroll', function () {
    var wScroll = $(this).scrollTop()

    // Fixed nav
    wScroll > 1
      ? $('#nav').addClass('fixed-nav')
      : $('#nav').removeClass('fixed-nav')

    // Back To Top Appear
    wScroll > 700 ? $('#back-to-top').fadeIn() : $('#back-to-top').fadeOut()
  })

  $('form').on('submit', function (e) {
    e.preventDefault()
    var baseUrl =
      'https://connect.kitco.com/subscription/ws/subscribe/?sourceId=1&channels=24&'
    var data = $(this).serialize()
    var fullName = data.split('&')[0].split('=')[1].split('+')
    var firstName = 'firstName=' + fullName[0] + '&'
    var lastName = 'lastName=' + fullName[1]
    fullName = firstName + lastName
    var email = '&' + data.split('&')[1]

    var url = baseUrl + fullName + email + '&ipAddress=userIP'
    $.ajax({
      method: 'post',
      url: url,
      crossDomain: true,
      error: function (jqXHR, textStatus, errorThrown) {
        console.log('error')
        $('form').each(function () {
          this.reset()
        })
        $.notify(
          {
            message: 'Thank you for signing up!',
          },
          {
            type: 'success',
            animate: {
              enter: 'animated fadeInDown',
              exit: 'animated fadeOutUp',
            },
            timer: 1000,
          }
        )
      },
      success: function (data, textStatus, jqXHR) {
        $('form').each(function () {
          this.reset()
        })
        $.notify(
          {
            message: 'Thank you for signing up!',
          },
          {
            type: 'success',
            animate: {
              enter: 'animated fadeInDown',
              exit: 'animated fadeOutUp',
            },
            timer: 1000,
          }
        )
      },
    })
  })
})
