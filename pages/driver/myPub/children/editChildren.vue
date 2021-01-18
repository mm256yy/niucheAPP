<template>
	<view class="filter">
	  <u-navbar back-text="返回" back-icon-size="0" title="求租发布" :background="backgroundDri" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
		   <view v-show="brandShow" style="position: absolute;top: 630rpx;left: 0;z-index: 100;width: 100%;">
		   			   <view v-for="(item, index) in list" :key="index" style="display: flex;justify-content: space-between;align-items: center;padding: 24rpx 34rpx;background: #fff;
		   			   border-bottom: 2rpx solid rgba(0,0,0,0.03);">
		   			   	<view style="font-size: 32rpx;color: #333;">{{item.brandname}}</view>
		   			   	<view style="width: 48rpx;height: 48rpx;border-radius: 50%;background: #4aba75;line-height: 48rpx;
		   			   	text-align: center;font-size: 26rpx;color: #fff;font-weight: 900;" @click="get(item.brandname)">十</view>
		   			   </view>
		   </view>
	   	  <u-form style="position: relative;" :error-type="errorType" :model="form" ref="uForm" label-width="320" :border-bottom="false">
			  <u-form-item label="租车城市(必选)">
				  <search-tags :list="publishObj.cityList" :active="currentCity" :singleType="true"></search-tags>
				  <!-- <u-input :disabled="true" v-model="form.workCity" /> -->
				  </u-form-item>
	   	  	<u-form-item label="业务类型(必选)">
				<search-tags :list="publishObj.onLineList" :active="currentType" :singleType="true" @onClick="getDataType"></search-tags>
				<!-- <u-radio-group v-model="form.businessType" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio name="1" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="2" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group> -->
				<!-- <text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text> -->
	   	  	</u-form-item>
			<u-form-item label="品牌选择" label-position="top">
				<search-tags v-show="!brandShow" :list="brandList" :active="currentBrand" :singleType="false" @onClick="getDataBrand"></search-tags>
				<!-- <u-checkbox-group active-color="#6DD99C" @change="brandGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in brandList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group> -->
			</u-form-item>
			<u-form-item label="" label-position="top">
				<u-row style="border-bottom: 2rpx solid rgba(0,0,0,0.06);padding-bottom: 10rpx;width: 680rpx;">
					<u-col span="8"><u-input @input="keyup" v-model="value" maxlength="30" :border="false" placeholder="请选择品牌型号"/></u-col>
				</u-row>
				<!-- <u-checkbox-group active-color="#6DD99C" @change="brandGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in brandList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group> -->
			</u-form-item>
			<u-form-item label="车型(多选)" label-position="top" prop="carmodel">
				<search-tags :list="publishObj.carType" :active="currentModel" :singleType="false" @onClick="getDataModel"></search-tags>
				<!-- <u-checkbox-group active-color="#FFA032" @change="modelGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in modelList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group> -->
			</u-form-item>
			<u-form-item label="动力(多选)" label-position="top" prop="power">
				<search-tags :list="publishObj.power" :active="currentPower" :singleType="false" @onClick="getDataPower"></search-tags>
				<!-- <u-checkbox-group active-color="#FFA032" @change="powerGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in powerList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group> -->
			</u-form-item>
			<u-form-item label="月租" label-position="top" prop="monthzu">
				<search-tags :list="rentList" :active="currentRent" :singleType="true" @onClick="getDataRent"></search-tags>
				<!-- <u-radio-group v-model="form.monthzu"  :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in rentList" :key="index">{{item.text}}</u-radio>
				</u-radio-group> -->
			</u-form-item>
			<u-form-item label="车龄" label-position="top" prop="carage">
				<search-tags :list="ageList" :active="currentAge" :singleType="true" @onClick="getDataAge"></search-tags>
				<!-- <u-radio-group v-model="form.carage"  :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in ageList" :key="index">{{item.text}}</u-radio>
				</u-radio-group> -->
			</u-form-item>
			<u-form-item label="行驶里程" label-position="top" prop="km">
				<search-tags :list="objType[radioType]" :active="currentKm" :singleType="true" @onClick="getDataKm"></search-tags>
				<!-- <u-radio-group v-model="form.km"  :active-color="'#FFA032'" style="text-align: right;">
				  <u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in objType[radioType]" :key="index">{{item.text}}</u-radio>
				</u-radio-group> -->
			</u-form-item>
			<u-form-item label="是否公开我的租车需求?(必选)" label-position="top">
				<search-tags :list="publishObj.publiclist" :active="currentPublic" :singleType="true" @onClick="getDataPublic"></search-tags>
				<!-- <u-radio-group v-model="form.isOpen" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio name="1" style="margin-left: 10pt;">公开 </u-radio>
					<u-radio name="0" style="margin-left: 10pt;">不公开 </u-radio>
				</u-radio-group> -->
			</u-form-item>
		  </u-form>
	   </view>
		<view class="bottom">
			<view @click="release()" class="btn">发布</view>
		</view>
		<u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        信息发布成功
			</view>
		</u-modal>
		<auth></auth>
	</view>
