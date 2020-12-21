<template>
	<view class="wrap">
		<u-navbar back-icon-size="0" :title="title" :background="backgroundCom" :back-text-style="publishObj.backTextStyle"
		 height='44' title-color="#FFFFFF">
			<view class="navbar-right">
				<view class="message-box right-item">
					<text @click="toCenter">返回</text>
				</view>
			</view>
		</u-navbar>
		<view class="zlcontent">
			<view class="view-content">
				<view style="padding-bottom: 10pt;">1.车辆照片上传</view>
				<view class="top-content-upload">
					<u-upload :custom-btn="true" :action="action" max-count="18" ref="upload" @on-success='uploadChange' index="onephoto"
					 upload-text="" @on-remove="removeOne" :file-list="fileList" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
						</view>
					</u-upload>
				</view>
				<view style="margin-top: 10pt;font-size: 10pt;padding-left: 5pt;">
					<view>上传图片必须包含：</view>
					<view>1、车外观左右前方45°照片；</view>
					<view>2、车外观正前正后方照片;</view>
					<view>3、车外观两侧照片；</view>
					<view>4、车外观右后方或左后方45°照片；</view>
					<view>5、车辆内部中控仪表盘照片；</view>
					<view>6、车辆内部前后排图片；</view>
					<view>7、车辆后备箱照片；</view>
					<view>8、该批次车辆集体照片；</view>
					<view style="color: #f00;padding-top: 5pt;font-size: 8pt;">*必须为jpg格式，最多18张</view>
				</view>
			</view>
			<view class="view-content">
				<view style="padding-bottom: 10pt;">2.车辆证件上传</view>
				<view class="top-content-upload">
					<u-upload :custom-btn="true" :action="action" max-count="100" ref='upload1' @on-success='uploadChange' index="oneneishiphoto"
					 upload-text="" @on-remove="removeOne" :file-list="fileList1" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;">
						<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
							<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
						</view>
					</u-upload>
				</view>
				<view style="margin-top: 5pt;font-size: 10pt;padding-left: 5pt;">
					<view>请上传该批次车辆《行驶证》或《运输证》，建议每辆车上传一份！</view>
				</view>
			</view>
			<view class="view-content" style="color: #f00;font-size: 8pt;">*上传的车辆证件须与认证主体名称一致，否则可能会造成审核失败。</view>
			<view class="view-content">
				<view class="label_title">业务类型</view>
				<SearchTags :list="publishObj.onLineList" :active="activeOnLine" :singleType="true" @onClick="onLineListChange"></SearchTags>
				<u-cell-group :border="false" style="border-bottom: 1px solid #DEDEDE;">
					<u-cell-item title="转卖车辆" value="请选择品牌型号" :title-style="publishObj.titleStyle" @click="showCar = true"></u-cell-item>
				</u-cell-group>
				<view class="label_title">车辆类型</view>
				<SearchTags :list="publishObj.carType" :active="activeCarType" :singleType="true" @onClick="carTypeListChange"></SearchTags>
				<view class="label_title">动力类型</view>
				<SearchTags :list="publishObj.power" :active="activePower" :singleType="true" @onClick="powerChange"></SearchTags>
				<u-form-item :label="carPubType === 1?'出租数量':'出售数量'" label-width="180rpx" style="border-bottom: 1px solid #ccc;">
					<u-input v-model="form.carnbumber" :clearable="false" :border="false" maxlength="10" />
					<text class="middle-content-label">辆</text></u-form-item>
				<view class="label_title">综合上牌时间</view>
				<u-row style="padding-top: 16rpx;">
					<u-col span="4">
						<u-input v-model="form.firsttime" :border="true" :disabled="true" @click="showTimePicker('firsttime')" placeholder="" />
					</u-col>
					<u-col span="4" style="padding: 0 40rpx;">
						<view style="border-bottom: 1px solid #D9DEDF;"></view>
					</u-col>
					<u-col span="4">
						<u-input v-model="form.endtime" :border="true" :disabled="true" @click="showTimePicker('endtime')" placeholder="" />
					</u-col>
					<u-col span="12" style="padding-top: 16rpx;">
						<view class="line">该批次车辆上牌时间跨度</view>
					</u-col>
				</u-row>
				<view class="label_title">综合行驶里程</view>
				<u-row style="padding-top: 16rpx;">
					<u-col span="4">
						<u-input v-model="form.firstkm" :border="true" placeholder="" />
					</u-col>
					<u-col span="4" style="padding: 0 40rpx;">
						<view style="border-bottom: 1px solid #D9DEDF;"></view>
					</u-col>
					<u-col span="4">
						<u-input v-model="form.endkm" :border="true" placeholder="" />
					</u-col>
					<u-col span="12" style="padding-top: 16rpx;">
						<view class="line">请填该批次车辆公里数最少和公里数最多的一辆</view>
					</u-col>
				</u-row>
				<view class="label_title">车辆况描述</view>
				<view>
					<u-input type="textarea" v-model="form.cardescribe" :border="true" placeholder="" />
				</view>
				<view class="zlcontent" v-if="carPubType === 1">
					<view  style="margin: 10pt 0;">
						<u-form-item label="押金">
							<u-input v-model="form.yamoney" :clearable="false" class="input-radius" :border="true" placeholder="请输入" /><text
							 style="position: absolute;right: 10px;">元</text>
						</u-form-item>
					</view>
					<view class="zlcontent-mid price-list" v-for="(item,index) in form.rentCarPrice" :key='index'>
						<view style="font-size: 12pt;color: #000000;padding-bottom: 5pt;">
							<text>{{index+1}} </text>
							<view style="display: inline-block;width: 80%;text-align: right;" v-show="index >0">
								<u-icon name="trash" color="#6DD99B" size="40" @click="delList(index)"></u-icon>
							</view>
						</view>
						<view>
							<u-form :model="item" label-width="150">
								<u-form-item label="租赁周期">
									<u-input v-model="item.RentTime" class="input-radius" type="select" :border="true" placeholder="请选择租赁周期"
									 @click="showDialog(index)" />
								</u-form-item>
								<u-form-item label="租金">
									<u-input v-model="item.Rentprice" type="number" :clearable="false" :border="true" placeholder="请输入" /><text
									 style="position: absolute;right: 10px;">元/月</text>
								</u-form-item>
							</u-form>
						</view>
					</view>
					<u-action-sheet :list="list" v-model="show" @click="actionSheetCallback"></u-action-sheet>
					<view @click="addPriceObj" style="padding: 10pt 0;">
						<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon><text style="vertical-align: top;">添加价格</text>
					</view>
				</view>
				<view class="zlcontent" v-else>
				   <view class="zlcontent-mid price-list" v-for="(item,index) in form.sellCarPrice" :key='index'>
					  <view style="font-size: 12pt;color: #000000;padding-bottom: 10pt;">
						   <text>价格{{index+1}} </text>
						   <view style="display: inline-block;width: 80%;text-align: right;" v-show="index>0">
								<u-icon name="trash" color="#6DD99B" size="40" @click="delList(index)"></u-icon>
						   </view>
					    </view>
					   <view>
						<u-form :model="item" label-width="130">
						 <u-form-item label="起售量">
							  <u-input v-model="item.shoplow" type="number" :clearable="false" :border="true" placeholder="请输入"/>
							  <text style="padding: 0 10pt;">至</text>
							  <u-input v-model="item.shophigh" type="number" :clearable="false" :border="true" placeholder="请输入"/>
							  <text style="padding-left: 15pt;">台</text>
						 </u-form-item>
						 <u-form-item label="价格">
						 	 <u-input v-model="item.packprice" type="number" :clearable="false" :border="true" placeholder="请输入"/>
							 <text style="position: absolute;right: 10px;">元/台</text>
						 </u-form-item>
						</u-form>	
					   </view>
				   </view>
				   <view @click="addPriceObj" style="padding: 10pt 0;">
				   	<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon><text style="vertical-align: top;">添加价格</text>
				   </view>
				</view>
			</view>
			<u-picker v-model="timeShow" mode="time" :end-year="today.year" :params="publishObj.params" @confirm="dataChange"></u-picker>
			<view style="text-align: center; padding: 26pt 20pt;">
				<u-button type="success" shape='circle' class="btn-agree" @click="toNext">提交审核</u-button>
			</view>
		</view>
		<u-popup v-model="showCar" mode="right" length="80%">
			<CarList></CarList>
		</u-popup>
		<Auth></Auth>
	</view>
