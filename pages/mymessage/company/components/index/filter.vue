<template>
	<view class="filter">
	  <u-navbar back-text="返回" back-icon-size="0" title="更多筛选" 
	   :back-text-style="backTextStyle" height='44' title-color="#111"></u-navbar>
	   <view class="view-content">
		   <view class="name">{{addkey}}</view>
		   <view style="width: 100%;height: 20rpx;background: #f5f5f5;"></view>
		   <view style="position: absolute;top: 400rpx;left: 0;z-index: 100;width: 100%;">
			   <view v-for="(item, index) in list" :key="index" style="display: flex;justify-content: space-between;align-items: center;padding: 24rpx 34rpx;background: #fff;
			   border-bottom: 2rpx solid rgba(0,0,0,0.03);">
			   			   <view style="font-size: 32rpx;color: #333;">{{item.brandname}}</view>
			   			   <view style="width: 48rpx;height: 48rpx;border-radius: 50%;background: #4aba75;line-height: 48rpx;
			   			   text-align: center;font-size: 26rpx;color: #fff;font-weight: 900;" @click="get(item.brandname)">十</view>
			   </view>
		   </view>
	   	  <u-form style="position: relative;" :model="form" ref="uForm" label-width="280" :border-bottom="false">
			  <u-form-item label="品牌选择" label-position="top">
				  <u-row style="border-bottom: 2rpx solid rgba(0,0,0,0.06);padding-bottom: 10rpx;width: 680rpx;">
				  	<u-col span="8"><u-input @input="keyup" v-model="value" maxlength="30" :border="false" placeholder="请选择品牌型号"/></u-col>
				  </u-row>
			  	<!-- <u-checkbox-group active-color="#6DD99C" @change="brandGroupChange" shape="circle">
			  		<u-checkbox v-model="item.checked"  v-for="(item, index) in brandList" :key="index" :name="item.name">
			  			{{ item.name }}
			  		</u-checkbox>
			  	</u-checkbox-group> -->
			  </u-form-item>
	   	  	<u-form-item label="业务类型" label-position="top">
				<search-tags :list="publishObj.onLineList" :active="currentType" :singleType="true" @onClick="getDataType"></search-tags>
				<!-- <u-radio-group v-model="form.businessType" @change="radioGroupChange" :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">不限 </u-radio>
					<u-radio name="1" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="2" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group> -->
				<!-- <text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text> -->
	   	  	</u-form-item>
			<u-form-item label="车辆类型(多选)" label-position="top">
				<search-tags :list="publishObj.carType" :active="currentCar" :singleType="false" @onClick="getDataCar"></search-tags>
				<!-- <u-checkbox-group active-color="#6DD99C" @change="modelGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in modelList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group> -->
			</u-form-item>
			<u-form-item label="动力(多选)" label-position="top">
				<search-tags :list="publishObj.power" :active="currentPower" :singleType="false" @onClick="getDataPower"></search-tags>
				<!-- <u-checkbox-group active-color="#6DD99C" @change="powerGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in powerList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group> -->
			</u-form-item>
		  </u-form>
	   </view>
		<view class="bottom">
			<view class="reset">
				<u-icon name="reload" color="#5D6671" size="28"></u-icon>
				<view class="btn" @click="reset()">重置</view>
			</view>
			<view class="total" @click="result()">查看{{total}}条车源></view>
		</view>
	</view>
</template>

