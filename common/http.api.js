const install  = (Vue, vm) => {
	//获取手机号
	const getTelephone = (params = {}) => vm.$u.get("/user/carparamter/getphone", {});
	//获取验证码
	const getIdentifyCode = (params = {}) => vm.$u.get("/user/carparamter/sendnode", params);
	//获取验证码
	const getPubSendMsg = (params = {}) => vm.$u.get("/user/carparamter/PubSendMsg", params);
	//获取UUID
	const GetUUID = (params = {}) => vm.$u.get('/captchaImage', params);
	//登录
	const loginSubmit = (params = {}) => vm.$u.post('/user/login/login', params);
	//获取用户信息
	const getUserInfo = (params = {}) => vm.$u.get('/user/personal/personall', params);
	//获取公司信息
	const  getCompanyInfo =  (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyTextSelectByid', params);
	//企业认证保存
	const saveAuth =  (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyAuthentication', params);
	//企业认证修改保存
	const editCompany = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyTextUpdateByid', params)
	//查询企业联系人信息
	const getCompanyPerson =  (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparySelectPeopleByComparyid', params);
	//修改企业联系人信息
	const editCompanyPerson = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyUpdatePeopleByComparyid', params)
	//查询企业认证信息
	const getCompanyAll =  (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyAllByComparyid', params);
	//企业认证all
	const saveAuthAll =  (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyAllUpdateByComparyid', params);
	// 
	// 
	//获取车辆品牌
	const  getCarBrand =  (params = {}) => vm.$u.get('/user/carall/AlibabaCarBrandAll', params);
	//获取车辆品牌
	const  getCarSystem =  (params = {}) => vm.$u.get('/user/carall/AlibabaCarBrandGetCarXilie', params);
	//获取车辆品牌
	const  getCarModel =  (params = {}) => vm.$u.get('/user/carall/AlibabaCarXilieGetCarXinghao', params);
	//获取系统特色标签
	const  getSystemTag =  (params = {}) => vm.$u.post('/system/comparymain/SystemTag', params);
	//转卖转租保存
	const  saveMainBusiness =  (params = {}) => vm.$u.post('/system/comparymain/mainbusiness', params);
	//获取问题列表
	const  getQuestion =  (params = {}) => vm.$u.get('/system/carmobancollect/CarMobanAlltext', params);
	//保存问题
	const  saveAnswer =  (params = {}) => vm.$u.post('/system/carmobancollect/CarMobanInsert', params);
     //获取已有车辆
	const  getMyCar =  (params = {}) => vm.$u.get('/system/comparymain/OneClickCachealreadHaveCar', params);
	//保存购车需求
	const  saveShoping =  (params = {}) => vm.$u.post('/system/comparyqiushopping', params);
	//查询车辆logo
	const  getCarLogo =  (params = {}) => vm.$u.get('/user/carall/CarBrandGetPhotoUrl', params);
	//保存招聘
	const  saveCompanyInvite = (params = {}) => vm.$u.post('/system/comparyinvite/ComparyInviteAdd', params);
	 //求购查询
	 const  buying = (params = {}) => vm.$u.get('/system/usermain/UsermainAskToBuy', params);
	 //求职招聘,租车查询
	 const  askWork = (params = {}) => vm.$u.get('/system/usermain/UsermainRentCar', params);
	 //收藏
	 const collect = (params = {}) => vm.$u.get('/system/comparymain/PubCollect', params);
	 //租车发布-司机
	 const  releaseRent = (params = {}) => vm.$u.post('/user/drivingLicense/addUserWanted', params);
	 //求职发布-司机
	 const  releaseSearch = (params = {}) => vm.$u.post('/user/drivingLicense/addUserJobWanted', params);
	 //卖车招聘
	 const  sellCar = (params = {}) => vm.$u.post('/system/usermain/UsermainSellCar', params);
	 //司机端租车首页展示
	 const  homeRent = (params = {}) => vm.$u.get('/system/usermain/DriverSideRentCarList', params);
	 //驾照认证查询
	  const  listDrivingLicense = (params = {}) => vm.$u.get('/user/drivingLicense/listDrivingLicense', params);
	  //保存驾照认证
	  const  addDrivingLicense = (params = {}) => vm.$u.post('/user/drivingLicense/addDrivingLicense', params);
	 //个人中心首页
	  const  listUserMessage = (params = {}) => vm.$u.get('/user/drivingLicense/listUserMessage', params);
	  //个人中心详情页
	  const  listUserMessageInfo = (params = {}) => vm.$u.get('/user/drivingLicense/listUserMessageInfo', params);
	  //刷新租车/求职公开状态
	  const  refreshUserJobWanted = (params = {}) => vm.$u.post('/user/drivingLicense/refreshUserJobWanted', params);
	  //修改租车/求职公开状态
	  const  getUserJobWanted = (params = {}) => vm.$u.get('/user/drivingLicense/getUserJobWanted', params);
	  //我的发布 租车列表
	  const  listUserWanted = (params = {}) => vm.$u.get('/user/drivingLicense/listUserWanted', params);
	  //我的发布 求职列表
	  const  listUserJobWanted = (params = {}) => vm.$u.get('/user/drivingLicense/listUserJobWanted', params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		listUserJobWanted,
		listUserWanted,
		getUserJobWanted,
		refreshUserJobWanted,
		listUserMessage,
		listUserMessageInfo,
		addDrivingLicense,
		listDrivingLicense,
		saveCompanyInvite,
		getCarLogo,
		saveShoping,
		getMyCar,
		getQuestion,
		saveAnswer,
		saveMainBusiness,
		getSystemTag,
		getCarSystem,
		getCarModel,
		getCarBrand,
		saveAuthAll,
		getCompanyAll,
		editCompanyPerson,
		getCompanyPerson,
		getPubSendMsg,
		saveAuth,
		editCompany,
		getUserInfo,
		getCompanyInfo,
		GetUUID,
		getTelephone,
		getIdentifyCode,
	    loginSubmit,
		buying,
		askWork,
		sellCar,
		homeRent,
		collect,
		releaseRent,
		releaseSearch
	 };
}

export default {
	install  
}