Index =
  options: {}
  cache:
    window: false
    stickied: false
  i: ->

    @cache.window = $(window)
    
    @handlers()

    width = $(document).width()

    amt = Math.floor width / 350

    $('.beerlist > .inner').slick
      infinite: true
      slidesToShow: amt
      slidesToScroll: 1

    if @cache.window.width() > 1000
      setInterval @sticky, 50

  handlers: ->
    $('.top .burger').click @burgerHandler
    $('.item, a.cta, .anvil').click @menuHandler
    $('.form .cta').click @newsletterHandler


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

  events: (result) ->
    for event in result.data
      template = $('.eventlist > #template').clone()
      date = moment(event.entities[2].value, "MM/DD/YYYY")
      template.find('.date > .month').html date.format("MMM")
      template.find('.date > .day').html date.format("DD")
      template.find('.title').html event.name
      template.find('.description').html event.entities[0].value
      template.find('.image').css 'background-image', "url(#{event.entities[1].value})"
      $('.eventlist').append template.html()
