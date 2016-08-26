
_ = new (require './256')

Dood = require './dood'

bob = new Dood 'bob', 45, 'male'

bob.sayHello()
bob.sayDetail()
bob.doodMethod()

console.log bob.age

