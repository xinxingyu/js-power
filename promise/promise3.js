function MyPromise(fn) {
  // 私有属性
  var __status = 'pending';
  var __data;
  var resolveCallbacks = new Array();
  var rejectCallbacks = new Array();
  var finallyCallback;
  // 私有方法
  function resolve(value) {
    if (___status !== 'pending') return;
    __status = 'resolved';
    __data = value;
    exec(resolveCallbacks);
  }

  function reject(value) {
    if (___status !== 'pending') return;
    __status = 'rejected';
    __data = value;
    exec(rejectCallbacks);
  }

  // 这个方法在后面解释
  function exec(callbacks) {
    while (callbacks.length > 0) {
      var head = callbacks.shift();
      (function _temp(head) { // 利用匿名立即执行函数解决异步操作中的引用问题
        process.nextTick(function () {
          var result = head.f.call(global, __data);
          if (result instanceof MyPromise) result.then(function (d) {
            head.r.call(global, d);
          })
          else head.r.call(global, result);
        })
      })(head)
    }
    if (finallyCallback) finallyCallback.call(global);
  }
  // 公有方法
  this.then = function (fn) {
    var tempResolve, tempReject;
    var retPromise = new MyPromise(function (resolve, reject) {
      tempResolve = resolve; // 拿到新的MyPromise对象的resolve方法引用
      tempReject = reject;
    })
    if (__status == 'resolved') {
      process.nextTick(function () {
        fn.call(global, __data);
      })
    } else if (__status == 'pending')
      resolveCallbacks.push({
        f: fn,
        r: tempResolve
      });
    if (arguments.length == 2) {
      if (__status == 'rejected') {
        process.nextTick(function () {
          fn.call(global, __data);
        })
      } else if (__status == 'pending')
        rejectCallbacks.push({
          f: fn,
          r: tempReject
        });
    }
    return retPromise;
  }
  this.catch = function (fn) {
    var tempReject;
    var retPromise = new MyPromise(function (resolve, reject) {
      tempReject = reject;
    })
    if (__status == 'rejected') {
      process.nextTick(function () {
        fn.call(global, __data);
      })
    } else if (__status == 'pending')
      rejectCallbacks.push({
        f: fn,
        r: tempReject
      });

    return retPromise;
  }
  this.finally = function (fn) {
    if (__status == 'pending') process.nextTick(function () {
      fn.call(global)
    })
    else finallyCallback = fn;
  }

  fn.call(global, resolve, reject); // 调用fn方法，并将resolve和reject作为参数传进去
}