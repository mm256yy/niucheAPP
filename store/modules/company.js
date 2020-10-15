const company = {
    state: {
	   companyFirst:{},
	   companySecond:{},
	   companyThree:{},
	   comparyLogo:[],
	   peopleCard:[],
	   shengfenzheng:[],
	   carPubType:'',	
       carPubFirst:{},
	   carPubSecond:{},
	   carPubThree:{},
	   carPubFour:{},
	   carPubFive:{},
	   carPubSix:{},
	   carPubSeven:{},
	   carPubEight:{},
    },
    mutations: {
	   SET_COMPANYFIRST(state, data){state.companyFirst = data},
	   SET_COMPANYSECOND(state, data){state.companySecond = data},
	   SET_COMPANYTHREE(state, data){state.companyThree = data},
	   SET_COMPARYLOGO(state, data){state.comparyLogo = data},
	   SET_PEOPLECARD(state, data){state.peopleCard = data},
	   SET_SHENGFENZHENG(state, data){state.shengfenzheng = data},
	   
	   SET_CARPUBTYPE(state, data){state.carPubType = data},
       SET_CARPUBFIRST(state, data){state.carPubFirst = data},
	   SET_CARPUBSECOND(state, data){state.carPubSecond = data},
	   SET_CARPUBTHREE(state, data){state.carPubThree = data},
	   SET_CARPUBFOUR(state, data){state.carPubFour = data},
	   SET_CARPUBFIVE(state, data){state.carPubFive = data},
	   SET_CARPUBSIX(state, data){state.carPubSix = data},
	   SET_CARPUBSEVEN(state, data){state.carPubSeven = data},
	   SET_CARPUBEIGHT(state, data){state.carPubEight = data},
    },
	actions: {
		COMPANYFIRST({ commit }, data) {
		 uni.setStorageSync('companyFirst', data);
		 commit('SET_COMPANYFIRST', data);
		},
		COMPANYSECOND({ commit }, data) {
		 uni.setStorageSync('companySecond', data);
		 commit('SET_COMPANYSECOND', data);
		},
		COMPANYTHREE({ commit }, data) {
		 uni.setStorageSync('companyThree', data);
		 commit('SET_COMPANYTHREE', data);
		},
		
		COMPARYLOGO({ commit }, data) {
		 uni.setStorageSync('comparyLogo', data);
		 commit('SET_COMPARYLOGO', data);
		},
		PEOPLECARD({ commit }, data) {
		 uni.setStorageSync('peopleCard', data);
		 commit('SET_PEOPLECARD', data);
		},
		SHENGFENZHENG({ commit }, data) {
		 uni.setStorageSync('shengfenzheng', data);
		 commit('SET_SHENGFENZHENG', data);
		},
		
		CARPUBTYPE({ commit }, data) {
		 uni.setStorageSync('carPubType', data);
		 commit('SET_CARPUBTYPE', data);
		},
		CARPUBFIRST({ commit }, data) {
		 uni.setStorageSync('carPubFirst', data);
		 commit('SET_CARPUBFIRST', data);
		},
		CARPUBSECOND({ commit }, data) {
		 uni.setStorageSync('carPubSecond', data);
		 commit('SET_CARPUBSECOND', data);
		},
		CARPUBTHREE({ commit }, data) {
		 uni.setStorageSync('carPubThree', data);
		 commit('SET_CARPUBTHREE', data);
		},
		CARPUBFOUR({ commit }, data) {
		 uni.setStorageSync('carPubFour', data);
		 commit('SET_CARPUBFOUR', data);
		},
		CARPUBFIVE({ commit }, data) {
		 uni.setStorageSync('carPubFive', data);
		 commit('SET_CARPUBFIVE', data);
		},
		CARPUBSIX({ commit }, data) {
		 uni.setStorageSync('carPubSix', data);
		 commit('SET_CARPUBSIX', data);
		},
		CARPUBSEVEN({ commit }, data) {
		 uni.setStorageSync('carPubSeven', data);
		 commit('SET_CARPUBSEVEN', data);
		},
		CARPUBEIGHT({ commit }, data) {
		 uni.setStorageSync('carPubEight', data);
		 commit('SET_CARPUBEIGHT', data);
		},
	}
}

export default company