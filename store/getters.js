const getters = {
  telephone:state => state.user.telephone,
  token:state => state.user.token,
  name:state => state.user.name,
  avatar:state => state.user.avatar,
  role:state => state.user.role,
  UUid:state => state.user.UUid,
  curThemeType: state =>{
	    let val = state.user.curThemeType;
		if(val) return val
		try {
			const value = uni.getStorageSync('curThemeType');
			if (value) {
				return value
			} else{
				return 'driver1'
			}
		} catch (e) {
			return 'dirver'
	}
  }
}
export default getters