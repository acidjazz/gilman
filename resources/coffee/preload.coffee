class Preload

  constructor: ->
    $('.loading').each (i, el) =>
      classes = $(el).attr('class').split ' '
      for cl in classes
        if cl isnt 'loading'
          image = @stylin(cl)
        console.log 'url: ' + image

  stylin: (cl) ->
    console.log cl
    $p = $("<p></p>").hide().addClass(cl).appendTo('body')
    url = $p.css 'background-image'
    $p.remove()
    return url

`export default Preload`
