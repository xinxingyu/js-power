var a = 2

var str = "支持中文吗? ying gai shi zhi chi de.";
console.log('编码前:' + str);
var total2str = "";

for (var i = 0; i < str.length; i++) {
  var num10 = str.charCodeAt(i); ///< 以10进制的整数返回 某个字符 的unicode编码 
  console.log(i, num10)
  var str2 = num10.toString(2);   ///< 将10进制数字 转换成 2进制字符串
  
  if (total2str == "") {
    total2str = str2;
  } else {
    total2str = total2str + " " + str2;
  }
}
console.log("编码后:" + total2str);
var goal = "";
var arr = total2str.split(' ');
for (var i = 0; i < arr.length; i++) {
  var str2 = arr[i];
  var num10 = parseInt(str2, 2); ///< 2进制字符串转换成 10进制的数字 
  goal += String.fromCharCode(num10); ///< 将10进制的unicode编码, 转换成对应的unicode字符}
  console.log('解码后:' + goal);
}