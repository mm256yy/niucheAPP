<template>
	<view class="filter">
	  <u-navbar back-text="返回" back-icon-size="0" title="更多筛选条件" :background="backgroundDri" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"><view @click="history()" style="color: #fff;margin-right: 20rpx;font-size: 30rpx;" slot="right">
		   历史</view></u-navbar>
	   <view class="view-content">
		   <view class="name">比亚迪+宝马 / 3万以内</view>
	   	  <u-form :model="form" ref="uForm" label-width="280" :border-bottom="false">
	   	  	<u-form-item label="业务类型" prop="businesstype">
				<u-radio-group v-model="form.businesstype" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="1" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group>
				<text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text>
	   	  	</u-form-item>
			<u-form-item label="月薪" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="brandGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in salaryMonthly" :key="index" :name="item.name">
						{{item.text}}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="押金" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="modelGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in depositList" :key="index" :name="item.name">
						{{item.text}}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="能接受的工作时长" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="powerGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in hoursList" :key="index" :name="item.name">
						{{item.text}}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="车龄" label-position="top">
				<u-radio-group v-model="form.carage"  :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in ageList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
		  </u-form>	
	   </view>
		<view class="bottom">
			<view class="btn">重置</view>
			<view class="total" @click="result()">当前选择条件的检索结果，共0条>></view>
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				form:{
					userid:'',
					businesstype:0,
					carmodel:[],
					intentionbrand:[],
					power:[],
					monthzu:'',
					carage:'',
					km:''
				},
				value:'',
				salaryMonthly:[{name: '0',text:'6000以内' },{name: '1',text:'6000-8000' },{name: '1',text:'8000-10000' },{name: '1',text:'10000以上' }],
				depositList:[{name: '0',text:'有押金' },{name: '1',text:'无押金' },{name: '2',text:'芝麻信用免押' }],
				hoursList:[{name: '0',text:'8小时' },{name: '1',text:'8-10小时' },{name: '2',text:'10小时以上' }],
				ageList:[{name: '0',text:'有3险' },{name: '1',text:'有5险' },{name: '2',text:'无责任底薪' },{name: '2',text:'月休4天' }],
				radioType:'wycList',
				showTips:false
			}
		},
		computed:{
			...mapGetters(['telephone'])
		},
		mounted() {
			this.form.userid = this.telephone;
		},
		methods: {
			brandGroupChange(e) {this.form.intentionbrand = e;},
			powerGroupChange(e) {this.form.power = e;},
			modelGroupChange(e) {this.form.carmodel = e;},
			radioGroupChange(e){
				this.radioType = e=== '0'?'wycList':'czcList'
			},
			addBrand(){
				if (this.value){
					this.brandList.push({name:this.value,checked:false})
					this.value = ''
				}
			},
			toNext(){
				// if (this.form.mainBusiness === ''){
				// 	this.$u.toast('请选择业务类型');
				// 	return
				// }
				this.$u.api.saveShoping(this.form).then(res=>{
					if(res.code === '200'){
						this.showTips = true;
					}else {
						 this.$u.toast(res.message);
					}
				})
			},
			history() {
				this.$u.route('/pages/index/driver/components/index/historySearch');
			},
			result() {
				this.$u.route('/pages/index/driver/components/index/resultSearch');
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
	margin-top: 20pt;padding: 0 10pt;
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
	 .bottom .btn {
		 width: 200rpx;
		 height: 80rpx;
		 line-height: 80rpx;
		 text-align: center;
		 color: #fff;
		 background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
		 float: left;
	 }
	 .total {
		 line-height: 80rpx;
		 margin-left: 20rpx;
		 float: left;
	 }
 }
</style>
