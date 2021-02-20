//
//1.打正式包 请切换master分支 修改 <processEnvType> 为 true 即可
//2.本地调试正式环境  修改 <processEnvType> 为 true 即可
//2.其他情况此处不用修改，特殊情况除外

//打包环境标识 true 正式
const processEnvType = false;
//测试
let ipconfig = 'http://server.neocab.cn';
let shareIp = 'http://dev-share.neocab.cn';
let sdkAppid = 1400476242;
let secretKey = '3d1dc9f13e2b0faf9b2d5e9ac485b153a2aa9513ecc0564c86a376364aea7e0b';

//发布版本号
export const version = '1.5.2.3'

if(processEnvType){
  //正式
   ipconfig = 'http://app-server.neocab.cn';
   shareIp = 'http://share.neocab.cn';
   sdkAppid = 1400481538;
   secretKey = '385b1c05040dfb8dd5d305d4f86f5aa0e037f58e189e9cea4ab706525b21e924';
}

//上传图片路径
export const action =ipconfig+ "/sys/upload/uploadImage";
//营业执照识别
export const actionJx =ipconfig+ "/user/image/BusinessImagedemo";
//驾照识别
export const actionJs = ipconfig+'/user/image/DriverCardLicense';
//司机邀请好友
export const shareUrl =shareIp+"?shareId=" 
//司机服务分享文章
export const shareArticleUrl = shareIp+"/driverServer/?id="
//分享详情
export const shareViewUrl = shareIp+"/pubilshDetails/?shareId="
//获取版本
export const updateUrl =ipconfig+"/app/getUrl?version=" 
//tim SDKAPPID，SECRETKEY
export const SDKAPPID = sdkAppid
export const SECRETKEY = secretKey
export const baseUrl = ipconfig;

export const publishObj = {
	//form 验证方式
	errorType:['message'],
	// navbar返回按钮样式
	backTextStyle:{'color':'#ffffff'},
	//navbar 标题的样式
	titleStyle:{'color':'#111111','fontSize':'32rpx','fontWeight':500},
	//开放城市
	cityList:[{id: '0',text: '杭州',checked:false}],
	//发布状态
	publiclist:[{id: '0',text: '不公开',checked:false},{id: '1',text: '公开',checked:false}],
	//业务类型
	onLineList:[{id: '1',text: '网约车',checked:false},{id: '2',text: '出租车',checked:false}],
	//车辆类型
	carType:[{id: '1',text: '轿车',checked:false},{id: '2',text: 'SUV',checked:false},{id: '3',text: 'MPV',checked:false},{id: '4',text: '其他',checked:false}],
	//动力类型
	power:[{id: '1',text: '纯电动',checked:false},{id: '2',text: '插电混动',checked:false},{id: '3',text: '燃油车',checked:false}],
	//日期
	params: {year: true,month: true,day: false,hour: false,minute: false,second: false},
	//租赁周期
	leasePeriod: [{id: '1',text: '1个月',checked:false},{id: '2',text: '3个月',checked:false}, {id: '3',text: '6个月',checked:false}, 
	              {id: '4',text: '12个月',checked:false}],
	//	车龄		  
	ageList:[{id: '1',text: '不限',checked:false },{id: '2',text:'1年内',checked:false },{id: '3',text:'1年-3年',checked:false },
	          {id: '4',text:'3年-5年',checked:false },{id: '5',text:'5年以上',checked:false }],
	//	租金	  
	rentList:[{id: '0',text:'3000以内（含3000）',checked:false },{id: '1',text:'3000以上',checked:false }],
	objType:{
		//网约车里程
		wycList:[{id: '',text:'不限',checked:false },{id: '0',text:'0-2万公里',checked:false },{id: '1',text:'2-5万公里',checked:false},
	            {id: '2',text:'5-10万公里',checked:false },{id: '3',text:'10-20万公里',checked:false },{id: '4',text:'20-30万公里',checked:false },
	            {id: '5',text:'30万公里以上',checked:false},],
		//出租车里程		
	    czcList:[{id: '',text:'不限',checked:false },{id: '0',text:'0-2万公里',checked:false },{id: '1',text:'2-5万公里',checked:false },
	             {id: '2',text:'5-10万公里',checked:false },{id: '3',text:'10-20万公里',checked:false },{id: '4',text:'20-30万公里',checked:false },
	             {id: '5',text:'30-50万公里',checked:false },{id: '6',text:'50-70万公里',checked:false },{id: '7',text:'70万公里以上',checked:false}],
		},
	//月薪
	salaryList:[{id: '0',text:'6000以内',checked:false },{id: '1',text:'6000-8000',checked:false },{id: '2',text:'8000-10000',checked:false },
	            {id: '3',text:'10000以上',checked:false }],
	//工作时长			
	hoursList:[{id: '0',text:'8小时',checked:false },{id: '1',text:'8-10小时',checked:false },{id: '2',text:'10小时以上',checked:false },
	           {id: '3',text:'不限',checked:false }],
	//福利要求		   
	benefitList:[{id:'0',text: '有3险',checked: false},{id:'1',text: '有5险',checked: false},{id:'2',text: '无责任底薪',checked: false},
			    {id:'3',text: '月休4天',checked: false}]
	
}