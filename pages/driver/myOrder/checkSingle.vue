<template>
	<view>
		<u-navbar back-icon-color="#111111" title="验车单(2/2)" :background="background" title-color="#111111"></u-navbar>
		<view>
			<view style="background: #F5F5F5;padding: 20rpx 30rpx 30rpx;">
				<view class="head_tips">
					提示：为保障您的合法权益，务必按要求上传车辆信息，车辆信息上传后将锁定到《汽车租赁合同》中。
				</view>
				<view class="title">车况详细登记</view>
			</view>
			<view class="collapse_content">
				<view class="header" @click="showOrHide('openFlag')">
					<view class="label">一、外观漆面和碰撞登记</view>
					<view ><u-icon :name="openFlag?'arrow-up':'arrow-down'" size="36" color="#111111"></u-icon></view>
				</view>
				<view class="content" v-show="openFlag">
					<view class="collapse_item" v-for="(item,index) in form.oneList">
						<view class="label">{{item.name}}</view>
						<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'oneList'" @onClick="ListChange"></CarTags>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadChange"  @on-remove="removeOne" :file-list="item.fileList"
						 class="upload" upload-text="" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
				</view>
			</view>
			<u-gap height="20" bg-color="#F5F5F5"></u-gap>
			<view class="collapse_content">
				<view class="header" @click="showOrHide('twoFlag')">
					<view class="label">二、常用功能登记 (如无该功能，留空)</view>
					<view ><u-icon :name="twoFlag?'arrow-up':'arrow-down'" size="36" color="#111111"></u-icon></view>
				</view>
				<view class="content" v-show="twoFlag">
					<view class="label">安全系统</view>
					<view class="collapse_item" v-for="(item,index) in form.safeList">
						<view class="line_tags">
							<view class="label">{{item.name}}</view>
							<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'safeList'" @onClick="ListChange"></CarTags>
						</view>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadSafeChange"  @on-remove="removeSafe" upload-text="" :file-list="item.fileList"
						 class="upload" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
					<view class="label borderT">外部配置</view>
					<view class="collapse_item" v-for="(item,index) in form.outsideList">
						<view :class="item.list.length<=2?'line_tags':''">
							<view class="label">{{item.name}}</view>
							<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'outsideList'" @onClick="ListChange"></CarTags>
						</view>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadOutsideChange" @on-remove="removeOutside" upload-text="" :file-list="item.fileList"
						 class="upload" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
					<view class="label borderT">内部配置</view>
					<view class="collapse_item" v-for="(item,index) in form.insideList">
						<view :class="item.list.length<=2?'line_tags':''">
							<view class="label">{{item.name}}</view>
							<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'insideList'" @onClick="ListChange"></CarTags>
						</view>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadInsideChange"  @on-remove="removeInside" upload-text="" :file-list="item.fileList"
						 class="upload" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
					<view class="label borderT">灯光系统</view>
					<view class="collapse_item" v-for="(item,index) in form.lightList">
						<view class="line_tags">
							<view class="label">{{item.name}}</view>
							<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'lightList'" @onClick="ListChange"></CarTags>
						</view>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadLightChange"  @on-remove="removeLight"  upload-text="" :file-list="item.fileList"
						 class="upload" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
				</view>
			</view>
			<u-gap height="20" bg-color="#F5F5F5"></u-gap>
			<view class="collapse_content">
				<view class="header" @click="showOrHide('threeFlag')">
					<view class="label">三、启动检测 (如无该功能，留空)</view>
					<view ><u-icon :name="threeFlag?'arrow-up':'arrow-down'" size="36" color="#111111"></u-icon></view>
				</view>
				<view class="content" v-show="threeFlag">
					<view class="label">仪表台故障灯</view>
					<view class="collapse_item" v-for="(item,index) in form.faultList">
						<view class="line_tags">
							<view class="label">{{item.name}}</view>
							<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'faultList'" @onClick="ListChange"></CarTags>
						</view>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadFaultChange"  @on-remove="removeFault"  upload-text="" :file-list="item.fileList"
						 class="upload" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
					<view class="label borderT">发动力状态</view>
					<view class="collapse_item" v-for="(item,index) in form.powerStatusList">
						<view class="line_tags">
							<view class="label">{{item.name}}</view>
							<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'powerStatusList'" @onClick="ListChange"></CarTags>
						</view>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadPowerChange"  @on-remove="removePower"  upload-text="" :file-list="item.fileList"
						 class="upload" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
					<view class="label borderT">变速箱及转向</view>
					<view class="collapse_item" v-for="(item,index) in form.speedList">
						<view class="line_tags">
							<view class="label">{{item.name}}</view>
							<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'speedList'" @onClick="ListChange"></CarTags>
						</view>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadSpeedChange"  @on-remove="removeSpeed"  upload-text="" :file-list="item.fileList"
						 class="upload" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
				</view>
			</view>
			<u-gap height="20" bg-color="#F5F5F5"></u-gap>
			<view class="collapse_content">
				<view class="header" @click="showOrHide('fourFlag')">
					<view class="label">四、随车工具</view>
					<view ><u-icon :name="fourFlag?'arrow-up':'arrow-down'" size="36" color="#111111"></u-icon></view>
				</view>
				<view class="content" v-show="fourFlag">
					<view class="collapse_item" v-for="(item,index) in form.toolList">
						<view class="line_tags">
							<view class="label">{{item.name}}</view>
							<CarTags :list="item.list" :forIndex="index" :active="item.value" :listName="'toolList'" @onClick="ListChange"></CarTags>
						</view>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadToolChange"  @on-remove="removeTool"  upload-text="" :file-list="item.fileList"
						 class="upload" v-show="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-image width="260rpx" height="92rpx" src="@/static/order/tianjiazhaopian2x.png"></u-image>
							</view>
						</u-upload>
					</view>
				</view>
			</view>
			<view class="bottom_content">
				<view class="btn orange" @click="saveSubmit">提交及锁定验车信息</view>
			</view>
		</view>
	</view>
