const db = wx.cloud.database()

const create = ({  nickname }) => {
  return db.collection('user').add({
    data: {
      nickname:nickname
    }
  })
}

const me = () => {
  return db.collection('user').get();
}

module.exports = {
  create,
  me
}