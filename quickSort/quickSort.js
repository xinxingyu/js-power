//
function getRandomArray(count) {
  let i = 0;
  let arr = [];
  while (i < count) {
    arr.push(Math.ceil(Math.random() * 100))
    i++;
  }
  return arr;
}

console.log(getRandomArray(1000000));