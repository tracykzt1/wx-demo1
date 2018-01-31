// 小程序中可以使用wx.navigateTo()进行页面跳转，参数是一个对象，该对象拥有一个url属性，属性值就是要跳转到页面的路径。wx.navigateTo()跳转是父子页面之间的跳转，即当前页面和跳转到的页面是父子关系，默认会显示一个返回按钮；

// 小程序中也可以使用wx.redirectTo()进行页面跳转，参数同样是一个对象，该对象也拥有一个url属性，属性值也是要跳转到页面的路径。wx.redirectTo()跳转是页面之间的跳转，即当前页面和跳转到的页面不是是父子关系，不会显示一个返回按钮；

// 页面生命周期函数onUnload会在使用wx.redirectTo()跳转时触发；
// 页面生命周期函数onHide会在使用wx.navigateTo()跳转时触发；

//当要跳转到的页面是一个有tab选项卡的页面，要使用wx.switchTab(); 如果跳转到的页面是没有tab选项卡的页面，那么就可以使用wx.navigateTo()或wx.redirectTo()；

Page({
  onTap:function() {
    // wx.navigateTo({
    //   url: '../posts/posts'
    // })

    wx.switchTab({
      url: '../posts/posts'
    })

  
    // wx.redirectTo({
         // 与wx.navigateTo()相同
    //   url: '...',
    //   success: function() {...},
    //   fail:function() {...}
    //   complete:function() {...}, 
    // })

    // wx.navigateTo({
    //   url: '../posts/posts',
    //   success:function() {
          // 页面跳转成功执行该函数
    //     console.log('success');
    //   },
    //   fail: function() {
          // 页面跳转失败执行该函数
    //     console.log('fail');
    //   },
    //   complete:function() {
          // 无论页面跳转成功还是失败都执行该函数
    //     console.log('success and fail');
    //   }
    // })
  },
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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