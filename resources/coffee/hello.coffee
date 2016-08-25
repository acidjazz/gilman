class Hello
  constructor: (@name) ->

  hi: ->
    console.log "hello const var is #{@name}"


  test :->
    console.log 'this is a test function'

`export { Hello as default }`

