// pages/moreResult/moreRecruit/moreRecruit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    recruits: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var url = JSON.parse(decodeURIComponent(options.url));
    that.setData({
      url: url.data,
    })
    that.getRecruits();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getRecruits();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: 'CQU校园大哥大',
      path: '/pages/home/home',
      imageUrl: '/icons/eye.png'
    }
  },

  /**
   * 获取相关队友招募信息
   */
  getRecruits() {
    var that = this;
    wx.request({
      url: that.data.url,
      method: 'get',
      header: {
        "Content-Type": 'application/json'
      },
      success: function(res) {
        //console.log(res);
        if (res.data.code == 0) {
          that.setData({
            recruits: res.data.data.posts
          })
        } else {
          wx.showToast({
            title: '搜索相关队友招募信息失败,请重试！',
            icon: 'none',
            duration: 1500
          })
        }
      },
      fail: function(err) {
        console.log(err);
        wx.showToast({
          title: '未连接到服务器',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },

  /**
   * 点击查看详情
   */
  seeDetails: function(e) {
    // 将详细信息传给详情界面
    var that = this;
    var item = e.currentTarget.dataset.item;
    var tap = 1;
    var oid = item.tid;
    //console.log(item);
    wx.navigateTo({
      url: '../../details/details?currentTap=' + tap + '&oid=' + oid,
    })
  }
})