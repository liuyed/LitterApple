// const DBPost = function() {
//   this.storageKeyName = 'postList';
// }

// DBPost.prototype = {
//   getAllPostData:function() {
//     var res = wx.getStorageSync(this.storageKeyName);

//     if(!res) {
//       res = require('../data.js').postList;
//       this.execSetStorageSync(res);
//     }
//     return res;
//    },
//    execSetStorageSync:function(data) {
//      wx.setStorageSync(this.stroageKeyName, data);
//    }
// }
// module.exports ={
//   DBPost
// }
const util = require('../utils/util.js');

class DBPost {
  constructor(postId) {
    this.storageKeyName = 'postList';
    this.postId = postId;
  }
  // 获取缓存数据
  getAllPostData() {
    let res = wx.getStorageSync(this.storageKeyName);

    if(!res) {
      res = require('../data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }
  // 设置缓存数据
  execSetStorageSync(data) {
    wx.setStorageSync(this.storageKeyName, data); 
   }
  // 获取item by Id 
  getPostItemById(){
    const postsData = this.getAllPostData();
    let len = postsData.length;
    for(let i=0; i<len;i++) {
      if(postsData[i].postId == this.postId) {
        return {
          index: i,
          data:postsData[i]
        }
      }
    }
  } 
  // 收藏
  collect() {
    return this.updatePostData('collect');
  }
  up() {
    let data = this.updatePostData('up');
    return data;
  }
  newComment(newComment) {
    this.updatePostData('comment',newComment);
  }
  updatePostData(category,newComment) {
    let itemData = this.getPostItemById(),
    postData = itemData.data,
    allPostData = this.getAllPostData();

    switch (category) {

      case 'collect':
        if(!postData.collectionStatus) {
          postData.collectionNUm++;
          postData.collectionStatus = true;
        }else{
          postData.collectionNUm--;
          postData.collectionStatus = false;
        }
      break;

      case 'up':
        if (!postData.upStatus) {
          postData.upNUm++;
          postData.upStatus = true;
        } else {
          postData.upNUm--;
          postData.upStatus = false;
        }
      break;

      case 'comment':
        postData.comments.push(newComment);
        postData.commentNum++;
      break;

      case 'reading':
        postData.readingNum++;
      break;

      default:
      break;
    }
    allPostData[itemData.index] = postData;
    this.execSetStorageSync(allPostData);
    return postData;
  }
  getCommentData() {
    let itemData = this.getPostItemById().data;
    itemData.comments.sort(this.compareWidthTime);

    let len = itemData.comments.length,
        comment;
    
    for(let i =0;i<len;i++ ){
      comment = itemData.comments[i];
      comment.create_time = util.getDiffTime(comment.creat_time,true);
    }
    return itemData.comments;
  }
  compareWidthTime(value1,value2) {
    var flag = parseFloat(value1.create_time) - parseFloat(value2.create_time);
    if(flag <0) {
      return 1;
    }else if(flag >0){
      return -1;
    }else{
      return 0;
    }
  }
  addReadingTimes() {
    this.updatePostData('reading');
  }
}
export {
  DBPost
}