const db = wx.cloud.database()
const list = () =>{
     return db.collection('store').limit(10).get();
}

module.exports = {
  list
}