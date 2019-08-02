function A() {
  
  return function() {
     var o = {
       "__proto__": f.prototype
     };
     A.apply(o, arguments); //继承父类的属性

     return o; //返回一个Object
  }
}

console.log(A());
console.log(new A());