</template>

<script>
	import {
		requiredRule,
		businessTypeRule
	} from '@/common/rule.js'
	import Auth from '@/components/auth.vue'
	import SearchTags from '@/components/searchTags.vue'
	import CarList from '@/components/carpoper.vue'
	import {
		action,
		publishObj
	} from '@/utils/constant.js'
	export default {
		data() {
			return {
				action: action,
				fileList: [],
				fileList1: [],
				publishObj: publishObj,
				activeOnLine: 0,
				activeCarType: 0,
				activePower: 0,
				showCar:false,
				form: {
					isOneclickAndAdd: 2, //一键导入1  修改3  新增2
					carbrand: '',//品牌
					carmodel: '',//车系
					carxinghao: '',//型号
					cartype: '',//车辆类型
					power: '',//动力
					onlineistaxi: '',//业务类型
					firsttime: '',//上牌
					endtime:'',
					firstkm: '',//公里
					endkm: '',
					carnbumber: '',//出售数量
					cardescribe:'',//描述
					displacement: '',
					specification: '',
					trunk: '',
					wheel: '',
					variablebox: '',
					carseriesid: '',
					SystemTag: [],
					onephoto: [],
					oneneishiphoto: [],
					yamoney: '',
					rentCarPrice: [{
						RentTime: '',
						Rentprice: ''
					}],
					sellCarPrice:[{
							shoplow:'',shophigh:'',packprice:''
						}
					],
				},
				priceIndex: 0,
				timeShow: false,
				carPubType: 1,
				timeName:'',
				today: {},
				editId: '',
				title: ''
			}
		},
		components: {
			Auth,
			SearchTags,
			CarList,
		},
		onLoad(option) {
			let index = option.id;
			let editId = option.editId;
			this.editId = editId
		},
		onShow() {
			this.initStorage()
			if (this.editId) {
				this.editInit()
			}
			let today = uni.getStorageSync('today');
			if (today) {
				this.today = today
			}
		},
		methods: {
			uploadChange(data, index, lists, name) {
				this.form[name].push(data.object);
				this.$u.toast(data.msg);
			},
			removeOne(index, lists, name) {
				this.form[name].splice(index, 1);
				console.log(this.form[name])
			},
			initStorage() {
				this.today = uni.getStorageSync('today');
				this.carPubType = uni.getStorageSync('carPubType');
				if (this.carPubType === 1) {
					this.title = '租赁发布'
				} else {
					this.title = '转卖发布'
				}
			},
			onLineListChange(obj) {
				this.activeOnLine = obj.index;
				this.form.onlineistaxi =obj.text;
			},
			carTypeListChange(obj) {
				this.activeCarType = obj.index;
				this.form.cartype = obj.text;
			},
			powerChange(obj) {
				this.activePower = obj.index;
				this.form.power = obj.text

			},
			showTimePicker(name){
				this.timeName = name;
				this.timeShow = true;
			},
			dataChange(obj){
				if(obj.year == this.today.year){
					if (obj.month > this.today.month || obj.day > this.today.day){
						return false
					}
				}
				let companyDate = obj.year+"-"+obj.month;
				this.form[this.timeName] = companyDate;
			},
			delList(index) {
				if (this.form.rentCarPrice.length === 1) {
					this.$u.toast('请至少填写一个价格')
					return
				}
				this.form.rentCarPrice.splice(index, 1)
			},
			actionSheetCallback(index) {
				let value = this.list[index].text;
				this.form.rentCarPrice[this.priceIndex].RentTime = value
			},
			showDialog(index) {
				this.priceIndex = index;
				this.show = true;
			},
			addPriceObj() {
				console.log(this.form.rentCarPrice)
				this.form.rentCarPrice.push({
					RentTime: '',
					Rentprice: ''
				})
			},
			addPriceObj(){
					this.form.sellCarPrice.push({
							shoplow:'',shophigh:'',packprice:''
						}) 
			},
			delList(index){
					  if(this.form.sellCarPrice.length ===1){
						  this.$u.toast('请至少填写一个价格')
						  return
					  }
					 this.form.sellCarPrice.splice(index,1)
			},

		}
	}
