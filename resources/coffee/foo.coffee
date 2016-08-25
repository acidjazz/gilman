
class Foo
  constructor: (@name) ->
    console.log "constructor fired"

  sayHi: ->
    console.log "hello #{@name}"


  destructor: ->

module.exports = Foo
