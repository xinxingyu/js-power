### Object深拷贝
```js
function deepCopy(obj) {
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


const obj3 = deepCopy(obj1);

console.log(obj3)
```