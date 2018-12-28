// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    plain:false,
    isLoading:false,
    systemInfo:{},
    isPlain:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    console.log(wx.getLaunchOptionsSync())
  },
  getIphoneSystemInfo:function(){
    // wx.getSystemInfoSync({
    //   success(res){
    //     console.log(res);
    //   }
    // })
    let systemInfo = wx.getSystemInfoSync();
    console.log(systemInfo);
    this.setData({
      'systemInfo': systemInfo
    })
  },
  showActionSheet:function() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      itemColor:"#ccc",
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  showLoading:function(){
    wx.showLoading({
      title: '加载中...',
    })
  },
  cancelLoading:function() {
    wx.hideLoading();
  },
  showToast:function(){
    wx.showToast({
      title:"显示消息提示",
      icon:'success',
    })
  },
  showModal:function() {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  setNavBarColor:function() {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#ff0000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
  },
  showNavBarLoading:function(){
    wx.showNavigationBarLoading();
    setTimeout(function(){
      wx.hideNavigationBarLoading();
    },2000)
  },
  setBgTextStyle:function() {
    wx.setBackgroundTextStyle({
      textStyle: 'dark' // 下拉背景字体、loading 图的样式为dark
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