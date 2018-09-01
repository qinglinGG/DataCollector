// 七星彩页面控制层
const app = getApp();
var pageObj = {
  data: {
    model: '七星彩',
    hisList: []
  },
  onLoad: function () {
    console.log('page onload succ');    
    var win = this;
    //console.log('What is po:', this);
    app.getHisList('http://f.apiplus.net/qxc-20.json', function (hisList) {
      win.setData({
        hisList: hisList
      })
    });
  }
};

Page( pageObj );