// pages/moreResult/moreMoment/moreMoment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: "",
    moments: []
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
    that.getMoments();
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.getMoments();
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
   * 获取相关精彩瞬间信息
   */
  getMoments() {
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
            moments: res.data.data.moments
          })
        } else {
          wx.showToast({
            title: '搜索相关精彩瞬间信息失败,请重试！',
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
    var tap = 2;
    var oid = item.mid;
    //console.log(item);
    wx.navigateTo({
      url: '../../details/details?currentTap=' + tap + '&oid=' + oid,
    })
  }
})