<script>
	import searchTags from '@/components/searchTags.vue'
	import {
		publishObj
	} from '@/utils/constant.js'
	export default {
		components: {
			searchTags
		},
		data() {
			return {
				backTextStyle:{
					'color':'#333'
				},
				publishObj: publishObj,
				form:{
					businessType:0,
					carbrand:'',
					cartype:'',
					km: 100,
					power:'',
					packprice:'',
					startCarAge:'',
					endCarAge:''
				},
				carage: '',
				value:'',
				total: '',
				brandList:[{name: '比亚迪',checked: false},{name: '北汽新能源',checked: false},{name: '丰田',checked: false},
						{name: '日产',checked: false},{name: '大众',checked: false},{name: '吉利',checked: false}],
				addkey: '',
				businessTypekey: '不限',
				carbrandkey: '',
				cartypekey: '',
				powerkey: '',
				packpricekey: {
					text:''
				},
				caragekey: '',
				kmkey: {
					text:''
				},
				currentType:-1,
				currentCar:-1,
				currentPower:-1,
				arrCar:[],
				arrPower:[],
				cartype:[],
				power:[],
				businessType: '',
				list:[]
			}
		},
		// computed:{
		// 	...mapGetters(['telephone'])
		// },
		// mounted() {
		// 	this.form.userid = this.telephone;
		// },
		mounted() {
			this.transform()
		},
		methods: {
			keyup() {
				if(this.value != ''){
					this.$u.api.brandList({initialOrBrandName: this.value}).then(res=>{
						if(res.code === 200){
							this.list = res.object; 
						}else {
							 this.$u.toast(res.msg);
						}
					})
				}
			},
			get(text) {
				this.addkey = this.addkey==''?text:(this.addkey+','+text);
				this.list=[];
				this.value='';
			},
			transform() {
				const businessType = uni.getStorageSync('businessType');
				this.businessType = uni.getStorageSync('businessType');
				if(uni.getStorageSync('cartype')){
					var cartype = uni.getStorageSync('cartype').split(',');
				}
				if(uni.getStorageSync('power')){
					var power = uni.getStorageSync('power').split(',');
				}
				if(businessType){
					this.addkey = this.addkey==''?businessType:(this.addkey+','+businessType);
					this.publishObj.onLineList.forEach(item=>{
					   if(item.text == businessType){
						this.currentType = parseInt(item.id)-1
						this.form.businessType = parseInt(item.id)
					   }
					}) 
				}
				if(cartype.length){
					this.form.cartype = cartype.join(',');
					this.addkey = this.addkey==''?this.form.cartype:(this.addkey+','+this.form.cartype);
					cartype.map(item=>{
					   this.publishObj.carType.forEach(items=>{
					      if(items.text == item){
					   	    items.checked = true;
							this.arrCar.push(items)
					      }
					   })
					})
				}
				if(power.length){
					this.form.power = power.join(',');
					this.addkey = this.addkey==''?this.form.power:(this.addkey+','+this.form.power);
					power.map(item=>{
					   this.publishObj.power.forEach(items=>{
					      if(items.text == item){
					   	    items.checked = true;
							this.arrPower.push(items)
					      }
					   })
					})
				}
				this.select()
			},
			getDataType(obj) {
				this.currentType = obj.index;
				this.form.businessType = obj.index + 1;
				this.businessType =  obj.text;
				this.select()
				this.add()
			},
			getDataCar(item) {
				this.arrCar.push(item);
				this.cartype = [];
				this.arrCar.map(item=>{
				   if(item.checked == true){
				   	this.cartype.push(item.text);
				   }
				})
				let cartype = new Set(this.cartype);
				this.cartype = Array.from(cartype);
				this.form.cartype = this.cartype.join(',');
				this.select()
				this.add()
			},
			getDataPower(item) {
				this.arrPower.push(item);
				this.power = [];
				this.arrPower.map(item=>{
				   if(item.checked == true){
				   	this.power.push(item.text);
				   }
				})
				let power = new Set(this.power);
				this.power = Array.from(power);
				this.form.power = this.power.join(',');
				this.select()
				this.add()
			},
			add() {
				this.addkey = this.businessType +(this.form.cartype?',':'') + this.form.cartype
				+ (this.form.power?',':'') + this.form.power
			},
			reset() {
				this.currentType = -1;
				console.log(this.publishObj.onLineList)
				this.publishObj.carType.map( item => {
				  item.checked=false;
				});
				this.publishObj.power.map( item => {
				  item.checked=false;
				});
				this.carage='';
				this.addkey = '不限';
				this.businessTypekey='不限';
				this.carbrandkey='';
				this.cartypekey='';
				this.powerkey='';
				this.packpricekey={
					text:''
				};
				this.caragekey='';
				this.kmkey={
					text:''
				};
				this.select()
			},
			brandGroupChange(e) {
				this.form.carbrand = e.join(',');
				this.carbrandkey = e.join('+');
				this.add()
				this.select()
			},
			powerGroupChange(e) {
				this.form.power = e.join(',');
				console.log(this.form.power)
				this.powerkey = e.join('+');
				this.add()
				this.select()
			},
			modelGroupChange(e) {
				this.form.cartype = e.join(',');
				this.cartypekey = e.join('+');
				this.add()
				this.select()
			},
			radioGroupChange(e){
				this.radioType = e=== '1'?'wycList':'czcList' 
				if(e==='0'){
					this.businessTypekey = '不限'
				}
				if(e==='1'){
					this.businessTypekey = '网约车'
				}
				if(e==='2'){
					this.businessTypekey = '出租车'
				}
				this.add()
				this.select()
			},
			radioGroupChangePrice(e){
				this.packpricekey =  this.priceList.find( item => {
				   if(item.name === e) {
					   return item
				   }
				});
				this.add()
				this.select()
			},
			radioGroupChangeAge(e){
				if(this.carage == '0') {
					this.form.startCarAge = '0';
                    this.form.endCarAge = '1';
					this.caragekey = '1年内';
				}
				if(this.carage == '1') {
					this.form.startCarAge = '1';
				    this.form.endCarAge = '3';
					this.caragekey = '1年-3年';
				}
				if(this.carage == '2') {
					this.form.startCarAge = '3';
				    this.form.endCarAge = '5';
					this.caragekey = '3年-5年';
				}
				if(this.carage == '3') {
					this.form.startCarAge = '5';
				    this.form.endCarAge = '';
					this.caragekey = '5年以上';
				}
				if(this.carage == '4') {
					this.form.startCarAge = '';
				    this.form.endCarAge = '';
					this.caragekey = '不限';
				}
				this.add()
				this.select()
			},
			radioGroupChangeKm(e){
				this.kmkey =  this.objType[this.radioType].find( item => {
				   if(item.name === e) {
					   return item
				   }
				});
				this.add()
				this.select()
			},
			addBrand(){
				if (this.value){
					this.brandList.push({name:this.value,checked:false})
					this.value = ''
				}
			},
			select(){
				// if (this.form.mainBusiness === ''){
				// 	this.$u.toast('请选择业务类型');
				// 	return
				// }
				const params = Object.assign(this.form, {
					pageNum: 1,
					pageSize: 10,
					isCount: 1
				});
				this.$u.api.sellCar(params).then(res=>{
					if(res.code === 200){
						this.total = res.total;
					}else {
						 this.$u.toast(res.message);
					}
				})
			},
			history() {
				this.$u.route('/pages/mymessage/company/components/index/history');
			},
			result() {
				if(this.form.cartype){
					uni.setStorageSync('cartype', this.form.cartype);
				}
				if(this.form.power){
					uni.setStorageSync('power', this.form.power);
				}
				if(this.form.businessType){
					uni.setStorageSync('businessType', this.businessType);
				}
				this.$u.route({url:'/pages/mymessage/mymessage',type:'switchTab'});
			}
		}
	}
