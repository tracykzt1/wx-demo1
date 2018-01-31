var appData = getApp();
var utils = require("../../utils/utils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing: {},
    comesoon: {},
    top250: {},
    searchResult: {},
    showMoviesPanel: true,
    showSearchPanel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var playingUrl = appData.globalData.g_baseUrl + "/v2/movie/in_theaters?start=0&count=3";
    var comesoonUrl = appData.globalData.g_baseUrl + "/v2/movie/coming_soon?start=0&count=3";
    var top250Url = appData.globalData.g_baseUrl + "/v2/movie/top250?start=0&count=3";

    this.getMovieData(playingUrl, "playing", "正在热映");
    this.getMovieData(comesoonUrl, "comesoon", "即将上映");
    this.getMovieData(top250Url, "top250", "Top250");
  },

  getMovieData: function (url, key, tabaTitle) {
    var that = this;
    wx.request({
      url: url,
      data: {},
      method: "GET",
      header: {
        "Content-Type": "json"  //必须加上这一句！
      },
      success: function (res) { //请求成功时调用
        that.formatMovieData(res.data, key, tabaTitle);
      },
      fail: function () { //无法发送请求时调用：比如断网等情况

      },
      complete: function () { //请求成功或失败都调用

      }
    })
  },

  formatMovieData: function (data, key, tabaTitle) {
    var movies = [];
    for (var idx in data.subjects) {
      var subject = data.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substr(0, 6) + '...';
      };

      var temp = {
        stars: utils.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverUrl: subject.images.large,
        movieId: subject.id
      };
      movies.push(temp);
    };
    var result = {};
    result[key] = {
      "movies": movies,
      "tabaTitle": tabaTitle
    };
    this.setData(result);
  },

  onMoreTap: function (event) {
    var tabaTitle = event.currentTarget.dataset.tabatitle;
    wx.navigateTo({
      url: 'more-movies/more-movies?tabaTitle=' + tabaTitle
    });
  },

  onfocus: function (event) {
    this.setData({
      showMoviesPanel: false,
      showSearchPanel: true
    })
  },

  onCancelTap: function (event) {
    this.setData({
      showMoviesPanel: true,
      showSearchPanel: false,
      searchResult: {}
    });
  },

  onMovieOneTap: function(event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: 'movie-detail/movie-detail?id=' + movieId
    })
  },

  onConfirm: function (event) {
    var inputVal = event.detail.value; //获取input框里面的值；
    var searchUrl = appData.globalData.g_baseUrl + "/v2/movie/search?q="
      + inputVal;
    this.getMovieData(searchUrl, "searchResult", "");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})