const user = {
  state: {
	telephone:'',
    token:'' ,
    name: '',
    avatar: '',
    role: '',
	UUid:''
  },

  mutations: {
	SET_TELEPHONE: (state, telephone) => {
	  state.telephone = telephone
	},  
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.role = roles
    },
	SET_UUID: (state,UUid) =>{
		state.UUid = UUid
	}
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
	  console.log(userInfo)
	 uni.setStorageSync('telephone', userInfo.telephone);
	 uni.setStorageSync('token', userInfo.token);
	 uni.setStorageSync('role', userInfo.role);
	 commit('SET_TOKEN', userInfo.token);
	 commit('SET_TELEPHONE', userInfo.telephone);
	 commit('SET_ROLES', userInfo.role);
    },
    UUid({ commit }, UUid) {
	 uni.setStorageSync('UUid', UUid);
	 commit('SET_UUID', UUid);

    },
    // 退出系统
    LogOut({ commit, state }) {
	  commit('SET_TOKEN', '')
	  commit('SET_ROLES', [])
	  commit('SET_PERMISSIONS', [])
	  removeToken()
    },
  }
}

export default user
