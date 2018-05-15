/**
 * Created by 陈继斌 on 2018/5/2.
 */

const request = {}
request.post = function (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        resolve(res.data);
      },
      fail: function (err) {
        reject(err)
      }
    })
  })
}

export default request
