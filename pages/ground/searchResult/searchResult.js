// pages/ground/searchResult/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    val:"",
    people:[],        // 检索的相关用户
    activity:[],      // 检索的活动发布
    recruit:[],       // 检索的队友招募
    movement:[],      // 检索的精彩瞬间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;

    // 父组件选中子组件以便调用子组件函数，#searchBar代表的是component组件id名称
    that.searchBar=that.selectComponent("#searchBar");

    // 调用子组件函数
    that.searchBar.changeVal(options.val);
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

  },

  /**
   * 获取更多结果
   */
  getMoreResult:function(e){
    var that=this;
    var id = e.currentTarget.id;
    var list=[];

    // 将检索结果赋值给list
    switch(id) {
      case "morePeople": {
        list=that.data.people;
        break;
      }
      case "moreActivity": {
        list = that.data.activity;
        break;
      }
      case "moreRecruit": {
        list = that.data.recruit;
        break;
      }
      case "moreMovement": {
        list = that.data.movement;
        break;
      }
      default:{
        // 可扩展
      }
    }

    // 将list的值传到相应“查看更多”界面
    wx.navigateTo({
      url: "../../moreResult/" + id + "/" + id + '?list=' + list, // 依据id进行不同的跳转，传参
      fail: function () { }
    })
  },

  /**
 * 点击查看详情
 */
  seeDetails: function (e) {
    var that = this;

    // 将详细信息传给详情界面，需要调试
    var item = e.currentTarget.dataset.item;
    console.log(typeof (item));
    wx.navigateTo({
      url: 'details/details?item=' + item + "&currentTap=" + that.data.currentTab,
    })
  },

  /**
   * 长按收藏事件
   */
  collect: function (e) {
    // 待补充
  }
})