</template>

<script>
	import auth from '@/components/auth.vue'
	import {requiredRule} from '@/common/rule.js'
	import searchTags from '@/components/searchTags.vue'
	import {
		publishObj
	} from '@/utils/constant.js'
	export default {
		components:{
			auth,
			searchTags
		},
		data() {
			return {
				currentType: 0,
				currentPublic: 0,
				currentCity: 0,
				currentPower: -1,
				currentAge: -1,
				currentModel: -1,
				currentRent: -1,
				currentKm: -1,
				currentBrand: -1,
				brandShow: true,
				publishObj: publishObj,
				backTextStyle:{
					'color':'#ffffff'
				},
				errorType:[
				     'message'
				    ],
				form:{
					businessType:1,
					carCard:'',
					carmodel: '',
					power:'',
					monthzu:'',
					carage:'',
					isOpen: 1,
					km:'',
					workCity: '杭州'
				},
				arrModel: [],
				arrCar: [],
				arrPower: [],
				arrBrand: [],
				carCard: [],
				value:'',
				list:[],
				brandList: [],
				modelList:[{name:'轿车',checked: false},{name:'SUV',checked:false},{name:'MPV',checked: false},{name:'其他',checked: false}],
				powerList:[{name:'纯电动',checked: false},{name:'插电混动',checked:false},{name:'燃油车(含油电混动)',checked: false}],
				ageList:[{id: '0',text:'1年内',checked:false },{id: '1',text:'1年-3年',checked:false },{id: '2',text:'3年-5年',checked:false },{id: '3',text:'5年以上',checked:false }],
				rentList:[{id: '0',text:'3000以内（含3000）',checked:false },{id: '1',text:'3000以上',checked:false }],
				objType:{
					wycList:[{id: '0',text:'0-2万公里',checked:false },{id: '1',text:'2-5万公里',checked:false},{id: '2',text:'5-10万公里',checked:false },{id: '3',text:'10-20万公里',checked:false },
					     {id: '4',text:'20-30万公里',checked:false },{id: '5',text:'30万公里以上',checked:false},],
					      czcList:[{id: '0',text:'0-2万公里',checked:false },{id: '1',text:'2-5万公里',checked:false },
					      {id: '2',text:'5-10万公里',checked:false },{id: '3',text:'10-20万公里',checked:false },{id: '4',text:'20-30万公里',checked:false },
					      {id: '5',text:'30-50万公里',checked:false },{id: '6',text:'50-70万公里',checked:false },{id: '7',text:'70万公里以上',checked:false}],
				},
				radioType:'wycList',
				showTips:false
			}
		},
		onLoad(option) {
			this.driverDemandId = option.id;
		},
		mounted() {
			this.currentAge == -1;
			this.currentRent == -1;
			this.currentKm == -1;
			this.brandList.forEach(item => {
			      item.checked=false;
			})
			this.publishObj.carType.forEach(item => {
			      item.checked=false;
			})
			this.publishObj.power.forEach(item => {
			      item.checked=false;
			})
			this.getDetail()
		},
		methods: {
			getDetail(){
				this.$u.api.getUserWanted({driverDemandId:this.driverDemandId}).then(res=>{
					if(res.code === 200){
						  let data = res.object;
						  // this.form = data;
						 if (data.carModel){
							this.form.carmodel = data.carModel;
							let carModel = data.carModel.split(',');
							carModel.forEach(obj=>{
								 this.publishObj.carType.forEach(item=>{
									 if(item.text === obj){
										item.checked = true;
										this.arrModel.push(item);
									 }
								 })
							})
						 }
						 this.currentRent = data.monthlyRent;
						 this.form.monthzu = data.monthlyRent;
						 this.currentAge = data.carAge;
						 this.form.carage = data.carAge;
						 this.currentType = data.businessType - 1;
						 this.form.businessType = data.businessType;
						 this.currentKm = data.km;
						 this.form.km = data.km;
						 this.currentPublic = data.isOpen;
						 this.form.isOpen = data.isOpen;
						  let arr = []
						 if (data.carCard){
							 this.brandShow = false;
							 this.form.carCard = data.carCard;
							 let carCardList = data.carCard.split(',');
							 carCardList.forEach(item=>{
								 this.brandList.push({
								 	text:item,checked:false
								 });
							})
							carCardList.forEach(obj=>{
								 this.brandList.forEach(item=>{
								 	 if(item.text === obj){
								 	 	item.checked = true;
								 	 	this.arrBrand.push(item);
								 	 }
								 })
							})
						 }
						 if (data.power){
							this.form.power = data.power;
							let power = data.power.split(',');
							power.forEach(obj=>{
								 this.publishObj.power.forEach(item=>{
									 if(item.text === obj){
										item.checked = true;
										this.arrPower.push(item);
									 }
								 })
							})
						 }						
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			keyup() {
				if(this.value != ''){
					this.$u.api.brandList({initialOrBrandName: this.value}).then(res=>{
						if(res.code === 200){
							this.brandShow = true;
							this.list = res.object; 
						}else {
							 this.$u.toast(res.msg);
						}
					})
				}
			},
			get(text) {
				this.brandShow = false;
				this.value='';
				var show = false;
				if(this.brandList.length == 0){
					this.brandList.push({
						text:text,checked:true
					});
				}else{
					this.brandList.map(item=>{
					   if(item.text == text){
					   	 show = true;
					   }
					})
					if(!show){
						 this.brandList.push({
						 	text:text,checked:true
						 });
					}
				}
				var brand = [];
				this.brandList.map(item=>{
				   if(item.checked == true){
				   	brand.push(item.text);
				   }
				})
				if(brand.length == 1){
					this.form.carCard = brand[0];
				}
				this.form.carCard = brand.join(',');
				this.brandList.map(item=>{
				   this.arrBrand.push(item);
				})
			},
			getDataBrand(item) {
				this.arrBrand.push(item);
				this.carCard = [];
				this.arrBrand.map(item=>{
				   if(item.checked == true){
				   	this.carCard.push(item.text);
				   }
				})
				let carCard = new Set(this.carCard);
				this.carCard = Array.from(carCard);
				this.form.carCard = this.carCard.join(',');
			},
			getDataType(obj) {
				this.currentType = obj.index;
				this.form.businessType = obj.index + 1;
			},
			getDataPublic(obj) {
				this.currentPublic = obj.index;
				this.form.isOpen = obj.index;
			},
			getDataRent(obj) {
				this.currentRent = obj.index;
				this.form.monthzu = obj.index;
			},
			getDataAge(obj) {
				this.currentAge = obj.index;
				this.form.carage = obj.index + 1;
			},
			getDataKm(obj) {
				this.currentKm = obj.index;
				this.form.km = obj.index;
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
			},
			getDataModel(item) {
				this.arrModel.push(item);
				this.carmodel = [];
				this.arrModel.map(item=>{
				   if(item.checked == true){
				   	this.carmodel.push(item.text);
				   }
				})
				let carmodel = new Set(this.carmodel);
				this.carmodel = Array.from(carmodel);
				this.form.carmodel = this.carmodel.join(',');
			},
			brandGroupChange(e) {
				this.form.carCard = e.join(',');
			},
			powerGroupChange(e) {this.form.power = e.join(',');},
			modelGroupChange(e) {this.form.carmodel = e.join(',');},
			radioGroupChange(e){
				this.radioType = e=== '0'?'wycList':'czcList'
			},
			addBrand(){
				if (this.value){
					this.brandList.push({name:this.value,checked:true})
					let arr = []
					this.brandList.forEach(item=>{
						if(item.checked){
							arr.push(item.name)
						}
					})
					this.brandGroupChange(arr)
					this.value = ''
				}
			},
			release(){
				this.form.driverDemandId = this.driverDemandId
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if(this.currentAge == -1||this.currentRent == -1||this.currentKm == -1||!this.form.carCard
						||!this.form.carmodel||!this.form.power){
							this.$u.toast('请填写');
							return;
						}
						this.$u.api.updateUserWanted(this.form).then(res=>{
							if(res.code === 200){
								this.showTips = true;
								this.form = {
							        businessType:1,
							        carCard:'',
							        carmodel: '',
							        power:'',
							        monthzu:'',
							        carage:'',
							        isOpen: 1,
							        km:'',
							        workCity: '杭州'
						        };
								this.brandList.forEach(item => {
								      item.checked=false;
								})
								this.modelList.forEach(item => {
								      item.checked=false;
								})
								this.powerList.forEach(item => {
								      item.checked=false;
								})
							}else {
								 this.$u.toast(res.msg);
							}
						 })
				    }
				});
			},
			tipsConfirm(){
				this.$u.route('/pages/driver/myPub/myPub', {index: 0});
			}
		}
	}
</script>

<style lang="scss" scoped>
.scroll-container {height: 100%;}
page{
	background-color:#f5f5f8 ;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}

.view-content{
	margin-top: 10pt;padding: 0 10pt;
	.name {
		padding: 39rpx;
		width: 670rpx;
		height: 148rpx;
		font-size: 28rpx;
		background: #fff;
	}
}
 .btn-agree{
	background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
 }
 .filter {
	 .u-slot-content {
		 width: 100rpx;
		 color: #fff;
		 float: right;
	 }
	 .bottom {
		 width: 750rpx;
		 height: 144rpx;
		 line-height: 144rpx;
		 text-align: center;
		 font-size: 36rpx;
		 font-weight: 900;
		 color: #fff;
		 background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
	 }
	 .total {
		 line-height: 80rpx;
		 margin-left: 20rpx;
		 float: left;
	 }
 }
</style>