</script>
<style lang="scss">
	.scroll-container {
		height: 100%;
	}

	.view-content {
		margin-top: 20pt;
		padding: 0 10pt;
	}

	.top-content-upload {
		border: 1px dotted #dedede;
		width: 100%;
		background: #FFFFFF;
		position: relative;
	}

	.slot-btn {
		width: 230rpx;
		height: 100pt;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-radius: 10rpx;
	}

	.slot-btn__hover {
		background-color: rgb(235, 236, 238);
	}

	.zlcontent-mid {
	    padding: 5pt 10pt 0;
	    margin-top: 10pt;
	    border: 1px solid #ccc;
	}

	/deep/ .u-border-bottom:after {
		border-bottom-width: 0;
	}

	.label_title {
		padding-top: 20rpx;
		color: #111111;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}

	.input_select {
		background: #FFFFFF;
		border-radius: 40rpx;
	}

	.u-card-wrap {
		background-color: #000000;
		padding: 1px;
	}

	.card-img {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		// border-radius: 8rpx;
		// margin-left: 12rpx;
		// padding-right:15pt;
	}

	.card-title {
		font-size: 12pt;
		color: #333;
		padding-left: 5pt;
		position: relative;

		.iconAbs {
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}

	.tag-style {
		margin: 8pt 8pt 0 0;
	}

	.fixed-btn {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 98;
	}

	.btn-agree {
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
	}

	.navbar-right {
		display: flex;
	}

	.right-item {
		position: relative;
		color: #ffffff;
		display: flex;
	}
</style>
