Index =
  options: {}
  i: ->
    @handlers()

    width = $(document).width()

    amt = Math.floor width / 350

    $('.beerlist > .inner').slick
      infinite: true
      slidesToShow: amt
      slidesToScroll: 1

  handlers: ->
    $('.top .burger').click @mobile

  mobile: ->
    _.swap '.top > .burger'
    _.swap '.top > .menu'
