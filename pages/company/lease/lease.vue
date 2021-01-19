<template>
	<view class="wrap">
		<u-navbar back-icon-size="0" :title="title" back-text="返回" :background="backgroundCom" :back-text-style="publishObj.backTextStyle"
		 height='44' title-color="#FFFFFF">
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
				<view style="margin-top: 10pt;font-size: 10pt;padding-left: 5pt;color: #666666;">
					上传照片必须包含：1.车外观左右前方45度的照片；2.车外观正前正后方照片；3.车外观两侧照片；4.车外观两侧照片；5.车辆内部中控仪表盘照片；6.车辆内部前后排图
					片；7.车辆后备箱照片；8.该批次车辆集体照片 <text style="color: #FF9D00;padding-top: 5pt;font-size: 8pt;">*必须为jpg格式，最多18张</text>
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
				<view style="margin-top: 5pt;font-size: 10pt;padding-left: 5pt;color: #666666;">
					<view>请上传该批次车辆《行驶证》或《运输证》，建议每辆车上传一份！</view>
				</view>
			</view>
			<view class="view-content">
				<view class="label_title">业务类型</view>
				<SearchTags :list="publishObj.onLineList" :active="activeOnLine" :singleType="true" @onClick="onLineListChange"></SearchTags>
				<u-cell-group :border="false" class="cell_group">
					<u-cell-item :title="carPubType === 1?'出租车辆':'转卖车辆'" :value="selectCarInfo" :title-style="publishObj.titleStyle"
					 @click="showCar = true"></u-cell-item>
				</u-cell-group>
				<view class="label_title">车辆类型</view>
				<SearchTags :list="publishObj.carType" :active="activeCarType" :singleType="true" @onClick="carTypeListChange"></SearchTags>
				<view class="label_title">动力类型</view>
				<SearchTags :list="publishObj.power" :active="activePower" :singleType="true" @onClick="powerChange"></SearchTags>
				<u-form-item :label-style="publishObj.titleStyle" :label="carPubType === 1?'出租数量':'出售数量'" label-width="180rpx"
				 style="border-bottom: 1px solid #ccc;">
					<u-input v-model="form.carnbumber" :clearable="false" :border="false" maxlength="10" />
					<text class="middle-content-label" style="font-size: 32rpx;">辆</text></u-form-item>
				<view class="label_title">综合上牌时间</view>
				<u-row style="padding-top: 16rpx;">
					<u-col span="4">
						<u-input v-model="form.firsttime" :border="true" :disabled="true" @click="showTimePicker('firsttime')"
						 placeholder="" />
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
						<u-input v-model="form.firstkm" :border="true" placeholder="单位万公里" />
					</u-col>
					<u-col span="4" style="padding: 0 40rpx;">
						<view style="border-bottom: 1px solid #D9DEDF;"></view>
					</u-col>
					<u-col span="4">
						<u-input v-model="form.endkm" :border="true" placeholder="单位万公里" />
					</u-col>
					<u-col span="12" style="padding-top: 16rpx;">
						<view class="line">请填该批次车辆公里数最少和公里数最多的一辆</view>
					</u-col>
				</u-row>
				<view class="label_title">车况描述</view>
				<view style="padding-top: 16rpx;">
					<u-input type="textarea" v-model="form.cardescribe" :border="true" placeholder="" />
				</view>
				<view class="zlcontent" v-if="carPubType === 1">
					<view style="margin: 10pt 0;">
						<u-form-item label="押金">
							<u-input v-model="form.caryaprice" :clearable="false" class="input-radius" :border="true" placeholder="请输入" /><text
							 style="position: absolute;right: 10px;">元</text>
						</u-form-item>
					</view>
					<view class="zlcontent-mid price-list" v-for="(item,index) in form.rentCarPrice" :key='index'>
						<view style="font-size: 12pt;color: #000000;padding-bottom: 5pt;">
							<text>租金{{index+1}} </text>
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
					<view @click="addPriceObj" style="padding: 10pt 0;text-align: center;">
						<u-icon name="plus-circle-fill" color="#6DD99B" size="60"></u-icon>
						<view style="display: inline-block;vertical-align: middle;height: 30px;">添加价格</view>
					</view>
				</view>
				<view class="zlcontent" v-else>
					<view class="zlcontent-mid price-list" v-for="(item,index) in form.sellCarPrice" :key='index'>
						<view style="font-size: 12pt;color: #000000;padding-bottom: 10pt;">
							<text>价格{{index+1}} </text>
							<view style="display: inline-block;width: 80%;text-align: right;" v-show="index>0">
								<u-icon name="trash" color="#6DD99B" size="40" @click="delPriceList(index)"></u-icon>
							</view>
						</view>
						<view>
							<u-form :model="item" label-width="130">
								<u-form-item label="起售量">
									<u-input v-model="item.shoplow" type="number" :clearable="false" :border="true" placeholder="请输入" />
									<text style="padding: 0 10pt;">至</text>
									<u-input v-model="item.shophigh" type="number" :clearable="false" :border="true" placeholder="请输入" />
									<text style="padding-left: 15pt;">台</text>
								</u-form-item>
								<u-form-item label="价格">
									<u-input v-model="item.packprice" type="number" :clearable="false" :border="true" placeholder="请输入" />
									<text style="position: absolute;right: 10px;">元/台</text>
								</u-form-item>
							</u-form>
						</view>
					</view>
					<view @click="addPrice" style="padding: 10pt 0;text-align: center;">
						<u-icon name="plus-circle-fill" color="#6DD99B" size="60"></u-icon>
						<view style="display: inline-block;vertical-align: middle;height: 30px;">添加价格</view>
					</view>
				</view>
			</view>
			<u-picker v-model="timeShow" mode="time" :end-year="today.year" :params="publishObj.params" @confirm="dataChange"></u-picker>
			<view style="text-align: center; padding: 26pt 20pt;">
				<u-button type="success" shape='circle' class="btn-agree" @click="submitForm">提交审核</u-button>
			</view>
		</view>
		<u-popup v-model="showCar" mode="right" length="80%">
			<CarList :max='3' @onClick="carChange"></CarList>
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
				showCar: false,
				form: {
					isOneclickAndAdd: 2, //一键导入1  修改3  新增2
					carbrand: '', //品牌
					carmodel: '', //车系
					carxinghao: '', //型号
					cartype: '轿车', //车辆类型
					power: '纯电动', //动力
					onlineistaxi: 1, //业务类型
					firsttime: '', //上牌
					endtime: '',
					firstkm: '', //公里
					endkm: '',
					carnbumber: '', //出售数量
					cardescribe: '', //描述
					displacement: '',
					specification: '',
					trunk: '',
					wheel: '',
					variablebox: '',
					carseriesid: '',
					SystemTag: [],
					onephoto: [],
					oneneishiphoto: [],
					caryaprice: '',
					rentCarPrice: [{
						RentTime: '',
						Rentprice: ''
					}],
					sellCarPrice: [{
						shoplow: '',
						shophigh: '',
						packprice: ''
					}],
				},
				priceIndex: 0,
				timeShow: false,
				carPubType: 1,
				timeName: '',
				today: {},
				editId: '',
				title: '',
				selectCarInfo: '请选择车辆',
				list: publishObj.leasePeriod,
				show: false
			}
		},
		components: {
			Auth,
			SearchTags,
			CarList,
		},
		onLoad(option) {
			let editId = option.editId;
			if (editId) {
				this.editId = editId
			}
		},
		mounted() {
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
			editInit() {
				this.$u.api.ComparyRentCarEchoText({
					IsRentAndSell: this.carPubType,
					cartagid: this.editId
				}).then(res => {
					if (res.code === 200) {
						this.editSetStorage(res.object)
					} else {
						this.$u.toast(res.message);
					}
				})
			},
			editSetStorage(data) {
				this.form = data;
				this.form.isOneclickAndAdd = 3;
				this.form.id = data.tagid;
				this.form.comparyid = data.comparyinviteid;
				this.form.cartagistag = data.tagistagid;
				this.selectCarInfo = data.carbrand+data.carmodel+data.carxinghao || '';
				if(data.onlineistaxi){
					this.activeOnLine = Number(data.onlineistaxi)-1;
				}
				publishObj.carType.forEach((item,index)=>{
					if(item.text === data.cartype){
						this.activeCarType = index
					}
				})
				publishObj.power.forEach((item,index)=>{
					if(item.text === data.power){
						this.activePower = index
					}
				})
				data.onephoto.forEach(item=>{
					this.fileList.push({url:item})
				})
				data.oneneishiphoto.forEach(item=>{
					this.fileList1.push({url:item})
				})
				if (this.carPubType === 1) {
					let arr = [];
					data.rentAndSellPriceList.forEach(item => {
						arr.push({RentTime: item.rentCarTime,Rentprice: item.rentCarPrice})
					})
					if (arr.length > 0) {
						this.form.rentCarPrice = arr;
					}
				 } else {
					let sellCarPrice=[{shoplow: '',shophigh: '',packprice: ''}]
					let arr = [];
					data.rentAndSellPriceList.forEach(item => {
						arr.push({shoplow: item.sellCarLowPrice,shophigh: item.sellCarHighPrice,packprice: item.sellCarPackPrice})
					})
					if (arr.length > 0) {
						this.form.sellCarPrice = arr
				}
			   }
			   
			},
			uploadChange(data, index, lists, name) {
				this.form[name].push(data.object);
				this.$u.toast(data.msg);
			},
			removeOne(index, lists, name) {
				this.form[name].splice(index, 1);
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
				this.form.onlineistaxi = obj.index+1;
			},
			carTypeListChange(obj) {
				this.activeCarType = obj.index;
				this.form.cartype = obj.text;
			},
			powerChange(obj) {
				this.activePower = obj.index;
				this.form.power = obj.text

			},
			showTimePicker(name) {
				this.timeName = name;
				this.timeShow = true;
			},
			dataChange(obj) {
				let companyDate = obj.year + "-" + obj.month;
				this.form[this.timeName] = companyDate;
			},
			carChange(obj) {
				if (obj.type === 1) {
					this.selectCarInfo = obj.carbrand;
					this.form.carbrand = obj.carbrand;
					this.form.carmodel = '';
					this.form.carxinghao = '';
				} else if (obj.type === 2) {
					this.selectCarInfo = obj.carbrand + '/' + obj.carmodel;
					this.form.carbrand = obj.carbrand;
					this.form.carmodel = obj.carmodel;
					this.form.carxinghao = '';
				} else {
					this.selectCarInfo = obj.carbrand + '/' + obj.carmodel+obj.carxinghao;
					this.showCar = false;
					this.form = Object.assign(this.form, obj)
				}
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
				this.form.rentCarPrice.push({
					RentTime: '',
					Rentprice: ''
				})
			},
			addPrice() {
				this.form.sellCarPrice.push({
					shoplow: '',
					shophigh: '',
					packprice: ''
				})
			},
			delPriceList(index) {
				if (this.form.sellCarPrice.length === 1) {
					this.$u.toast('请至少填写一个价格')
					return
				}
				this.form.sellCarPrice.splice(index, 1)
			},
			submitForm() {
				let flag = this.verifyForm();
				if (!flag) {
					return false
				}
				let data = this.form;
				let obj = {
					cartype: data.cartype,
					power: data.power,
					firsttime: data.firsttime,
					firstkm: data.firstkm,
					endkm: data.endkm
				};
				this.$u.api.getSystemTag(obj).then(res => {
					if (res.code === 200) {
						this.form.SystemTag = res.systemTagVo;
						let obj = this.form;
						if (this.carPubType === 1) {
							obj.businesstype = 3;
							obj.mainbusinesstype = 1;
						} else {
							obj.businesstype = 1;
							obj.mainbusinesstype = 3;
						}
						this.$u.api.saveMainBusiness(obj).then(res => {
							if (res.code === 200) {
								uni.reLaunch({
									url: '/pages/company/myPublish/myPublish?index=0'
								});
							} else {
								this.$u.toast(res.msg);
							}
						})
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			verifyForm() {
				let type = this.carPubType;
				if (this.form.onephoto.length === 0 || this.form.oneneishiphoto.length === 0) {
					this.$u.toast('请上传图片');
					return false
				}
				if (this.form.carbrand === '') {
					this.$u.toast('请选择车辆品牌');
					return false
				}
				if (this.form.carnbumber === '') {
					let title = type === 1 ? '出租数量' : '出售数量'
					this.$u.toast('请填写' + title);
					return false
				}
				if (this.form.firsttime === '' || this.form.endtime === "") {
					this.$u.toast('请填写综合上牌时间');
					return false
				}
				if (this.form.firstkm === '' || this.form.endkm === "") {
					this.$u.toast('请填写综合行驶里程');
					return false
				}
				if (this.form.cardescribe === '') {
					this.$u.toast('请填写车辆况描述');
					return false
				}
				if (type === 1) {
					if (this.form.caryaprice === '') {
						this.$u.toast('请填写押金');
						return false
					}
					let obj = this.form.rentCarPrice[0];
					if (obj.RentTime === '' || obj.Rentprice === '') {
						this.$u.toast('请至少填写一个价格');
						return false
					}
					let priceList = this.form.rentCarPrice;
					let flag = true;
					priceList.forEach((item, index) => {
						if (item.RentTime === '' || item.Rentprice === '') {
							this.$u.toast('第' + (index + 1) + '条价数据为空或不完整,请删除后提交审核')
							flag = false
						}
					})
					if (!flag) {
						return false
					}
				} else {
					let obj = this.form.sellCarPrice[0];
					if (obj.shoplow === '' || obj.shophigh === '' || obj.packprice === '') {
						this.$u.toast('请填写完整');
						return
					}
					let priceList = this.form.sellCarPrice;
					let flag = true;
					priceList.forEach((item, index) => {
						if (item.shoplow === '' || item.shophigh === '' || item.packprice === '') {
							this.$u.toast('第' + (index + 1) + '条价格数据为空或不完整,请删除后提交审核')
							flag = false
						}
					})
					if (!flag) {
						return false
					}
				}
				return true
			}
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

	.cell_group {
		border-bottom: 1px solid #DEDEDE;

		/deep/ .u-cell {
			padding: 13px 0px
		}
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
