var appData = getApp();
var utils = require("../../../utils/utils.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    requestUrl: "",
    totalCount: 0,
    empty: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tabaTitle = options.tabaTitle;
    var dataUrl = "";
    this.setData({
      'tabaTitle': tabaTitle
    });
    switch (tabaTitle) {
      case "正在热映":
        dataUrl = appData.globalData.g_baseUrl + "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = appData.globalData.g_baseUrl + "/v2/movie/coming_soon";
        break;
      case "Top250":
        dataUrl = appData.globalData.g_baseUrl + "/v2/movie/top250";
        break;
    };
    this.data.requestUrl = dataUrl;
    utils.reqData(dataUrl, this.formatMovieData)
  },

  formatMovieData: function (data) {
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
    this.data.totalCount += 20;

    var totalMovies = [];
    if(this.data.empty) {
      totalMovies = movies;
      this.data.empty = false;
    }else {
      totalMovies = this.data.movies.concat(movies);
    };

    this.setData({
      "movies": totalMovies
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh()
  },

  onMovieOneTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  // 这里设置导航栏标题需要在onReady生命周期函数阶段设置
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.tabaTitle
    })
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
  // 下拉刷新
  onPullDownRefresh: function () {
    var refreshUrl = this.data.requestUrl +
      "?star=0&count=20";
    this.data.movies = {};
    this.data.empty = true;
    this.data.totalCount = 0;
    utils.reqData(refreshUrl, this.formatMovieData);
    wx.showNavigationBarLoading();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // 上滑加载更多
  onReachBottom: function () {
    var nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount + "&count=20";
    utils.reqData(nextUrl, this.formatMovieData);
    wx.showNavigationBarLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})