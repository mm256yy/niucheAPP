<template>
	<view class="filter">
	  <u-navbar back-text="返回" back-icon-size="0" title="更多筛选" :background="backgroundDri" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"><!-- <view @click="history()" style="color: #fff;margin-right: 20rpx;font-size: 30rpx;" slot="right">
		   历史</view> --></u-navbar>
	   <view class="view-content">
	   		   <view class="name">{{addkey}}</view>
	   		   <view style="width: 100%;height: 20rpx;background: #f5f5f5;"></view>
	   		   <view style="position: absolute;top: 462rpx;left: 0;z-index: 100;width: 100%;">
	   			   <view v-for="(item, index) in list" :key="index" style="display: flex;justify-content: space-between;align-items: center;padding: 24rpx 34rpx;background: #fff;
	   			   border-bottom: 2rpx solid rgba(0,0,0,0.03);">
	   			   			   <view style="font-size: 32rpx;color: #333;">{{item.brandname}}</view>
	   			   			   <view style="width: 48rpx;height: 48rpx;border-radius: 50%;background: #4aba75;line-height: 48rpx;
	   			   			   text-align: center;font-size: 26rpx;color: #fff;font-weight: 900;" @click="get(item.brandname)">十</view>
	   			   </view>
	   		   </view>
	   	  <u-form style="position: relative;margin-left: 28rpx;" :model="form" ref="uForm" label-width="280" :border-bottom="false">
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
	   	  	<!-- <u-form-item label="业务类型" label-position="top">
	   				<search-tags :list="publishObj.onLineList" :active="currentType" :singleType="true" @onClick="getDataType"></search-tags>
	   				<u-radio-group v-model="form.businessType" @change="radioGroupChange" :active-color="'#6DD99C'" style="text-align: right;">
	   					<u-radio name="0" style="margin-left: 10pt;">不限 </u-radio>
	   					<u-radio name="1" style="margin-left: 10pt;">网约车 </u-radio>
	   					<u-radio name="2" style="margin-left: 10pt;">出租车 </u-radio>
	   				</u-radio-group>
	   				<text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text>
	   	  	</u-form-item> -->
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
				<u-form-item label="车龄选择" label-position="top">
					<search-tags :list="publishObj.ageList" :active="currentAge" :singleType="true" @onClick="getDataAge"></search-tags>
					<!-- <u-checkbox-group active-color="#6DD99C" @change="powerGroupChange" shape="circle">
						<u-checkbox v-model="item.checked"  v-for="(item, index) in powerList" :key="index" :name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group> -->
				</u-form-item>
				<u-form-item label="行驶里程" label-position="top">
					<search-tags :list="objType[radioType]" :active="currentKm" :singleType="true" @onClick="getDataKm"></search-tags>
					<!-- <u-checkbox-group active-color="#6DD99C" @change="powerGroupChange" shape="circle">
						<u-checkbox v-model="item.checked"  v-for="(item, index) in powerList" :key="index" :name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group> -->
				</u-form-item>
	   		  </u-form>
	   </view>
	   <view style="width: 100%;height: 140rpx;"></view>
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
				addkey: '',
				publishObj: publishObj,
				backTextStyle:{
					'color':'#ffffff'
				},
				form: {
				  businesstype: '',
				  carbrand: '',
				  cartype: '',
				  city: '杭州',
				  startCarAge: '',
				  endCarAge: '',
				  startPriceid: '',
				  endPriceid: '',
				  km: '',
				  power: '',
				  islogin: ''
				},
				priceid: '',
				carage: '',
				total: '',
				value:'',
				brandList:[{name: '比亚迪',checked: false},{name: '北汽新能源',checked: false},{name: '丰田',checked: false},
						{name: '日产',checked: false},{name: '大众',checked: false},{name: '吉利',checked: false},
						{name: '本田',checked: false},{name: '北京现代',checked: false}],
				modelList:[{name:'轿车',checked: false},{name:'SUV',checked:false},{name:'MPV',checked: false},{name:'其他',checked: false}],
				powerList:[{name:'纯电动',checked: false},{name:'插电混动',checked:false},{name:'燃油车(含油电混动)',checked: false}],
				rentList:[{name: '1',text:'不限' },{name: '2',text:'2000以内' },{name: '3',text:'2000-3000' },{name: '4',text:'3000-4000' },{name: '5',text:'4000以上' }],
				ageList:[{name: '1',text:'不限' },{name: '2',text:'1年内' },{name: '3',text:'1年-3年' },{name: '4',text:'3年-5年' },{name: '5',text:'5年以上' }],
				objType:{
					wycList:[{id: '',text:'不限',checked:false },{id: '0',text:'0-2万公里',checked:false },{id: '1',text:'2-5万公里',checked:false},{id: '2',text:'5-10万公里',checked:false },{id: '3',text:'10-20万公里',checked:false },
					     {id: '4',text:'20-30万公里',checked:false },{id: '5',text:'30万公里以上',checked:false},],
					      czcList:[{id: '',text:'不限',checked:false },{id: '0',text:'0-2万公里',checked:false },{id: '1',text:'2-5万公里',checked:false },
					      {id: '2',text:'5-10万公里',checked:false },{id: '3',text:'10-20万公里',checked:false },{id: '4',text:'20-30万公里',checked:false },
					      {id: '5',text:'30-50万公里',checked:false },{id: '6',text:'50-70万公里',checked:false },{id: '7',text:'70万公里以上',checked:false}],
				},
				radioType:'wycList',
				addkey: '',
				businesstype: '',
				carbrandkey: '',
				cartypekey: '',
				powerkey: '',
				priceidkey: '',
				caragekey: '',
				kmkey: '',
				list: [],
				currentType: -1,
				currentCar: -1,
				currentPower: -1,
				currentAge: -1,
				currentKm: -1,
				arrCar:[],
				arrPower:[],
				cartype:[],
				arr:[]
			}
		},
		mounted() {
			this.transform()
		},
		methods: {
			transform() {
				// const businessType = uni.getStorageSync('businesstype');
				// this.businesstype = uni.getStorageSync('businesstype');
				const caragekey = uni.getStorageSync('caragekey');
				this.caragekey = uni.getStorageSync('caragekey');
				const kmkey = uni.getStorageSync('kmkey');
				this.kmkey = uni.getStorageSync('kmkey');
				if(uni.getStorageSync('carbrandDriver')){
					var carbrand = uni.getStorageSync('carbrandDriver').split(',');
				}
				this.publishObj.carType.map(items=>{
				   items.checked = false
				})
				if(uni.getStorageSync('cartypeDriver')){
					var cartype = uni.getStorageSync('cartypeDriver').split(',');
				}
				this.publishObj.power.map(items=>{
				   items.checked = false
				})
				if(uni.getStorageSync('powerDriver')){
					var power = uni.getStorageSync('powerDriver').split(',');
				}
				// if(businessType){
				// 	this.addkey = this.addkey==''?businessType:(this.addkey+','+businessType);
				// 	this.publishObj.onLineList.forEach(item=>{
				// 	   if(item.text == businessType){
				// 		this.currentType = parseInt(item.id)-1
				// 		this.form.businesstype = parseInt(item.id)
				// 	   }
				// 	}) 
				// }
				if(carbrand){
					this.form.carbrand = carbrand.join(',');
					this.addkey = this.addkey==''?this.form.carbrand:(this.addkey+','+this.form.carbrand);
				}
				if(cartype){
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
				if(power){
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
				if(caragekey){
					this.addkey = this.addkey==''?caragekey:(this.addkey+','+caragekey);
					this.publishObj.ageList.forEach(item=>{
					   if(item.text == caragekey){
						this.currentAge = parseInt(item.id)-1
						this.carage = parseInt(item.id)
						if(this.carage == '1') {
							this.form.startCarAge = '';
							this.form.endCarAge = '';
						}
						if(this.carage == '2') {
							this.form.startCarAge = '';
							this.form.endCarAge = '1';
						}
						if(this.carage == '3') {
							this.form.startCarAge = '1';
							this.form.endCarAge = '3';
						}
						if(this.carage == '4') {
							this.form.startCarAge = '3';
							this.form.endCarAge = '5';
						}
						if(this.carage == '5') {
							this.form.startCarAge = '5';
							this.form.endCarAge = '';
						}
					   }
					}) 
				}
				if(kmkey){
					this.addkey = this.addkey==''?kmkey:(this.addkey+','+kmkey);
					this.objType[this.radioType].forEach(item=>{
					   if(item.text == kmkey){
						this.currentKm = item.id == ''?0:parseInt(item.id)+1
						this.form.km = parseInt(item.id)
					   }
					}) 
				}
				const token = uni.getStorageSync('token');
				if(token) {
					this.form.islogin = 1
				}else{
					this.form.islogin = 0
				}
				this.select()
			},
			get(text) {
				this.addkey = this.addkey==''?text:(this.addkey+','+text);
				this.list=[];
				this.value='';
				this.arr.push(text);
				this.form.carbrand = this.arr.join(',');
				this.select()
			},
			// getDataType(obj) {
			// 	this.currentType = obj.index;
			// 	this.form.businesstype = obj.index + 1;
			// 	this.businesstype =  obj.text;
			// 	this.select()
			// 	this.add()
			// },
			getDataAge(obj) {
				this.currentAge = obj.index;
				this.carage = obj.index + 1;
				this.caragekey =  obj.text;
				if(this.carage == '1') {
					this.form.startCarAge = '';
					this.form.endCarAge = '';
				}
				if(this.carage == '2') {
					this.form.startCarAge = '';
					this.form.endCarAge = '1';
				}
				if(this.carage == '3') {
					this.form.startCarAge = '1';
					this.form.endCarAge = '3';
				}
				if(this.carage == '4') {
					this.form.startCarAge = '3';
					this.form.endCarAge = '5';
				}
				if(this.carage == '5') {
					this.form.startCarAge = '5';
					this.form.endCarAge = '';
				}
				this.select()
				this.add()
			},
			getDataKm(obj) {
				this.currentKm = obj.index;
				const index = obj.index-1;
				this.form.km = index==-1?'':index;
				this.kmkey =  obj.text;
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
				this.addkey = this.form.cartype
				+ (this.form.cartype?',':'') + this.form.power + (this.form.power?',':'') + this.caragekey
				+ (this.caragekey?',':'') + this.kmkey
			},
			reset() {
				uni.removeStorageSync('cartypeDriver');
				uni.removeStorageSync('powerDriver');
				// uni.removeStorageSync('businesstype');
				uni.removeStorageSync('caragekey');
				uni.removeStorageSync('kmkey');
				uni.removeStorageSync('carbrandDriver');
				this.currentType = -1;
				this.currentAge = -1;
				this.currentKm = -1;
				// this.form.businesstype = '';
				this.form.power = '';
				this.form.cartype = '';
				this.form.carbrand = '';
				this.form.startCarAge = '';
				this.form.endCarAge = '';
				this.form.km = '';
				// this.businessType = '';
				this.form.cartype = '';
				this.arrPower = [];
				this.form.power = '';
				this.arrCar = [];
				this.form.cartype = '';
				this.addkey = '';
				this.list=[];
				this.value='';
				this.publishObj.carType.map( item => {
				  item.checked=false;
				});
				this.publishObj.power.map( item => {
				  item.checked=false;
				});
				this.select()
			},
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
			brandGroupChange(e) {
				this.form.carbrand = e.join(',');
				this.carbrandkey = e.join('+');
				this.add()
				this.select()
				},
			powerGroupChange(e) {
				this.form.power = e.join(',');
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
				if(e===''){
					this.businesstypekey = '不限'
				}
				if(e==='1'){
					this.businesstypekey = '网约车'
				}
				if(e==='2'){
					this.businesstypekey = '出租车'
				}
				this.add()
				this.select()
			},
			radioGroupChangeRent(e){
				if(this.priceid == '1') {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
					this.priceidkey = '不限';
				}
				if(this.priceid == '2') {
					this.form.startPriceid = '0';
					this.form.endPriceid = '2000';
					this.priceidkey = '2000以内';
				}
				if(this.priceid == '3') {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
					this.priceidkey = '2000-3000';
				}
				if(this.priceid == '4') {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
					this.priceidkey = '3000-4000';
				}
				if(this.priceid == '5') {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '-1';
					this.priceidkey = '4000以上';
				}
				this.add()
				this.select()
			},
			radioGroupChangeAge(e){
				if(this.carage == '1') {
					this.form.startCarAge = '';
					this.form.endCarAge = '';
					this.caragekey = '不限';
				}
				if(this.carage == '2') {
					this.form.startCarAge = '';
					this.form.endCarAge = '1';
					this.caragekey = '1年内';
				}
				if(this.carage == '3') {
					this.form.startCarAge = '1';
					this.form.endCarAge = '3';
					this.caragekey = '1年-3年';
				}
				if(this.carage == '4') {
					this.form.startCarAge = '3';
					this.form.endCarAge = '5';
					this.caragekey = '3年-5年';
				}
				if(this.carage == '5') {
					this.form.startCarAge = '5';
					this.form.endCarAge = '';
					this.caragekey = '5年以上';
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
				this.$u.api.homeRent(params).then(res=>{
					if(res.code === 200){
						this.total = res.total;
					}else {
						 this.$u.toast(res.message);
					}
				})
			},
			history() {
				this.$u.route('/pages/index/driver/components/index/historyRent');
			},
			result() {
				if(this.form.cartype){
					uni.setStorageSync('cartypeDriver', this.form.cartype);
				}
				if(this.form.power){
					uni.setStorageSync('powerDriver', this.form.power);
				}
				// if(this.businesstype){
				// 	uni.setStorageSync('businesstype', this.businesstype);
				// }
				if(this.caragekey){
					uni.setStorageSync('caragekey', this.caragekey);
				}
				if(this.kmkey){
					uni.setStorageSync('kmkey', this.kmkey);
				}
				if(this.form.carbrand){
					uni.setStorageSync('carbrandDriver', this.form.carbrand);
				}
				this.$u.route({url:'/pages/index/index',type:'switchTab'});
			}
		}
	}
</script>

<style lang="scss">
.scroll-container {height: 100%;}
page{
	background-color:#f5f5f8 ;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}

.view-content{
	.name {
		padding: 39rpx;
		font-size: 28rpx;
		background: #fff;
	}
}
 .btn-agree{
	background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
 }
 .filter {
	 background: #fff;
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
	 		 background: linear-gradient(270deg, #FFC600 0%, #FFAB00 58%, #FF9300 100%);
	 		 border-radius: 4px;
	 		 color: #fff;
	 }
 }
</style>
