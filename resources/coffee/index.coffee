Index =
  options: {}
  loaded: false
  cache:
    window: false
    stickied: false
  i: ->

    Basal.i config.basal.client, ->
      Index.loaded = true
      Index.slick()

    @cache.window = $(window)
    
    @handlers()

    if @cache.window.width() > 1190
      setInterval @sticky, 50

  handlers: ->
    $('.top .burger').click @burgerHandler
    $('.item, a.cta, .anvil').click @menuHandler
    $('.form .cta').click @newsletterHandler

    $(window).resize Index.slickReload

  slick: ->

    return true if Index.loaded is false

    width = $(document).width()
    amt = Math.floor width / 350

    $('.beerlist > .inner').slick
      infinite: true
      slidesToShow: amt
      slidesToScroll: 1

  slickReload: ->

    return true if Index.loaded is false

    width = $(document).width()
    amt = Math.floor width / 350
    $('.beerlist > .inner').slick 'unslick'

    $('.beerlist > .inner').slick
      setPosition: true
      slidesToShow: amt

  sticky: ->

    stickySpot = 300

    if Index.cache.window.scrollTop() > stickySpot and Index.cache.stickied is false
      _.off '.infobar'
      setTimeout ->
        $('.infobar').addClass 'stuck'
        _.on '.infobar'
      , 200
      Index.cache.stickied = true

    if Index.cache.window.scrollTop() < stickySpot and Index.cache.stickied is true
      _.off '.infobar'
      setTimeout ->
        $('.infobar').removeClass 'stuck'
        _.on '.infobar'
      , 200
      Index.cache.stickied = off

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
