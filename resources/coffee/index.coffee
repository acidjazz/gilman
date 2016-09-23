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
    $('.top .burger').click @burgerHandler
    $('.menu .item, a.cta').click @menuHandler
    $('.form .cta').click @newsletterHandler

  burgerHandler: ->
    _.swap '.top > .burger'
    _.swap '.top > .menu'


  menuHandler: ->
    _.off '.top > .menu'
    _.on '.top > .burger'
    item = $(this).data 'item'
    $.scrollTo $(".#{item}"), 500

  newsletterHandler: ->
    $(this).parent().submit()
