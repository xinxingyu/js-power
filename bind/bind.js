Function.prototype.bind = function (oThis) {
  if (typeof this !== "function") {
    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var aArgs = Array.prototype.slice.call(arguments, 1),
    fToBind = this,
    fNOP = function () {},
    fBound = function () {
      return fToBind.apply(
        this instanceof fNOP ? this : oThis || window,
        aArgs.concat(Array.prototype.slice.call(arguments))
      );
    };

  // fBound.prototype = Object.create(this.prototype, {
  //   constructor: {
  //     value: subClass,
  //     enumerable: false,
  //     writable: true,
  //     configurable: true
  //   }
  // });
  // fBound.__proto__ = this;
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
 
  return fBound;
};


function add(a, b) {
  return a + b;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function () {
  return `my name is ${this.name} ${this.age}`;
};

const NewPerson = Person.bind(null, 'name1');
const person = new NewPerson('18');
console.log(person.say())