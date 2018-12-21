// pages/post/post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postData:{
      date:'Jan 28 2018',
      title:'小时候的冰棍儿与雪糕',
      postImg:'/images/post/post-4.jpg',
      avatar:'/images/avatar/avatar-5.png',
      content:'冰棍和雪糕绝对不是一个东西，3到5毛钱的雪糕犹如现在的哈根达斯，而5分1毛的冰棍儿就像现在的老冰棒。时过境迁，...',
      readingNum:92,
      collectionNum:108,
      commentNum:7
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面load');
    this.setData({'postData.title':'一根雪糕的经济学原理'})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('页面Ready');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('页面Show');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('页面hide');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('页面Unload')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('页面下拉');
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('页面上拉触底');
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('点击分享');
  }
})