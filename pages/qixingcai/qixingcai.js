// 七星彩页面控制层
var doingImg = '../imgs/doing.jpg';
var modules = [
  { name: '七星彩', icon: 'imgs/qixingcai.jpg'},
  { name: '排列五', icon: doingImg},
  { name: '排列三', icon: doingImg},
  { name: '双色彩', icon: doingImg},
  { name: '时时彩', icon: doingImg },
  { name: '大乐透', icon: 'imgs/daletou.jpg'}
];

var pageObj = {
  data: {
    model: '七星彩',
    grids: modules
  },
  onLoad: function () {
    console.log('page onload succ');    
  }
};

Page( pageObj );