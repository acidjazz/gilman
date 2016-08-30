
_ = new (require './256')

console.log 'hello'
console.log global['jQuery']

###
$('.loading').each (i, el) ->
  console.log i
###
