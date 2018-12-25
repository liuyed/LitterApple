// pages/post/post-comment/post-comment.js
import { DBPost } from '../../../db/DBPost.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    useKeyboardFlag:true,
    keyboardInputValue:'',
    sendMoreMsgFlag:false,
    chooseFiles:[],
    deleteIndex: -1,
    recodingClass:'',
    currentAudio:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.dbPost = new DBPost(id);
    let comments =this.dbPost.getCommentData();

    this.setData({
      comments: comments
    })
  },
  // 图片预览
  previewImg:function(event) {
    let commentIndex = event.currentTarget.dataset.commentIdx,
        imgIndex = event.currentTarget.dataset.imgIdx,
        imgs = this.data.comments[commentIndex].content.img;
        console.log(this.data);
        wx.previewImage({
          current:imgs[imgIndex],
          urls: imgs,
        })
  },
  // 语音 文字切换
  switchInputType:function() {
    this.setData({
      useKeyboardFlag: !this.data.useKeyboardFlag
    })
  },
  // 输入文字
  bindCommentInput:function(event) {
    let val = event.detail.value;
    console.log(val);
    this.data.keyboardInputValue = val;
  },
  submitComment:function(event) {
    let imgs = this.data.chooseFiles;

    let newData = {
      username:'清风',
      avatar:'/images/avatar/avatar-3.png',
      create_time:new Date().getTime()/1000,
      content:{
        txt: this.data.keyboardInputValue,
        img:imgs
      }
    };

    if(!newData.content.txt && imgs.length == 0) {
      return;
    }
    // 新评论到缓存
    this.dbPost.newComment(newData);
    // 评论成功 提示
    this.showCommentSuccessToast();
    // 更新当前评论页面
    this.bindCommentData();
    // 恢复初始状态
    this.resetAllDefaultStatus();
  },
  showCommentSuccessToast:function() {
    wx.showToast({
      title: '评论成功',
      duration:1000,
      icon:'success'
    })
  },
  bindCommentData:function() {
    var comments = this.dbPost.getCommentData();
    this.setData({
      comments:comments
    })
  },
  resetAllDefaultStatus:function() {
    this.setData({
      keyboardInputValue:'',
      chooseFiles:[],
      sendMoreMsgFlag:false
    })
  },
  sendMoreMsg:function() {
    this.setData({
      sendMoreMsgFlag:!this.data.sendMoreMsgFlag
    })
  },
  chooseImage:function(event) {
    let imgArr = this.data.chooseFiles;
    // 只能传三张图片
    let leftCount = 3 -imgArr.length;
    if(leftCount <= 0) {
      return;
    }

    let sourceType = [event.currentTarget.dataset.category];
    let that = this;
    wx.chooseImage({
      count: leftCount,
      // sizeType: [],
      sourceType: sourceType,
      success: function(res) {
        console.log(res);
        that.setData({
          chooseFiles:imgArr.concat(res.tempFilePaths)
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  deleteImage:function(event) {
    let index = event.currentTarget.dataset.idx,
    that = this;

    that.setData({
      deleteIndex: index
    })

    that.data.chooseFiles.splice(index,1);
    setTimeout(function(){
      that.setData({
        deleteIndex: -1,
        chooseFiles: that.data.chooseFiles
      })
    },500)
    
  },
  recordStart:function(){
    var that = this ;
    this.setData({
      recodingClass: 'recoding'
    });

    this.startTime = new Date();

    wx.startRecord({
      success:function(res){
        let diff = (that.endTime - that.startTime)/1000;
        diff = Math.ceil(diff);

        that.submitVoiceComment({
          url:res.tempFilePath,
          timeLen: diff
        })
      },
      fail:function(res){
        console.log(res)
      },
      complete:function(res){
        console.log(res);
      }
    })
  },
  recordEnd:function() {
    this.setData({
      recodingClass:''
    })
    this.endTime = new Date();
    wx.stopRecord();
  },
  submitVoiceComment:function(audio) {
    let newData = {
      username:'悲酥',
      avatar:'/images/avatar/avatar-5.png',
      create_time:new Date().getTime()/1000,
      content:{
        txt:'',
        img:[],
        audio:audio
      }
    };
    // 把评论存在缓存中
    this.dbPost.newComment(newData);

    this.showCommentSuccessToast();
    this.bindCommentData();
  },
  playAudio:function(event) {
    let url = event.currentTarget.dataset.url,
    that = this;

    if(url == this.data.currentAudio){
      wx.pauseVoice();
      this.data.currentAudio='';
    }else {
      this.data.currentAudio = url;
      wx.playVoice({
        filePath: url,
        complete:function() {
          that.data.currentAudio = '';
        }

      })
    }
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