function convertToStarsArray(stars) {
  var array = [];
  var num = stars.toString().substring(0, 1);
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      if (stars % 10 != 0 && array.indexOf(2) == -1) {
        array.push(2);
      } else {
        array.push(0);
      }
    }
  }
  return array;
};

function reqData(url, callback) {
  wx.request({
    url: url,
    data: {},
    method: "GET",
    header: {
      "Content-Type": "json"  //必须加上这一句！
    },
    success: function (res) { //请求成功时调用
      callback(res.data);
    },
    fail: function () { //无法发送请求时调用：比如断网等情况

    },
    complete: function () { //请求成功或失败都调用

    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  reqData: reqData,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}