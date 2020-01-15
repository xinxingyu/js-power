try {
  new Promise((resolve) => {
      console.log(0);
      // throw new Error('test00');

      // setTimeout(() => {
      //   console.log(1);
      //   throw new Error('test');
      //   resolve('哈哈');
      // }, 1000);
      resolve();
      console.log('01');
    })
    .then((res) => {
      throw new Error('test00');

      console.log('then success', res)

    }, (res) => {
      console.log('then error', res)
    })
    .catch(error => {
      console.log('catch error', error)
    })
  console.log('02');
} catch (error) {
  console.log('try catch。。。', error)
}


// const promise = new Promise(function (resolve, reject) {
//   console.log(0)
//   throw new Error('test');
//   console.log(1)
// });
// console.log(222)
// promise.catch(function (error) {
//   console.log(111, error);
// });