</template>

<script>
	import CarTags from './btnTags.vue'
	import {
		checkCarObj,
		action
	} from '@/utils/constant.js'
	export default {
		components: {
			CarTags
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				action: action,
				form: {
					oneList: [{name: '1.前保险杠',value: 10,text: '',photo: [],fileList:[],fileList:[],flag: false,list: checkCarObj.bumperList},
					    {name: '2.发动机盖',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '3.右前翼子板',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '4.右侧前门',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '5.右A柱',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '6.右侧底大边',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '7.右侧顶边梁',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '8.右B柱',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '9.右侧后门',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '10.右C柱',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '11.右后翼子板',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '12.后备箱盖',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '13.后保险杠',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '14.左后翼子板',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '15.左侧后门',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '16.左C柱',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '17.左侧底大边',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '18.左侧顶边梁',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '19.左侧前门',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '20.左A柱',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '21.左前翼子板',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
						{name: '22.车顶',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.engineList},
					],
					
					safeList:[
						{name: '1.刹车制动',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '2.ABS防抱死',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.ABSList},
						{name: '3.安全气囊',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.ABSList},
						{name: '4.胎压监测',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.ABSList},
						{name: '5.中控锁(含门锁)',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.ABSList},
						{name: '6.遥控钥匙',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.ABSList},
					],
					outsideList:[
						{name: '1.刹车制动',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '2.前风挡玻璃',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.glassList},
						{name: '3.后风挡玻璃',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.glassList},
						{name: '4.天窗玻璃',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.skyList},
						{name: '5.车门玻璃',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.skyList},
						{name: '6.后视镜功能',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.skyList},
						{name: '7.车轮轮胎',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.tyreList},
						{name: '8.车轮轮毂',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.hubList},
						{name: '9.车门功能',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.carDoorList},
					],
					insideList:[
						{name: '1.刹车制动',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '2.多功能方向盘',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.steeringWheelList},
						{name: '3.内饰板',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.interiorPanelList},
						{name: '4.音响扬声器',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '5.中控/仪表',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '6.座椅及功能',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '7.多媒体功能',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '8.车载雷达',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '9.影像系统',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '10.空调状态',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
					],
					lightList:[
						{name: '1.大灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '2.尾灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '3.示宽灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '4.转向灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '5.刹车灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '6.雾灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '7.倒车灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '8.室内顶灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
					],
					faultList:[
						{name: '1.气囊故障灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
						{name: '2.制动系统指示灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
						{name: '3.安全系统指示灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
						{name: '4.发动机工况指示灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
						{name: '5.变速箱指示灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
						{name: '6.车身稳定系统故障灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
						{name: '7.机油压力指示灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
						{name: '8.着车时电瓶灯',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
						{name: '9.水温',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.faultLightList},
					],
					powerStatusList:[
						{name: '1.发动机异常抖动',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.shakeList},
						{name: '2.怠速状态',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.beginList},
						{name: '3.启动状态',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.beginList},
						{name: '4.尾气',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.beginList},
					],
					speedList:[
						{name: '1.变速箱',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '2.离合器',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '3.四驱系统功能',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '4.变速箱挂挡',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
						{name: '5.转向',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.brakingList},
					],
					toolList:[
						{name: '1.千斤顶',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.jackList},
						{name: '2.三角警示标',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.jackList},
						{name: '3.维修工具包',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.jackList},
						{name: '4.备胎',value: 10,text: '',photo: [],fileList:[],flag: false,list: checkCarObj.jackList},
					]
				},
				openFlag:true,
				twoFlag:false,
				threeFlag:false,
				fourFlag:false
			}
		},
		methods: {
			ListChange(obj) {
				/*
				* obj.index  当前操作list索引
				* obj.listName 当前操作的list
				* obj.text 选中中文值
				* obj.value 选中的索引
				*/
				let forIndex = obj.index;
				if (obj.value !== 0) {
					this.form[obj.listName][forIndex].flag = true
				} else {
					this.form[obj.listName][forIndex].flag = false
				}
				if (obj.value === this.form[obj.listName][forIndex].value) {
					this.form[obj.listName][forIndex].value = 100;
					this.form[obj.listName][forIndex].text = "";
					this.form[obj.listName][forIndex].flag = false
				} else {
					this.form[obj.listName][forIndex].value = obj.value;
					this.form[obj.listName][forIndex].text = obj.text;
				}
			},
			showOrHide(name){
				this[name] = !this[name];
			},
			saveSubmit() {
				let obj = {
					oneList: [],safeList:[],outsideList:[],insideList:[],lightList:[],faultList:[],powerStatusList:[],speedList:[],toolList:[],
				};
				let arr1 = this.form.oneList;
				let arr2 = this.form.safeList;
				let arr3 = this.form.outsideList;
				let arr4 = this.form.insideList;
				let arr5 = this.form.lightList;
				let arr6 = this.form.faultList;
				let arr7 = this.form.powerStatusList;
				let arr8 = this.form.speedList;
				let arr9 = this.form.toolList;
				let oneForm = uni.getStorageSync('orderFirst');
				
				arr1.forEach(item => {
					obj.oneList.push({name: item.name,text: item.text,photo: item.photo})
				})
				arr2.forEach(item => {
					obj.safeList.push({name: item.name,text: item.text,photo: item.photo})
				})
				arr3.forEach(item => {
					obj.outsideList.push({name: item.name,text: item.text,photo: item.photo})
				})
				arr4.forEach(item => {
					obj.insideList.push({name: item.name,text: item.text,photo: item.photo})
				})
				arr5.forEach(item => {
					obj.lightList.push({name: item.name,text: item.text,photo: item.photo})
				})
				arr6.forEach(item => {
					obj.faultList.push({name: item.name,text: item.text,photo: item.photo})
				})
				arr7.forEach(item => {
					obj.powerStatusList.push({name: item.name,text: item.text,photo: item.photo})
				})
				arr8.forEach(item => {
					obj.speedList.push({name: item.name,text: item.text,photo: item.photo})
				})
				arr9.forEach(item => {
					obj.toolList.push({name: item.name,text: item.text,photo: item.photo})
				})
				let data = Object.assign(obj,oneForm)
				this.$u.api.checkCarSave({orderId:data.orderId,carInfo:JSON.stringify(obj)}).then(res=>{
					if (res.code === 200) {
						uni.removeStorageSync('orderFirst');
						this.toView(data.orderId)
					} else {
						 this.$u.toast(res.msg);
					}
				})
			},
			toView(id) {
				uni.redirectTo({
				    url: '/pages/driver/myOrder/orderView?id='+id
				});
				// this.$u.route('/pages/driver/myOrder/orderView', {
				// 	id: id
				// })
			},
			// 图片
			uploadChange(data, index, lists, name) {
				this.form.oneList[name].photo.push(data.object);
			},
			removeOne(index, lists, name) {
				this.form.oneList[name].photo.splice(index, 1);
			},
			uploadSafeChange(data, index, lists, name) {
				this.form.safeList[name].photo.push(data.object);
			},
			removeSafe(index, lists, name) {
				this.form.safeList[name].photo.splice(index, 1);
			},
			uploadOutsideChange(data, index, lists, name) {
				this.form.outsideList[name].photo.push(data.object);
			},
			removeOutside(index, lists, name) {
				this.form.outsideList[name].photo.splice(index, 1);
			},
			uploadInsideChange(data, index, lists, name) {
				this.form.insideList[name].photo.push(data.object);
			},
			removeInside(index, lists, name) {
				this.form.insideList[name].photo.splice(index, 1);
			},
			uploadLightChange(data, index, lists, name) {
				this.form.lightList[name].photo.push(data.object);
			},
			removeLight(index, lists, name) {
				this.form.lightList[name].photo.splice(index, 1);
			},
			uploadFaultChange(data, index, lists, name) {
				this.form.faultList[name].photo.push(data.object);
			},
			removeFault(index, lists, name) {
				this.form.faultList[name].photo.splice(index, 1);
			},
			uploadPowerChange(data, index, lists, name) {
				this.form.powerStatusList[name].photo.push(data.object);
			},
			removePower(index, lists, name) {
				this.form.powerStatusList[name].photo.splice(index, 1);
			},
			uploadSpeedChange(data, index, lists, name) {
				this.form.speedList[name].photo.push(data.object);
			},
			removeSpeed(index, lists, name) {
				this.form.speedList[name].photo.splice(index, 1);
			},
			uploadToolChange(data, index, lists, name) {
				this.form.toolList[name].photo.push(data.object);
			},
			removeTool(index, lists, name) {
				this.form.toolList[name].photo.splice(index, 1);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.head_tips {
		padding: 16rpx 30rpx;
		background: #FFFFFF;
		color: #666666;
		font-size: 26rpx;
		box-shadow: 0px 0px 0px 0px #DEDEDE;
		border-radius: 12rpx;
	}

	.title {
		color: #111111;
		font-size: 36rpx;
		font-weight: 700;
		padding: 20rpx 0 0;
	}
	.collapse_content{
		padding: 28rpx 24rpx;
		.header{
			display: flex;justify-content: space-between;
			.label{
				color: #111111;
				font-size: 32rpx;
				font-weight: 700;
			}
		}
		.content{
			.label{
				padding-top: 20rpx;
				color: #111111;
				font-size: 28rpx;
				font-weight: 700;
				
			}
		}
	}
	.upload {
		width: 100%;
		justify-content: center;
		align-items: center;
		padding-top: 20rpx;
		min-height: 180rpx;
	}
	.line_tags{
		display: flex;
		align-items: baseline;
		justify-content: space-between;
	}
	.borderT{
		margin-top: 40rpx;
		font-size: 30rpx;
		border-top: 1px solid #DEDEDE;
	}
	.bottom_content{
		border-top: 1px solid #DEDEDE;
		margin-top: 16rpx;
		padding: 40rpx 60rpx;
		.btn{
			padding: 24rpx 28rpx;
			font-size: 32rpx;
			border-radius: 8rpx;
			text-align: center;
		}
		.orange{
			background: linear-gradient(270deg, #FFC600 0%, #FFA900 47%, #FF9100 100%);
			color: #FFFFFF;
		}
	}
</style>
