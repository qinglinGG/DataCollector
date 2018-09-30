//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  getHisList( url, succ ) {
    // 七星彩查询地址 'http://f.apiplus.net/qxc-20.json'
    var list = wx.getStorageSync(url);
    // wx.getStorage({
    //   key: url,
    //   success: function(res) {
    //     console.log( 'wx.getStorage succ res: ', res);
    //     list = res.data;
    //   }, 
    //   fail: function (excep ){
    //     console.error('wx.getStorage info fail:', excep);
    //   }
    // });
    if ( list ) {
      console.log( 'get hisList from wxStorage');
      succ( list );
    } else {
      wx.request({
        url: url,
        success: function (r) {
          console.log("loadingHis succ", r);
          try {
            // debugger;
            wx.setStorage({
              key: url,
              data: r.data.data
            });
            succ(r.data.data);            
            //pageObj.showHisList(r.data.data);
          } catch (net_excep) {
            console.error('Query history fail, error_info is=', net_excep);
          }
        },
        fail: function (err) {
          console.error('loadingHis fail', err);
        }
      })
    }
    
  }
})