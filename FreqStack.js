var FreqStack = function () {
  this.freq = {};
  this.mapHash = {};
  this.maxfreq = 0;
};

/** 
 * @param {number} x
 * @return {void}
 */
FreqStack.prototype.push = function (x) {
  let f = 0;
  if(x in this.freq) {
    f = ++this.freq[x];
  } else {
    this.freq[x] = f = 1;
  }

  if (f > this.maxfreq) {
    this.maxfreq = f;
  }

  if (!this.mapHash[f]) {
    this.mapHash[f] = [x]
  } else {
    this.mapHash[f].push(x)
  }
};

/**
 * @return {number}
 */
FreqStack.prototype.pop = function () {
  if (this.maxfreq == 0) return;

  var maxArr = this.mapHash[this.maxfreq];
  var r = maxArr.pop();
  if (!maxArr.length) {
    this.maxfreq--;
  }

  this.freq[r]--;
  return r;
};

/** 
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 */
var obj = new FreqStack();

// ["FreqStack","push","push","push","push","push","push","pop","push","pop","push","pop","push","pop","push","pop","pop","pop","pop","pop","pop"]
// [[],[56],[17],[55],[35],[96],[9],[],[98],[],[41],[],[50],[],[14],[],[],[],[],[],[]]

obj.push(56);
obj.push(17);
obj.push(55);
obj.push(35);
obj.push(96);
obj.push(9);
obj.pop();
obj.push(98);
obj.pop();
obj.push(41);
obj.pop();
obj.push(50);
obj.pop();
obj.push(14);
obj.pop();
obj.pop();
obj.pop();
obj.pop();
obj.pop();
obj.pop();



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