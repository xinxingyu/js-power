### 异步并发请求控制
#### 目的
一次添加几个异步处理，每次最多只能并行执行多少个。

#### 思路
1. 并发有一定的数量控制，所以后加的需要有一个队列存储剩余的异步处理。队列里面存储的是一个promise的resolve，通过await来阻断后面的异步执行。
2. 怎么在控制每次添加一个返回的都是对应的promise。解决办法是通过async await来处理。async返回的是一个promise，当执行完异步后，执行Promise.resolve()来返回结果。
3. 每次执行完一个异步处理，都需要判断是否超过并发数量，从队列里面执行一个resolve，这样这个异步才可以接续执行，走try{}catch()。

```js
class RequestDecorator {
  constructor(num) {
    this.limit = num || 2;
    this.requestQueue = [];
    this.currentConcurrent = 0;
  }

  async add(promiseFunc) {
    if(this.currentConcurrent >= this.limit) {
      await this.startBlocking();
    }

    try {
      this.currentConcurrent++;
      const result = await promiseFunc();
      Promise.resolve(result)
    } catch (error) {
      Promise.reject(error)
    } finally {
      this.currentConcurrent --;
      this.next();
    }
  }

  startBlocking() {
    let _resolve;
    let promise2 = new Promise((resolve, reject) => _resolve = resolve);
    this.requestQueue.push(_resolve);
    return promise2;
  }

  next() {
    if (this.requestQueue.length <= 0) return;
    const _resolve = this.requestQueue.shift();
    _resolve();
  }
}

const timer = function (time) {
  return () => new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time);
  })
}


const decorator = new RequestDecorator(2);

function add(time, value) {
  decorator.add(timer(time)).then(() => {
    console.log(value);
  })
}

add(1000, 1)
add(300, 2)
add(400, 3)
add(500, 4)


// 2,3,1,4
```