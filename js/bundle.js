var Person;

Person = (function() {
  function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
  }

  Person.prototype.sayHello = function() {
    return console.log("hi my name is " + this.name);
  };

  Person.prototype.sayDetail = function() {
    return console.log("my name is " + this.name + ", i am " + this.age + " years old, and i am a " + this.sex);
  };

  Person.prototype.get = function(obj, key) {
    return console.log('defineProperty', arguments);
  };

  return Person;

})();

var Person$1 = Person;

var Dood;
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
var hasProp = {}.hasOwnProperty;
Dood = (function(superClass) {
  extend(Dood, superClass);

  function Dood() {
    return Dood.__super__.constructor.apply(this, arguments);
  }

  Dood.prototype.sayHello = function() {
    return console.log("wadup this is " + this.name);
  };

  Dood.prototype.doodMethod = function() {
    return console.log('this fired from dood');
  };

  return Dood;

})(Person$1);

var Dood$1 = Dood;

var bob;

bob = new Dood$1('bob', 46, 'male');

bob.sayDetail();

bob.doodMethod();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJyZXNvdXJjZXMvY29mZmVlL3BlcnNvbi5jb2ZmZWUiLCJyZXNvdXJjZXMvY29mZmVlL2Rvb2QuY29mZmVlIiwicmVzb3VyY2VzL2NvZmZlZS9tYWluLmNvZmZlZSJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQZXJzb25cbiAgY29uc3RydWN0b3I6IChAbmFtZSwgQGFnZSwgQHNleCkgLT5cblxuICBzYXlIZWxsbzogLT5cbiAgICBjb25zb2xlLmxvZyBcImhpIG15IG5hbWUgaXMgI3tAbmFtZX1cIlxuXG4gIHNheURldGFpbDogLT5cbiAgICBjb25zb2xlLmxvZyBcIm15IG5hbWUgaXMgI3tAbmFtZX0sIGkgYW0gI3tAYWdlfSB5ZWFycyBvbGQsIGFuZCBpIGFtIGEgI3tAc2V4fVwiXG5cbiAgZ2V0OiAob2JqLCBrZXkpIC0+XG4gICAgY29uc29sZS5sb2cgJ2RlZmluZVByb3BlcnR5JywgYXJndW1lbnRzXG5cbmBleHBvcnQgZGVmYXVsdCBQZXJzb25gXG4iLCJgaW1wb3J0IFBlcnNvbiBmcm9tICcuL3BlcnNvbi5jb2ZmZWUnYFxuXG5jbGFzcyBEb29kIGV4dGVuZHMgUGVyc29uXG5cbiAgc2F5SGVsbG86IC0+XG4gICAgY29uc29sZS5sb2cgXCJ3YWR1cCB0aGlzIGlzICN7QG5hbWV9XCJcblxuICBkb29kTWV0aG9kOiAtPlxuICAgIGNvbnNvbGUubG9nICd0aGlzIGZpcmVkIGZyb20gZG9vZCdcblxuYGV4cG9ydCBkZWZhdWx0IERvb2RgXG4iLCJgaW1wb3J0IERvb2QgZnJvbSAnLi9kb29kLmNvZmZlZSdgXG5cblxuYm9iID0gbmV3IERvb2QoJ2JvYicsIDQ2LCAnbWFsZScpXG5cbmJvYi5zYXlEZXRhaWwoKVxuYm9iLmRvb2RNZXRob2QoKVxuIl0sIm5hbWVzIjpbIlBlcnNvbiIsIkRvb2QiXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQU07RUFDUyxnQkFBQyxJQUFELEVBQVEsR0FBUixFQUFjLEdBQWQ7SUFBQyxJQUFDLENBQUEsT0FBRDtJQUFPLElBQUMsQ0FBQSxNQUFEO0lBQU0sSUFBQyxDQUFBLE1BQUQ7OzttQkFFM0IsUUFBQSxHQUFVO1dBQ1IsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBQSxHQUFpQixJQUFDLENBQUEsSUFBOUI7OzttQkFFRixTQUFBLEdBQVc7V0FDVCxPQUFPLENBQUMsR0FBUixDQUFZLGFBQUEsR0FBYyxJQUFDLENBQUEsSUFBZixHQUFvQixTQUFwQixHQUE2QixJQUFDLENBQUEsR0FBOUIsR0FBa0MseUJBQWxDLEdBQTJELElBQUMsQ0FBQSxHQUF4RTs7O21CQUVGLEdBQUEsR0FBSyxTQUFDLEdBQUQsRUFBTSxHQUFOO1dBQ0gsT0FBTyxDQUFDLEdBQVIsQ0FBWSxnQkFBWixFQUE4QixTQUE5Qjs7Ozs7OztBQUVKOztBQ1pBLElBQUEsSUFBQSxDQUFBO0FBQUEsSUFBQTs7QUFFTTs7Ozs7OztpQkFFSixRQUFBLEdBQVU7V0FDUixPQUFPLENBQUMsR0FBUixDQUFZLGdCQUFBLEdBQWlCLElBQUMsQ0FBQSxJQUE5Qjs7O2lCQUVGLFVBQUEsR0FBWTtXQUNWLE9BQU8sQ0FBQyxHQUFSLENBQVksc0JBQVo7Ozs7O0dBTmVBOztBQVFuQjs7QUNWQSxJQUFBOztBQUdBLEdBQUEsR0FBVSxJQUFBQyxNQUFBLENBQUssS0FBTCxFQUFZLEVBQVosRUFBZ0IsTUFBaEI7O0FBRVYsR0FBRyxDQUFDLFNBQUo7O0FBQ0EsR0FBRyxDQUFDLFVBQUoiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
