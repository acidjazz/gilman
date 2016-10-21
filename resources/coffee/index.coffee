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
