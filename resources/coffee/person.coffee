class Person
  constructor: (@name, @age, @sex) ->

  sayHello: ->
    console.log "hi my name is #{@name}"

  sayDetail: ->
    console.log "my name is #{@name}, i am #{@age} years old, and i am a #{@sex}"

  get: (obj, key) ->
    console.log 'defineProperty', arguments

`export default Person`
