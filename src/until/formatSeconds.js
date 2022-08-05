
function formatSeconds(value) {
  var theTime = parseInt(value/1000)// 秒
  var theTime1 = 0 // 分
  var theTime2 = 0 // 小时
  if (theTime > 60) {
      theTime1 = parseInt(theTime / 60)
      theTime = parseInt(theTime % 60)
      if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60)
          theTime1 = parseInt(theTime1 % 60)
      }
  }
  var result = "" + parseInt(theTime);
  if(result < 10) {
      result = '0' + result
  }
  if (theTime1 > 0) {
      result = "" + parseInt(theTime1) + ":" + result
      if(theTime1 < 10) {
          result = '0' + result
      }
  }else{
      result = '00:' + result
  }
  if (theTime2 > 0) {
      result = "" + parseInt(theTime2) + ":" + result
      if(theTime2 < 10){
          result = '0' + result
      }
  }else{
      result = '00:' + result
  }
  return result
}

export default formatSeconds
