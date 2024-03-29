const install = (Vue, vm) => {
	//获取手机号
	const getTelephone = (params = {}) => vm.$u.get("/user/carparamter/getphone", {});
	//获取验证码
	const getIdentifyCode = (params = {}) => vm.$u.post("/sys/upload/sendSms?codeType=" + params.codeType + "&phone=" +
		params.phone, params);
	//获取验证码
	const getPubSendMsg = (params = {}) => vm.$u.get("/user/carparamter/PubSendMsg", params);
	//获取UUID
	const GetUUID = (params = {}) => vm.$u.get('/captchaImage', params);
	//登录
	const loginSubmit = (params = {}) => vm.$u.post('/user/login/login', params);
	//获取用户信息
	const getUserInfo = (params = {}) => vm.$u.get('/user/personal/personall', params);
	//获取公司信息
	const getCompanyInfo = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyTextSelectByid', params);
	//企业认证保存
	const saveAuth = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyAuthentication', params);
	//企业认证修改保存
	const editCompany = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyTextUpdateByid', params)
	//查询企业联系人信息
	const getCompanyPerson = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparySelectPeopleByComparyid',
		params);
	//修改企业联系人信息
	const editCompanyPerson = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyUpdatePeopleByComparyid',
		params)
	//查询企业认证信息
	const getCompanyAll = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyAllByComparyid', params);
	//企业认证all
	const saveAuthAll = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyAllUpdateByComparyid', params);
	// 
	// 
	//获取车辆品牌
	const getCarBrand = (params = {}) => vm.$u.get('/user/carall/AlibabaCarBrandAll', params);
	//获取车辆品牌
	const getCarSystem = (params = {}) => vm.$u.get('/user/carall/CarAllSelectCarSeriesname', params);
	//获取车辆品牌
	const getCarModel = (params = {}) => vm.$u.get('/user/carall/CarAllSelectCarModel', params);
	//获取系统特色标签
	const getSystemTag = (params = {}) => vm.$u.post('/system/comparymain/SystemTag', params);
	//转卖转租保存
	const saveMainBusiness = (params = {}) => vm.$u.post('/system/comparymain/mainbusiness', params);
	//获取问题列表
	const getQuestion = (params = {}) => vm.$u.get('/system/carmobancollect/CarMobanAlltext', params);
	//获取已有车辆
	const getMyCar = (params = {}) => vm.$u.get('/system/comparymain/OneClickCachealreadHaveCar', params);
	//保存购车需求
	const saveShoping = (params = {}) => vm.$u.post('/system/comparyqiushopping', params);
	//查询车辆logo
	const getCarLogo = (params = {}) => vm.$u.get('/user/carall/CarBrandGetPhotoUrl', params);
	//保存招聘
	const saveCompanyInvite = (params = {}) => vm.$u.post('/system/comparyinvite/ComparyInviteAdd', params);
	//公司求购首页展示
	const buying = (params = {}) => vm.$u.get('/system/usermain/UsermainAskToBuy', params);
	//公司求购详情
	const detailBuying = (params = {}) => vm.$u.get('/system/usermain/DetailsCarPurchaseRequirements', params);
	//招聘,租车查询-公司
	const askWork = (params = {}) => vm.$u.get('/system/usermain/listDriverWanted', params);
	//收藏
	const collect = (params = {}) => vm.$u.get('/system/comparymain/PubCollect', params);
	//租车发布-司机
	const releaseRent = (params = {}) => vm.$u.post('/user/drivingLicense/addUserWanted', params);
	//求职发布-司机
	const releaseSearch = (params = {}) => vm.$u.post('/user/drivingLicense/addUserJobWanted', params);
	//公司卖车首页展示
	const sellCar = (params = {}) => vm.$u.get('/system/usermain/UsermainSellCar', params);
	//公司卖车详情
	const detailSellCar = (params = {}) => vm.$u.get('/system/usermain/ComparySellCarTextByid', params);
	//卖车详情-参数配置
	const setting = (params = {}) => vm.$u.get('/system/usermain/carModelIdGetCarDetailtedParamter', params);
	//公司其他信息页面查看公司信息
	const messageCompany = (params = {}) => vm.$u.get('/system/usermain/ComparySellThenComparyText', params);
	//公司该店其他信息-在售
	const detailOtherSelling = (params = {}) => vm.$u.get('/system/usermain/ComparySellCarThenComparyOherText', params);
	//公司该店其他信息-求购
	const detailOtherBuy = (params = {}) => vm.$u.get('/system/usermain/ComparySellCarThenComparyOherTextAskToShop',
		params);
	//司机端租车首页展示
	const homeRent = (params = {}) => vm.$u.get('/system/usermain/DriverSideRentCarList', params);
	//司机端租车详情
	const detailRent = (params = {}) => vm.$u.get('/system/usermain/DriverSideRentCarListByOne', params);
	//司机端招聘首页展示
	const homeSearch = (params = {}) => vm.$u.get('/system/usermain/DriverSideInvideCarList', params);
	//司机端招聘详情
	const detailSearch = (params = {}) => vm.$u.get('/system/usermain/DriverSideInvideCarListByOne', params);
	//司机端该店其他信息-租车
	const detailOtherRenting = (params = {}) => vm.$u.get('/system/usermain/DriverSellCarThenComparyOherTextRentCar',
		params);
	//司机端该店其他信息-招聘
	const detailOtherSearching = (params = {}) => vm.$u.get('/system/usermain/DriverSellCarThenComparyOherTextInvite',
		params);
	//驾照认证查询
	const listDrivingLicense = (params = {}) => vm.$u.get('/user/drivingLicense/listDrivingLicense', params);
	//保存驾照认证
	const addDrivingLicense = (params = {}) => vm.$u.post('/user/drivingLicense/addDrivingLicense', params);
	//个人中心首页
	const listUserMessage = (params = {}) => vm.$u.get('/user/drivingLicense/listUserMessage', params);
	//个人中心详情页
	const listUserMessageInfo = (params = {}) => vm.$u.get('/user/drivingLicense/listUserMessageInfo', params);
	//刷新租车/求职公开状态
	const refreshUserJobWanted = (params = {}) => vm.$u.post('/user/drivingLicense/refreshUserJobWanted?driverDemandId=' +
		params.driverDemandId, {});
	//修改租车/求职公开状态
	const updateUserWantedState = (params = {}) => vm.$u.post(
		'/user/drivingLicense/updateUserWantedState?driverDemandId=' + params.driverDemandId + '&isOpen=' + params.isOpen, {}
	);

	//我的发布 租车列表
	const listUserWanted = (params = {}) => vm.$u.get('/user/drivingLicense/listUserWanted', params);
	//我的发布 求职列表
	const listUserJobWanted = (params = {}) => vm.$u.get('/user/drivingLicense/listUserJobWanted', params);
	//修改司机求租内容
	const updateUserWanted = (params = {}) => vm.$u.post('/user/drivingLicense/updateUserWanted?driverDemandId=' + params
		.driverDemandId, params);
	//修改司机求职内容
	const updateUserJobWanted = (params = {}) => vm.$u.post('/user/drivingLicense/updateUserJobWanted?driverDemandId=' +
		params.driverDemandId, params);
	//查询司机求租详情
	const getUserWanted = (params = {}) => vm.$u.get('/user/drivingLicense/getUserWanted', params);
	//查询司机求职详情
	const getUserJobWanted = (params = {}) => vm.$u.get('/user/drivingLicense/getUserJobWanted', params);
	//删除租车或求职
	const deleteUserJobWanted = (params = {}) => vm.$u.post('/user/drivingLicense/deleteUserJobWanted?driverDemandId=' +
		params.driverDemandId, {});
	//个人中心首页
	const addUserMessageInfo = (params = {}) => vm.$u.post('/user/drivingLicense/addUserMessageInfo', params);
	//公司发布 我的租车  
	const ComparyMyRentCarList = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyMyRentCarList', params);
	//公司发布 我的招聘
	const ComparyMyInviteList = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyMyInviteList', params);
	//公司发布 我的卖车
	const ComparyMySellCarList = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyMySellCarList', params);
	//公司发布 我的求购
	const ComparyMyAskToShopList = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyMyAskToShopList',
		params);
	//我的收藏
	const DriverMyCollectionRent = (params = {}) => vm.$u.get('/system/usercollect/DriverMyCollectionRent', params);
	const MyCollectionSell = (params = {}) => vm.$u.get('/system/usercollect/MyCollectionSell', params);
	const ComparyMyInviteForOne = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyMyInviteForOne', params);
	const logout = (params = {}) => vm.$u.post('/user/login/logout', params);
	//我的租车id查询
	const ComparyRentCarEchoText = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyRentCarEchoText',
		params);
	//我的求购
	const ComparyAskToShopEchoText = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyAskToShopEchoText',
		params);
	//我的求购 详情
	const ComparyMyAskToShopForOne = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyMyAskToShopForOne',
		params);
	//我的发布 删除
	const MyIssueDelete = (params = {}) => vm.$u.get('/system/usercomparybasictext/MyIssueDelete', params);
	//我的发布 上下架
	const MyIssueHighLowLimit = (params = {}) => vm.$u.get('/system/usercomparybasictext/MyIssueHighLowLimit', params);
	const ComparyMySellCarForOne = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyMySellCarForOne',
		params);
	const ComparyInviteEchoText = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparyInviteEchoText', params);
	//购车需求更新
	const ComparyAskToShopUpdate = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyAskToShopUpdate',
		params);
	//我的招聘
	const ComparyInviteUpdate = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyInviteUpdate', params);
	//我的租车
	// const  ComparyInviteAdd = (params = {}) => vm.$u.post('/system/usercomparybasictext/ComparyInviteAdd', params);
	//公司我的店铺查看公司信息
	const getMessageCompany = (params = {}) => vm.$u.get('/system/usercomparybasictext/ComparySellThenComparyText',
		params);
	//获取认证状态
	const getStatus = (params = {}) => vm.$u.post('/user/drivingLicense/getStatus', params);
	//刷新
	const MyIssueRefresh = (params = {}) => vm.$u.get('/system/usercomparybasictext/MyIssueRefresh', params);
	//意见反馈
	const feedback = (params = {}) => vm.$u.post('/app/feedback', params);
	//弹窗配置
	const popupConfig = (params = {}) => vm.$u.get('/popup/get', params);
	//消息列表
	const listMessage = (params = {}) => vm.$u.post('/messagesend/pub/pubSendMessageReleaseTextAll', params);
	//查看是否有未读通知项
	const haveIs = (params = {}) => vm.$u.post('/MessageReceptionController/pub/userSelectNoSeeMessageNum', params);
	//查看站内信内容
	const viewMessage = (params = {}) => vm.$u.post('/MessageReceptionController/pub/userSelectNoSeeMessage', params);
	//根据首字母查询品牌
	const brandList = (params = {}) => vm.$u.get('/system/usermain/carSelectCarBrandByInitialOrBrandName', params);
	//分享数据 认证
	const statistics = (params = {}) => vm.$u.post('/BillingdetailsController/getShareResult', params);
	//低价好车
	const driverSideHomePage = (params = {}) => vm.$u.get('/user/lowPrice/driverSideHomePage', params);
	//新春福利
	const getYearWelfare = (params = {}) => vm.$u.get('/app/newYear/list', params);
	//是否可提现
	const getCashFlag = (params = {}) => vm.$u.get('/BillingdetailsController/checkWithdraw', params);
	//提现保存
	const saveCashAccount = (params = {}) => vm.$u.post('/BillingdetailsController/addBillingdetails', params);
	//我的账单列表
	const getBillDetails = (params = {}) => vm.$u.get('/BillingdetailsController/listBillingDetails', params);
	//我的账单详情
	const getMyBillDetails = (params = {}) => vm.$u.get('/BillingdetailsController/theBillingDetails', params);
	// 司机服务 行业动态
	const driverDynamic = (params = {}) => vm.$u.get('/driverserver/industydynamics/queryList', params);
	// 司机服务 活动大全
	const driverActivities = (params = {}) => vm.$u.get('/driverserver/activityttf/queryList', params);
	// 司机服务 接单分享
	const driverOrder = (params = {}) => vm.$u.get('/driverserver/orderToShare/queryList', params);
	// 司机服务 大神分享
	const driverShare = (params = {}) => vm.$u.get('/driverserver/leaderShare/queryList', params);
	// 行业动态 内容页
	const contentDynamic = (params = {}) => vm.$u.get('/driverserver/industydynamics/query', params);
	// 活动大全 内容页
	const contentActivities = (params = {}) => vm.$u.get('/driverserver/activityttf/query', params);
	// 接单分享 内容页
	const contentOrder = (params = {}) => vm.$u.get('/driverserver/orderToShare/query', params);
	// 大神分享 内容页
	const contentShare = (params = {}) => vm.$u.get('/driverserver/leaderShare/query', params);
	//埋点统计统一接口
	const setEvent = (params = {}) => vm.$u.get('/user/beahvior/event', params);
	//获取sing
	const getSing = (params = {}) => vm.$u.post('/app/tencentChat/getChatSinger', params);
	//公司订单列表
	const orderList = (params = {}) => vm.$u.post(
		'/order/company/list?pageNum=' + params.pageNum + '&pageSize=' + params.pageSize
		+ '&state=' + params.state + '&orderByColumn=' + params.orderByColumn + '&isAsc=' + params.isAsc, {}
	);
	//公司订单详情
	const orderDetail = (params = {}) => vm.$u.post(
		'/order/company/get?orderId=' + params.orderId, {}
	);
	//校验身份信息
	const verify = (params = {}) => vm.$u.post('/order/checkUser', params);
	//公司新建订单
	const orderNew = (params = {}) => vm.$u.post('/order/add', params);
	//查看公司端是否绑定支付宝账户
	const isBinDingAliPayID = (params = {}) => vm.$u.post('/system/usermain/comparyIsBinDingAliPayID', params);
	//新增商品信息登记
	const registerAdd = (params = {}) => vm.$u.post('/order/register/message/add', params);
	//对账中心列表 账单列表
	const accountList = (params = {}) => vm.$u.post(
		'/order/CheckForTheCenterList?billstate=' + params.billstate + "&pageNum=" +
		params.pageNum + "&pageSize=" +
		params.pageSize, {}
	);
	//对账中心-实际到账总计
	const total = (params = {}) => vm.$u.post(
		'/order/checkForTheCenterPub', {}
	);
	//账单详情
	const accountDetail = (params = {}) => vm.$u.post(
		'/order/CheckForTheCenterForOne?orderId=' + params.orderId, {}
	);
	//获取验证金额
	const getMoney = (params = {}) => vm.$u.post(
		'/alipay/alipayTransferMerchant?payeeAccount=' + params.payeeAccount + "&realname=" +
		params.realname + "&companyName=" +
		params.companyName+ "&userMainId=" +
		params.userMainId, {}
	);
	//用户绑定支付宝账户
	const accountBind = (params = {}) => vm.$u.get(
		'/alipay/userInsertAliPayID?aliPayId=' + params.aliPayId + "&checkMoney=" +
		params.checkMoney + "&userMainId=" +
		params.userMainId + "&userName=" +
		params.userName, {}
	);
	//获取支付宝变更次数
	const getNum = (params = {}) => vm.$u.post(
		'/alipay/getAlipayIdNum', {}
	);
	//查询公司授权状态
	const stateRight = (params = {}) => vm.$u.get(
		'/app/fdd/auth/check?userId=' + params.userId, {}
	);
	//新增验车单
	const checkCarSave = (params = {}) => vm.$u.post('/order/car/message/add', params);
	//查询验车单
	const checkCarList = (params = {}) => vm.$u.post(
		'/order/car/message/get?orderId=' + params.orderId, {}
	);
     //司机我的订单
	const driverOrderList = (params = {}) => vm.$u.post("/order/driver/list?pageNum=" + params.pageNum + "&pageSize=" +
		params.pageSize+ "&orderByColumn=" +params.orderByColumn+ "&isAsc=" +params.isAsc, {});
	//司机订单查询详情
	const driverOrderView = (params = {}) => vm.$u.post('/order/driver/get?orderId='+params.id, {});
	//获取支付宝订单信息
	const getOrderInfo = (params = {}) => vm.$u.post('/order/app/alipay', params);
	//个人中心页统计订单
	//公司
	const getCompanyOrder = (params = {}) => vm.$u.post('/order/statistics/get', params);
	//司机
	const getDriverOrder = (params = {}) => vm.$u.post('/order/statistics/driver/get', params);
	//失效
	const orderEfficacy = (params = {}) => vm.$u.post('/order/lose/efficacy?orderId='+params.orderId, params);
	//确认提车
	const orderDeliveryOfVehicle = (params = {}) => vm.$u.post('/order/affirm/deliveryOfVehicle?orderId='+params.orderId, params);
	//获取价格
	const orderPrice = (params = {}) => vm.$u.post('/order/real/price/get?orderId='+params.orderId+'&type='+params.type, params);
	//法大大
	const getFdd = (params = {}) => vm.$u.get('/app/fdd/server/'+params.orderId+'/'+params.userId, {});
	//法大大-授权
	const getRight = (params = {}) => vm.$u.get('/app/fdd/server/'+params.userId, {});
	//退单
	const orderCancel = (params = {}) => vm.$u.post('/order/cancel?orderId='+params.orderId+'&cancelSort='+params.cancelSort+'&cancelReason='+params.cancelReason, params);
	
	//注销
	const cancelAccount = (params = {}) => vm.$u.get('/system/usermain/cancel', params);
	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.api = {
		cancelAccount,
		orderCancel,
		orderPrice,
		orderDeliveryOfVehicle,
		orderEfficacy,
		getFdd,
		getRight,
		getDriverOrder,
		getCompanyOrder,
		driverOrderView,
		driverOrderList,
		checkCarSave,
		checkCarList,
		getOrderInfo,
		getSing,
		setEvent,
		contentShare, // 大神分享 内页
		contentOrder, // 接单分享 内页
		contentActivities, // 活动大全 内页
		contentDynamic, // 行业动态 内页
		driverShare, // 大神分享
		driverOrder, // 接单分享
		driverActivities, // 活动大全
		driverDynamic, // 行业动态
		getMyBillDetails,
		getBillDetails,
		getCashFlag,
		saveCashAccount,
		getYearWelfare,
		driverSideHomePage,
		statistics,
		popupConfig,
		MyIssueRefresh,
		getStatus,
		ComparyInviteUpdate,
		ComparyAskToShopUpdate,
		ComparyInviteEchoText,
		ComparyMySellCarForOne,
		MyIssueHighLowLimit,
		MyIssueDelete,
		ComparyMyAskToShopForOne,
		ComparyAskToShopEchoText,
		ComparyRentCarEchoText,
		logout,
		ComparyMyInviteForOne,
		MyCollectionSell,
		DriverMyCollectionRent,
		ComparyMyAskToShopList,
		ComparyMySellCarList,
		ComparyMyInviteList,
		ComparyMyRentCarList,
		addUserMessageInfo,
		deleteUserJobWanted,
		getUserJobWanted,
		getUserWanted,
		updateUserJobWanted,
		updateUserWanted,
		listUserJobWanted,
		listUserWanted,
		updateUserWantedState,
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
		homeSearch,
		collect,
		releaseRent,
		releaseSearch,
		detailBuying,
		detailSellCar,
		detailRent,
		detailSearch,
		messageCompany,
		detailOtherSelling,
		detailOtherBuy,
		detailOtherRenting,
		detailOtherSearching,
		getMessageCompany,
		feedback,
		listMessage,
		haveIs,
		viewMessage,
		setting,
		brandList,
		orderList,
		orderDetail,
		orderNew,
		registerAdd,
		verify,
		accountList,
		accountDetail,
		getMoney,
		accountBind,
		getNum,
		total,
		stateRight,
		isBinDingAliPayID
	};
}

export default {
	install
}
