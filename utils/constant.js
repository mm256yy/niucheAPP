

// let ipconfig = 'http://app-server.neocab.cn'//正式
let ipconfig = 'http://server.neocab.cn'
let shareIp = 'http://dev-share.neocab.cn' //分享测试
// let shareIp = 'http://share.neocab.cn'
export const action =ipconfig+ "/sys/upload/uploadImage";
export const actionJx =ipconfig+ "/user/image/BusinessImagedemo";
export const actionJs = ipconfig+'/user/image/DriverCardLicense';
export const baseUrl = ipconfig;
export const shareUrl =shareIp+"?shareId=" //邀请好友
export const shareArticleUrl = shareIp+"/driverServer/?id="//文章
export const shareViewUrl = shareIp+"/pubilshDetails/?shareId="//详情
export const updateUrl =ipconfig+"/app/getUrl?version=" 
export const version = '1.5.2.2'
export const publishObj = {
	//form 验证方式
	errorType:['message'],
	// navbar返回按钮样式
	backTextStyle:{'color':'#ffffff'},
	titleStyle:{'color':'#111111','fontSize':'32rpx','fontWeight':500},
	cityList:[{id: '0',text: '杭州',checked:false}],
	// publicList:[{id: '1',text: '公开',checked:false},{id: '0',text: '不公开',checked:false}],
	publiclist:[{id: '0',text: '不公开',checked:false},{id: '1',text: '公开',checked:false}],
	onLineList:[{id: '1',text: '网约车',checked:false},{id: '2',text: '出租车',checked:false}],
	//车辆类型
	carType:[{id: '1',text: '轿车',checked:false},{id: '2',text: 'SUV',checked:false},{id: '3',text: 'MPV',checked:false},{id: '4',text: '其他',checked:false}],
	//动力类型
	power:[{id: '1',text: '纯电动',checked:false},{id: '2',text: '插电混动',checked:false},{id: '3',text: '燃油车',checked:false}],
	//日期
	params: {year: true,month: true,day: false,hour: false,minute: false,second: false},
	//租赁周期
	leasePeriod: [{id: '1',text: '1个月',checked:false},{id: '2',text: '3个月',checked:false}, {id: '3',text: '6个月',checked:false}, {id: '4',text: '12个月',checked:false}],
	ageList:[{id: '1',text: '不限',checked:false },{id: '2',text:'1年内',checked:false },{id: '3',text:'1年-3年',checked:false },{id: '4',text:'3年-5年',checked:false },{id: '5',text:'5年以上',checked:false }],
	rentList:[{id: '0',text:'3000以内（含3000）',checked:false },{id: '1',text:'3000以上',checked:false }],
	objType:{
		wycList:[{id: '',text:'不限',checked:false },{id: '0',text:'0-2万公里',checked:false },{id: '1',text:'2-5万公里',checked:false},{id: '2',text:'5-10万公里',checked:false },{id: '3',text:'10-20万公里',checked:false },
		     {id: '4',text:'20-30万公里',checked:false },{id: '5',text:'30万公里以上',checked:false},],
		      czcList:[{id: '',text:'不限',checked:false },{id: '0',text:'0-2万公里',checked:false },{id: '1',text:'2-5万公里',checked:false },
		      {id: '2',text:'5-10万公里',checked:false },{id: '3',text:'10-20万公里',checked:false },{id: '4',text:'20-30万公里',checked:false },
		      {id: '5',text:'30-50万公里',checked:false },{id: '6',text:'50-70万公里',checked:false },{id: '7',text:'70万公里以上',checked:false}],
	},
	salaryList:[{id: '0',text:'6000以内',checked:false },{id: '1',text:'6000-8000',checked:false },{id: '2',text:'8000-10000',checked:false },{id: '3',text:'10000以上',checked:false }],
	hoursList:[{id: '0',text:'8小时',checked:false },{id: '1',text:'8-10小时',checked:false },{id: '2',text:'10小时以上',checked:false },{id: '3',text:'不限',checked:false }],
	benefitList:[{id:'0',text: '有3险',checked: false},{id:'1',text: '有5险',checked: false},{id:'2',text: '无责任底薪',checked: false},
			{id:'3',text: '月休4天',checked: false}]
	
}