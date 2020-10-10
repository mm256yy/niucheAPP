const install  = (Vue, vm) => {
	//获取手机号
	const getTelephone = (params = {}) => vm.$u.get("/user/carparamter/getphone", {});
	//获取验证码
	const getIdentifyCode = (params = {}) => vm.$u.get("/user/carparamter/sendnode", params);
	//获取UUID
	const GetUUID = (params = {}) => vm.$u.get('/captchaImage', params);
	//登录
	const loginSubmit = (params = {}) => vm.$u.post('/user/login/login', params);
	//获取用户信息
	const getUserInfo = (params = {}) => vm.$u.get('/user/personal/personall', params);
	
	const  geList =  (params = {}) => vm.$u.get('/system/tag/list', params);
	
	const geListIMg =  (params = {}) => vm.$u.get('//user/image/recognicedrivecard', params);
	
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		getUserInfo,
		geList,
		GetUUID,
		getTelephone,
		getIdentifyCode,
	    loginSubmit
	 };
}

export default {
	install  
}