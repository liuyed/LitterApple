// pages/post/post.js
// var dataObj = require('../../data.js');
// const DBPost = require('../../db/DBPost.js').DBPost;
import { DBPost } from '../../db/DBPost.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('页面load');
    const dbpost = new DBPost();
    this.setData({
      postList:dbpost.getAllPostData()
    })
    // this.setData({'postData.title':'一根雪糕的经济学原理'})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('页面Ready');
  },
  onTapToDetail:(event) =>{
    console.log(event);
    let postId = event.currentTarget.dataset.postId
    wx.navigateTo({
      url:`post-detail/post-detail?id=${postId}`
    })
  },
  onSwiperTap:function(event){
    let id = event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+id,
    })
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