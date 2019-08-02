// function deepCopy(obj) {
//   // 创建一个新对象
//   let result = {}
//   let keys = Object.keys(obj),
//     key = null,
//     temp = null;

//   for (let i = 0; i < keys.length; i++) {
//     key = keys[i];
//     temp = obj[key];
//     // 如果字段的值也是一个对象则递归操作
//     if (temp && typeof temp === 'object') {
//       result[key] = deepCopy(temp);
//     } else {
//       // 否则直接赋值给新对象
//       result[key] = temp;
//     }
//   }
//   return result;
// }

// const obj1 = {
//   x: {
//     m: 1
//   },
//   y: undefined,
//   z: function add(z1, z2) {
//     return z1 + z2
//   },
//   a: Symbol("foo")
// };

// const obj2 = deepCopy(obj1);
// obj2.x.m = 2;

// console.log(obj1); //{x: {m: 1}, y: undefined, z: ƒ, a: Symbol(foo)}
// console.log(obj2); //{x: {m: 2}, y: undefined, z: ƒ, a: Symbol(foo)}



// function deepCopy2(obj, parent = null) {
//   //创建一个新对象
//   let result = {};
//   let keys = Object.keys(obj),
//     key = null,
//     temp = null,
//     _parent = parent;
//   //该字段有父级则需要追溯该字段的父级
//   while (_parent) {
//     //如果该字段引用了它的父级，则为循环引用
//     if (_parent.originParent === obj) {
//       //循环引用返回同级的新对象
//       return _parent.currentParent;
//     }
//     _parent = _parent.parent
//   }
//   for (let i = 0, len = keys.length; i < len; i++) {
//     key = keys[i]
//     temp = obj[key]
//     // 如果字段的值也是一个新对象
//     if (temp && typeof temp === 'object') {
//       result[key] = deepCopy2(temp, {
//         //递归执行深拷贝，将同级的待拷贝对象与新对象传递给parent，方便追溯循环引用
//         originParent: obj,
//         currentParent: result,
//         parent: parent
//       });
//     } else {
//       result[key] = temp;
//     }
//   }
//   return result;
// }
// const obj = {
//   a: {
//     name: 'a'
//   },
//   b: {
//     name: 'b'
//   },
//   c: {

//   }
// };
// c.d.e = obj.a;


// const copy = deepCopy2(obj);
// console.log(copy.a); // 输出： {name: "a"}
// console.log(copy.d.e); // 输出: {name: "a"}
// console.log(copy.a === copy.d.e); // 输出： false


// function deepCopy(initalObject, finalObject) {
//   var finalObject = finalObject || {}
//   for (var key in initalObject) {
//     var tempProperty = initalObject[key]
//     if (tempProperty === initalObject) {
//       continue //当自身属性引用自己的时候, 跳过执行, 不拷贝, 避免相互引用导致内存溢出的情况
//     }
//     if (typeof initalObject[key] === "object") {
//       finalObject[key] = (initalObject[key].constructor === Array) ? [] : {} //区分构造函数
//       arguments.callee(initalObject[key], finalObject[key]) //调用自身函数方法
//     } else {
//       finalObject[key] = initalObject[key]
//     }
//   }
//   return finalObject
// }


function deepCopy3(obj) {
  // hash表，记录所有的对象的引用关系
  let map = new WeakMap();
  
  function dp(obj) {
    let result = null;
    let keys = Object.keys(obj);
    let key = null,
      temp = null,
      existobj = null;

    existobj = map.get(obj);
    //如果这个对象已经被记录则直接返回
    if (existobj) {
      return existobj;
    }

    result = {}
    map.set(obj, result);

    for (let i = 0, len = keys.length; i < len; i++) {
      key = keys[i];
      temp = obj[key];
      if (temp && typeof temp === 'object') {
        result[key] = dp(temp);
      } else {
        result[key] = temp;
      }
    }
    return result;
  }


  return dp(obj);
}

const obj1 = {
  x: 1
}
// obj1.z = obj1;

const obj2 = {
  x: 2
}

obj1.next = obj2;
obj2.next = obj1;


const obj3 = deepCopy3(obj1);

console.log(obj3)