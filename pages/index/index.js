//index.js
//获取应用实例
const app = getApp()

var pageObj = {
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    console.log('onclick event');
    wx.navigateTo({
      url: '../logs/logs'
    })
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
    var win = this;
    console.log('What is po:', this);
    this.loadingHis({
      succ:function(hisList){
        win.setData({
          hisList: hisList
      })
      }
    })

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  showHisList(hisList){
    pageObj.setData({
      hisList: hisList
    });
  },
  loadingHis( cb ) {    
    wx.request({
      url: 'http://f.apiplus.net/qxc-20.json',
      success: function (r) {
        console.log("loadingHis succ", r);
        try {
          cb.succ(r.data.data);
          //pageObj.showHisList(r.data.data);
        } catch (net_excep) {
          console.error('Query history fail, error_info is=', net_excep);
        }
        
      },
      complete: function (info) {
        console.log('loadingHis complete');
      },
      fail: function (err) {
        console.error('loadingHis fail', err);
      }
    })
  }
}

Page( pageObj )
