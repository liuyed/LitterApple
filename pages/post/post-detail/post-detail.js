// pages/post/post-detail/post-detail.js
import {DBPost} from "../../../db/DBPost.js";
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
    console.log(options);
    let id  = options.id;
    this.dbPost = new DBPost(id);
    this.postData = this.dbPost.getPostItemById().data;
    this.setData({
      post:this.postData
    })

    this.addReadingTimes();
    this.setAniation();
  },
  onCollectionTap:function() {
    console.log(this)
   let newData = this.dbPost.collect();

   this.setData({
     'post.collectionStatus': newData.collectionStatus,
     'post.collectionNum':newData.collectionNum
   });
   wx.showToast({
     title: newData.collectionStatus ? '收藏成功':'取消成功',
     mask: true,
     icon:'success',
     duration:1500
   });
  },
  onUpTap:function() {
    let that = this;
    let newData = this.dbPost.up();
    this.setData({
      'post.upStatus':newData.upStatus,
      'post.upNum':newData.upNum
    });

    this.animationUp.scale(2).step();

    this.setData({
      animationUp:this.animationUp.export()
    });
    setTimeout(function(){
      that.animationUp.scale(1).step();

      that.setData({
        animationUp:that.animationUp.export()
      })
    },300)
  },
  onCommitTap:function(event) {
    var id = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: `../post-comment/post-comment?id=${id}`,
    })
  },
  addReadingTimes:function() {
    this.dbPost.addReadingTimes();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady:function () {
    wx.setNavigationBarTitle({
      title:this.postData.title
    });
  },
  onShareAppMessage() {
    return {
      title:this.postData.title,
      desc:this.postData.content,
      path:'/pages/post/post-detail/post-detail'
    }
  },
  setAniation:function(){
    let animationUp =wx.createAnimation({
      timingFunction:'ease-in-out'
    });
    this.animationUp = animationUp;
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