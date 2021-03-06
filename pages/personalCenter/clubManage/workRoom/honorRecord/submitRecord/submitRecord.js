// pages/personalCenter/clubManage/workRoom/honorRecord/submitRecord/submitRecord.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '2020-05-11',
    cid: "",
    content: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      cid: options.cid
    })
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
   * 时间选择器控制
   */
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 输入荣誉内容
   */
  inputContent: function(e) {
    let that = this;
    that.setData({
      content: e.detail.value
    })
  },

  /**
   * 上传荣誉记录
   */
  submitRecord: function() {
    let that = this;
    var myDate = new Date(that.data.date);
    wx.request({
      url: 'https://tzl.cyyself.name/honorRecord/addHonorRecord?cid=' + that.data.cid,
      header: {
        'content-type': 'application/json'
      },
      method: "POST",
      data: {
        'event': that.data.content,
        'time': myDate.getFullYear() + "/" + (myDate.getMonth() + 1) + "/" + myDate.getDate()
      },
      success: function(res) {
        if (res.data.code == 0) {
          //console.log(res);
          wx.showToast({
            title: '保存记录成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function() {
            wx.navigateBack({ //返回上一页面或多级页面
              delta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: '保存荣誉记录失败',
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
  }
})