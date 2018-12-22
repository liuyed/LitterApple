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

class DBPost {
  constructor(postId) {
    this.storageKeyName = 'postList';
    this.postId = postId;
  }
  getAllPostData() {
    var res = wx.getStorageSync(this.storageKeyName);

    if(!res) {
      res = require('../data.js').postList;
      this.execSetStorageSync(res);
    }
    return res;
  }
  execSetStorageSync(data) {
     wx.setStorageSync(this.stroageKeyName, data);
   }
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
}
export {
  DBPost
}