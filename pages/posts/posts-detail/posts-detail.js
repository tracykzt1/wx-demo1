// 小程序中本地缓存最大不能超过10M

// tip: wx.setStorageSync(key, val),小程序中将数据存储到本地缓存的方法。它是一个同步接口；
// tip: wx.setStorage(key, val), 小程序中将数据存储到本地缓存的方法。它是一个异步接口；

// tip: wx.getStorageSync(key),从本地缓存中同步获取指定key的val；
// tip: wx.getStorage(key),从本地缓存中异步获取指定key的val；

// tip: wx.removeStorageSync(key), 从本地缓存中同步移除指定key；
// tip: wx.removeStorage(key), 从本地缓存中异步移除指定key；

// wx.clearStorage(), 清除所有本地缓存
// wx.clearStorageSync(), 同步清除所有本地缓存

var local_data = require("../../../data/posts-data.js");
var appData = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var postid = options.id;
    var postdata = local_data.postList[postid];
    this.setData({
      "postdata": postdata,
      "curId": postid
    });

    var collectState = wx.getStorageSync('post_collected');
    if (collectState) {
      this.setData({
        "collected": collectState[postid]
      });
    } else {
      var collectState = {};
      collectState[postid] = false;
      wx.setStorageSync('post_collected', collectState);
    };

    //   var that = this;  
    //   wx.onBackgroundAudioPlay(function () {
    //     that.setData({
    //       'isPlaying': true
    //     });
    //     appData.globalData.g_isPlaying = true;
    //     appData.globalData.g_curMusicId = postid;
    //   });

    //   wx.onBackgroundAudioPause(function () {
    //     that.setData({
    //       'isPlaying': false
    //     });
    //     appData.globalData.g_isPlaying = false;
    //     appData.globalData.g_curMusicId = null;
    //   });

    //   wx.onBackgroundAudioStop(function () {
    //     that.setData({
    //       'isPlaying': false
    //     });
    //     appData.globalData.g_isPlaying = false;
    //     appData.globalData.g_curMusicId = null;
    //   });

    if (appData.globalData.g_isPlaying && appData.globalData.g_curMusicId === postid) {
      this.setData({
        'isPlaying': true
      })
    }
    this.setMusicMonitor();
  },

  setMusicMonitor: function () {
    //点击播放图标和总控开关都会触发这个函数
    var that = this;
    wx.onBackgroundAudioPlay(function (event) {
      var pages = getCurrentPages();
      // console.log(pages);
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.curId === that.data.curId) {
        // 打开多个post-detail页面后，每个页面不会关闭，只会隐藏。通过页面栈拿到到
        // 当前页面的postid，只处理当前页面的音乐播放。
        if (appData.globalData.g_curMusicId == that.data.curId) {
          // 播放当前页面音乐才改变图标
          that.setData({
            isPlaying: true
          })
        }
      }
      appData.globalData.g_isPlaying = true;

    });
    wx.onBackgroundAudioPause(function () {
      var pages = getCurrentPages();
      var currentPage = pages[pages.length - 1];
      if (currentPage.data.curId === that.data.curId) {
        if (appData.globalData.g_curMusicId == that.data.curId) {
          that.setData({
            isPlaying: false
          })
        }
      }
      appData.globalData.g_isPlaying = false;

    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlaying: false
      })
      appData.globalData.g_isPlaying = false;
    });
  },

  onCollectTap: function (event) {
    var collectStates = wx.getStorageSync('post_collected');
    var curCollectState = collectStates[this.data.curId];
    curCollectState = !curCollectState;
    collectStates[this.data.curId] = curCollectState;
    wx.setStorageSync('post_collected', collectStates);
    this.setData({
      "collected": curCollectState
    });
    wx.showToast({
      title: curCollectState ? '收藏成功' : '取消收藏',
      duration: 1500,
      icon: 'success'
    });
  },

  onShareTap: function (event) {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到手机QQ', '分享到QQ空间'],
      itemColor: "#333"
    })
  },

  onMusicTap: function (event) {
    var url = this.data.postdata.music.url,
      title = this.data.postdata.music.title,
      img = this.data.postdata.music.coverImg,
      isPlaying = this.data.isPlaying;
    if (isPlaying) {
      wx.pauseBackgroundAudio();
      this.setData({
        'isPlaying': false
      });
      appData.globalData.g_isPlaying = false;
    } else {
      wx.playBackgroundAudio({
        dataUrl: url,
        title: title,
        coverImgUrl: img
      });
      this.setData({
        'isPlaying': true
      });
      appData.globalData.g_curMusicId = this.data.curId;
      appData.globalData.g_isPlaying = true;
    }

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
  onShareAppMessage: function (event) {
    return {
      title: '离思五首·其四',
      desc: '曾经沧海难为水，除却巫山不是云',
      path: '/pages/posts/posts-detail/posts-detail?id=0'
    }
  },

  scanQRCode: function (event) {
    wx.scanCode({
      success: function (result) {
        wx.showModal(
          {
            content: JSON.stringify(result)
          })
      },
      fail: function (error) {
        wx.showModal(
          {
            content: JSON.stringify(error)
          })
      }
    })
  }

})
