const db = wx.cloud.database()

const detail = code => {
  return db.collection('page').where({
    code
  }).get()
}
module.exports = {
  detail
}