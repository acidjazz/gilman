`import Person from './person.coffee'`

class Dood extends Person

  sayHello: ->
    console.log "wadup this is #{@name}"

  doodMethod: ->
    console.log 'this fired from dood'

`export default Dood`
