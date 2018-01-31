// 小程序每一个页面都有生命周期，当页面处于生命周期哪一个阶段就会触发相应阶段的生命周期函数。
// 一个页面生命周期函数的触发顺序为onLoad→→onShow→→onReady；

// 小程序中是单向数据绑定，即在js脚本文件中更改数据的同时，wxml文件中对应的内容会更改。但如果wxml文件中的内容更改，js脚本文件中对应的数据是不会更改的，

var local_data = require("../../data/posts-data.js"); //require必须使用相对路径

Page({
  onPostsTap:function(event) {
    var postId = event.currentTarget.dataset.postid; 
    wx.navigateTo({
      url: 'posts-detail/posts-detail?id='+postId
    })
  },

  onSwiperTap: function(event) {
    var swiperId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'posts-detail/posts-detail?id=' + swiperId
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    // 小程序总是会读取data对象来进行数据绑定，这个动作我们称为动作A，而这个动作A的执行，是在onLoad事件监听函数之后发生。
  },

  /**
   * 生命周期函数--监听页面加载，页面初始化
   */
  onLoad: function (options) {
    // this.data.postsList = local_data.postList 也可以
    this.setData({
      postsList: local_data.postList
    })
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