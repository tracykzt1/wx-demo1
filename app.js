// 小程序生命周期函数，执行顺序onLaunch → onShow。当关掉小程序再打开，onLaunch → onShow 会重新执行一遍。而 onHide 生命周期函数是在小程序在后台运行的时候（即按手机的Home键退到手机桌面）才会执行。当从后台重新回到前台运行时，onShow会再执行一遍，onLauch 则不会再执行了。


App({
  globalData: {
    g_isPlaying: false,
    g_curMusicId:null,
    g_baseUrl: "http://t.yushu.im"
  },

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
