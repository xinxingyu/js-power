"use strict";

// function foo() {
//   console.log(this);
// }

// var a = 2;
// foo();

function foo() {
  console.log(this);
}

var a = 2;

var obj = {
  a: 3,
  foo: foo
};

obj.foo();