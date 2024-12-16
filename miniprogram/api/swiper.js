const db = wx.cloud.database()
const list = () =>{
     return db.collection('lbt').get();
}

module.exports = {
  list
}