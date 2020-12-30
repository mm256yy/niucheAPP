

// let ipconfig = 'http://app-server.neocab.cn'//正式
let ipconfig = 'http://server.neocab.cn'
export const action =ipconfig+ "/sys/upload/uploadImage";
export const actionJx =ipconfig+ "/user/image/BusinessImagedemo";
export const actionJs = ipconfig+'/user/image/DriverCardLicense';
export const baseUrl = ipconfig;
export const shareUrl ="http://share.neocab.cn?shareId=" //分享
export const updateUrl =ipconfig+"/app/getUrl?version=" 
export const version = '1.5.1.9'//常量 样式
export const publishObj = {
	//form 验证方式
	errorType:['message'],
	// navbar返回按钮样式
	backTextStyle:{'color':'#ffffff'},
	titleStyle:{'color':'#111111','fontSize':'32rpx','fontWeight':500},
	onLineList:[{id: '1',text: '网约车',checked:false},{id: '2',text: '出租车',checked:false}],
	//车辆类型
	carType:[{id: '1',text: '轿车',checked:false},{id: '2',text: 'SUV',checked:false},{id: '3',text: 'MPV',checked:false},{id: '4',text: '其他',checked:false}],
	//动力类型
	power:[{id: '1',text: '纯电动',checked:false},{id: '2',text: '插电混动',checked:false},{id: '3',text: '燃油车',checked:false}],
	//日期
	params: {year: true,month: true,day: false,hour: false,minute: false,second: false},
	//租赁周期
	leasePeriod: [{id: '1',text: '1个月',checked:false},{id: '2',text: '3个月',checked:false}, {id: '3',text: '6个月',checked:false}, {id: '4',text: '12个月',checked:false}],
	ageList:[{id: '1',text: '不限',checked:false },{id: '2',text:'1年内',checked:false },{id: '3',text:'1年-3年',checked:false },{id: '4',text:'3年-5年',checked:false },{id: '5',text:'5年以上',checked:false }]
	
	
}