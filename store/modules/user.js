const user = {
  state: {
	 curThemeType: '',    
	telephone:'',
    token:'' ,
    name: '',
    avatar: '',
    role: '',
	UUid:''
  },

  mutations: {
	SET_TELEPHONE(state, telephone){
	  state.telephone = telephone
	},  
    SET_TOKEN(state, token){
      state.token = token
    },
    SET_NAME(state, name){
      state.name = name
    },
    SET_AVATAR(state, avatar){
      state.avatar = avatar
    },
    SET_ROLES(state, roles){
      state.role = roles
    },
	SET_UUID(state,UUid){
		state.UUid = UUid
	},
	SET_THEME_TYPE(state,data) {
	    state.curThemeType = data
	},  
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
	 let Authorization ='Bearer '+ userInfo.token;
	 uni.setStorageSync('telephone', userInfo.telephone);
	 uni.setStorageSync('token', Authorization);
	 uni.setStorageSync('role', userInfo.role);
	 commit('SET_TOKEN', Authorization);
	 commit('SET_TELEPHONE', userInfo.telephone);
	 commit('SET_ROLES', userInfo.role);
    },
    UUid({ commit }, UUid) {
	 uni.setStorageSync('UUid', UUid);
	 commit('SET_UUID', UUid);

    },
	CurThemeType({ commit }, state) {
	 uni.setStorageSync('curThemeType', state);
	 commit('SET_THEME_TYPE', state);
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
