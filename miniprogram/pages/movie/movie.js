// pages/movie/movie.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherBJ:{}
  },
  searchBJ:async function(){
    let res=await db.collection('Weathers').doc('3adec2825f38a7e900cb36525537b1fd').get()
    this.setData({
      weatherBJ:res.data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    await wx.request({
      url: 'http://apis.juhe.cn/simpleWeather/query',
      data: {
        city: "北京",
        key: "9e6e5ce40a497c47a08c8e96af31c76d"
      },
      success: res => {
        let data = res.data
        console.log(data)
        db.collection('Weathers').add({
          data: {
            reason: data.reason,
            city: data.result.city,
            future: {
              one: {
                date: data.result.future[0].date,
                direct: data.result.future[0].direct,
                temperature: data.result.future[0].temperature,
                weather: data.result.future[0].weather,
              },
              two: {
                date: data.result.future[1].date,
                direct: data.result.future[1].direct,
                temperature: data.result.future[1].temperature,
                weather: data.result.future[1].weather,
              }
            }
          }
        })
        // this.setData({
        //   dataRes:data
        // })
      },
      fail: err => {
        console.log(err)
      }
    })
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