</script>

<style lang="scss">
.scroll-container {height: 100%;}
page{
	// background-color:#f5f5f5;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}

.view-content{
	width: 100%;
	border-top: 2rpx solid rgba(0,0,0,0.06);
	// background: #fff;
	.name {
		padding: 34rpx;
		// height: 148rpx;
		font-size: 28rpx;
	}
}
.u-form-item{
	margin-left: 34rpx;
}
 .btn-agree{
	width: 170rpx;
	height: 76rpx;
	line-height: 76rpx;
	text-align: center;
	background: #4ABA75;
	border-radius: 38rpx;
	font-size: 28rpx;
 }
 .filter {
	 .u-slot-content {
		 width: 100rpx;
		 color: #fff;
		 float: right;
	 }
	 .bottom{
		 width: 100%;
		 height: 140rpx;
		 background: #FFFFFF;
		 box-shadow: 0rpx 2rpx 0rpx 0rpx #DEDEDE;
		 border-top: 2rpx solid rgba(0,0,0,0.06);
		 padding: 0 34rpx;
		 position: fixed;
		 bottom: 0;
		 left: 0;
		 display: flex;
		 justify-content: space-between;
		 align-items: center;
		 .reset{
			display: flex;
			justify-content: center;
			align-items: center; 
			width: 232rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background: #FFF;
			border-radius: 8rpx;
			border: 2rpx solid #D9DEDF;
		 }
	 }
	 .bottom .btn {
		 color: #252825;
		 margin-left: 20rpx;
	 }
	 .total {
		 width: 428rpx;
		 height: 88rpx;
		 line-height: 88rpx;
		 text-align: center;
		 background: linear-gradient(270deg, #63D094 0%, #53C27F 58%, #3CAE69 100%);
		 border-radius: 4px;
		 color: #fff;
	 }
 }
</style>
