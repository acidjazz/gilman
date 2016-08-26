Person = require './person'

class Dood extends Person

  sayHello: ->
    console.log "wadup this is #{@name}"

  doodMethod: ->
    console.log 'this fired from dood'

module.exports = Dood
