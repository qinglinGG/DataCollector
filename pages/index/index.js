//index.js
//获取应用实例
const app = getApp();
//未开发模块通用图标
var doingImg = '../imgs/doing.jpg';
//模块列表定义,  可通过后台查询返回
var modules = [
  { name: '七星彩', icon: 'imgs/qixingcai.jpg', done: true, url: '../qixingcai/qixingcai' },
  { name: '排列五', icon: doingImg, done: false},
  { name: '排列三', icon: doingImg, done: false},
  { name: '双色彩', icon: doingImg, done: false},
  { name: '时时彩', icon: doingImg, done: false},
  { name: '大乐透', icon: 'imgs/daletou.jpg', done: false}
];

var pageObj = {
  data: {
    motto: 'Hello World',
    userInfo: {},
    grids: modules,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    console.log('onclick event');
    // wx.navigateTo({
    wx.switchTab({
      url: '../logs/logs'
    });
  },
  openModule: function( eventObj){
    var mdConfig = eventObj.currentTarget.dataset.item;
    if (mdConfig.done ) {
      wx.navigateTo({
        url: mdConfig.url
      });
    } else {
      wx.showToast({
        title: mdConfig.name + '正在升级中……',
        icon: 'loading',
        duration: 3000
      });
    }
    console.log('mdConfig:', mdConfig);
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }  
}

Page( pageObj );