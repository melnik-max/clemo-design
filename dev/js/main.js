'use strict';

(function ($) {
  $(document).on('click', '#contact-submit-btn', function () {
    $('#contact-form').addClass('hidden')
    $('#message-box').removeClass('hidden')
  })

  $(document).on('click', '#message-box-btn', function () {
    $('#message-box').addClass('hidden')
    $('#contact-form').removeClass('hidden')
  })

  if ($('#team-slider').length) {
    var teamSlider = tns({
      container: '#team-slider',
      slideBy: 'page',
      navContainer: '.carousel__dots',
      controlsContainer: '#controls',
      touch: false,
      responsive: {
        0: {
          items: 1
        },
        640: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    })

    $(window).on('resize', function () {
      teamSlider.goTo('first')
    })
  }

  if ($('.related-items__slider').length) {
    var postsSlider = tns({
      container: '.related-items__slider',
      slideBy: 'page',
      navContainer: '#slider-controls',
      controls: false,
      touch: false,
      responsive: {
        0: {
          items: 1
        },
        640: {
          items: 2
        },
        1000: {
          items: 3
        }
      }
    })

    $(window).on('resize', function () {
      postsSlider.goTo('first')
    })
  }

  if ($('.product__slider').length) {
    var productSlider = tns({
      container: '.product__slider',
      nav: true,
      navContainer: '.product__nav',
      touch: false,
      controlsContainer: '.product__controls'
    })

    $('.product__nav *').click(function () {
      $('.product__current-slide').html($(this).data('index'))
    })

    $('.product__controls *').click(function () {
      setTimeout(function () {
        var indexCurrent = $('.product__nav .tns-nav-active').data('index')
        $('.product__current-slide').html(indexCurrent)
      }, 50)
    })
  }

  // Need this to avoid very much copy-paste in HTML
  $('#contact-form-light #contact-header').html('contact')
  $('#contact-form-light #mail').attr('src', 'img/mail-black.png')
  $('#contact-form-light #geo').attr('src', 'img/geo-black.png')
  $('#contact-form-light #phone').attr('src', 'img/phone-black.png')
  $('#contact-form-light #check').attr('src', 'img/check-black.png')

  $('#jumbotron-carousel .carousel-inner div:first-of-type').addClass('active')
  $('#reviews-carousel .carousel-inner div:first-of-type').addClass('active')
})(jQuery)
