## 最大频率栈
> 实现 FreqStack，模拟类似栈的数据结构的操作的一个类。

FreqStack 有两个函数：
* push(int x)，将整数 x 推入栈中。
* pop()，它移除并返回栈中出现最频繁的元素。如果最频繁的元素不只一个，则移除并返回最接近栈顶的元素。
 

### 示例：

**输入：**

["FreqStack","push","push","push","push","push","push","pop","pop","pop","pop"],
[[],[5],[7],[5],[7],[4],[5],[],[],[],[]]

**输出：**[null,null,null,null,null,null,null,5,7,5,4]

**解释：**
执行六次 .push 操作后，栈自底向上为 [5,7,5,7,4,5]。然后：

pop() -> 返回 5，因为 5 是出现频率最高的。
栈变成 [5,7,5,7,4]。

pop() -> 返回 7，因为 5 和 7 都是频率最高的，但 7 最接近栈顶。
栈变成 [5,7,5,4]。

pop() -> 返回 5 。
栈变成 [5,7,4]。

pop() -> 返回 4 。
栈变成 [5,7]。

### 实现
```js
var FreqStack2 = function () {
  this.maxFreq = 0
  this.freqMap = new Map() //用来记录x出现的频次
  this.freqSeqMap = new Map() //用来记录每一频次出现数字的顺序 {freq: []}
};
/** 
 * @param {number} x
 * @return {void}
 */
FreqStack2.prototype.push = function (x) {
  var freq = (this.freqMap.get(x) || 0) + 1
  this.maxFreq = this.maxFreq < freq ? freq : this.maxFreq
  this.freqMap.set(x, freq)
  var seqArr = this.freqSeqMap.get(freq) || []
  seqArr.push(x)
  this.freqSeqMap.set(freq, seqArr)
};

/**
 * @return {number}
 */
FreqStack2.prototype.pop = function () {
  var x = this.freqSeqMap.get(this.maxFreq).pop()
  this.freqMap.set(x, this.freqMap.get(x) - 1)
  if (this.freqSeqMap.get(this.maxFreq).length === 0) {
    this.maxFreq--
  }
  return x
};
```

来源：力扣（LeetCode）

链接：https://leetcode-cn.com/problems/maximum-frequency-stack