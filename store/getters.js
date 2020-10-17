const getters = {
  telephone:state => uni.getStorageSync('telephone'),
  token:state => uni.getStorageSync('token'),
  name:state => state.user.name,
  avatar:state => state.user.avatar,
  role:state => uni.getStorageSync('role'),
  UUid:state => uni.getStorageSync('UUid'),
  today:state => uni.getStorageSync('today'),
  curThemeType:state => uni.getStorageSync('curThemeType') || 'dirver',
  companyFirst:state => uni.getStorageSync('companyFirst'),
  companySecond:state => uni.getStorageSync('companySecond'),
  companyThree:state => uni.getStorageSync('companyThree'),
  comparyLogo:state => uni.getStorageSync('comparyLogo'),
  peopleCard:state => uni.getStorageSync('peopleCard'),
  shengfenzheng:state => uni.getStorageSync('shengfenzheng'),
  carPubType:state => uni.getStorageSync('carPubType'),
  carPubFirst:state => uni.getStorageSync('carPubFirst'),
  carPubSecond:state => uni.getStorageSync('carPubSecond'),
  carPubThree:state => uni.getStorageSync('carPubThree'),
  carPubFour:state => uni.getStorageSync('carPubFour'),
  carPubFive:state => uni.getStorageSync('carPubFive'),
  carPubSix:state => uni.getStorageSync('carPubSix'),
  carPubSeven:state => uni.getStorageSync('carPubSeven'),
  carPubEight:state => uni.getStorageSync('carPubEight'),
  carPubUpload:state => uni.getStorageSync('carPubUpload'),
  carPubPosition:state => uni.getStorageSync('carPubPosition'),
}
export default getters
