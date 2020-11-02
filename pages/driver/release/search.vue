<template>
	<view class="filter">
	  <u-navbar back-text="返回" back-icon-size="0" title="求职发布" :background="backgroundDri" 
	   :back-text-style="backTextStyle" height='98' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
	   	  <u-form :model="form" ref="uForm" label-width="320" :border-bottom="false">
			  <u-form-item label="是否公开我的租车需求？" prop="businesstype">
			  	<u-radio-group v-model="form.businesstype" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
			  		<u-radio name="0" style="margin-left: 10pt;">公开 </u-radio>
			  		<u-radio name="1" style="margin-left: 10pt;">不公开 </u-radio>
			  	</u-radio-group>
			  </u-form-item>
			  <view class="public">*公开，则该条消息将被租车公司看到。</view>
			  <view class="public">不公开，则隐藏该消息 租车公司不可见。</view>
	   	  	<u-form-item label="业务类型" prop="businesstype">
				<u-radio-group v-model="form.businesstype" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="1" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group>
				<text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text>
	   	  	</u-form-item>
			<view class="rules">
				<view>*以下设置项都可多选，至少完成其中1项才能发布</view>
				<view>不选则代表此项“不限”</view>
			</view>
			<u-form-item label="月薪" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="brandGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in salaryList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="押金" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="modelGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in depositList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="能接受的工作时长" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="hoursGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in hoursList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="福利要求" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="benefitGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in benefitList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<view class="more">*以下为加分项，可以不设置。</view>
			<u-form-item label="工作经验" label-position="top"><u-input style="width: 607rpx;height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;margin-right: 10rpx;text-indent: 31rpx;" placeholder="请输入网约车工作年限,单位不用输入" v-model="form.intro" />年</u-form-item>
			<u-form-item label="我的优势" label-position="top"><u-input style="width: 607rpx;height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;text-indent: 31rpx;" placeholder="退伍军人英语口语交际能力" v-model="form.intro" /></u-form-item>
		  </u-form>
	   </view>
		<view class="bottom">
			<view class="btn" @click="release()">发布</view>
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
				salaryList:[{name: '6000以内',checked: false},{name: '6000-8000',checked: false},{name: '8000-10000',checked: false},
						{name: '10000以上',checked: false}],
				depositList:[{name: '有押金',checked: false},{name: '无押金',checked: false},{name: '芝麻信用免押',checked: false},
						{name: '不限',checked: false}],
				hoursList:[{name: '8小时',checked: false},{name: '8-10小时',checked: false},{name: '10小时以上',checked: false},
						{name: '不限',checked: false}],
				benefitList:[{name: '有3险',checked: false},{name: '有5险',checked: false},{name: '无责任底薪',checked: false},
						{name: '月休4天',checked: false}],
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
			salaryGroupChange(e) {this.form.intentionbrand = e;},
			depositGroupChange(e) {this.form.power = e;},
			hoursGroupChange(e) {this.form.carmodel = e;},
			benefitGroupChange(e){
				console.log(e)
			},
			release(){
				// if (this.form.public === ''){
				// 	this.$u.toast('请选择是否公开');
				// 	return
				// }
				// if (this.form.mainBusiness === ''){
				// 	this.$u.toast('请选择业务类型');
				// 	return
				// }
				// if (this.form.mainBusiness === ''||this.form.mainBusiness === ''||this.form.mainBusiness === ''||this.form.mainBusiness === ''){
				// 	this.$u.toast('请选择一项');
				// 	return
				// }
				this.$u.api.saveShoping(this.form).then(res=>{
					if(res.code === '200'){
						this.showTips = true;
					}else {
						 this.$u.toast(res.message);
					}
				})
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
	.public {
		color:rgb(126, 126, 126);
		margin-top: -10rpx;
		margin-bottom: 10rpx;
	}
	
	.rules {
		width: 630rpx;
		height: 71rpx;
		background: rgba(0,0,0,0.04);
		margin-left: 10rpx;
		font-size: 20rpx;
		color:rgb(126, 126, 126);
		padding: 4rpx;
	}
	.more {
		width: 630rpx;
		height: 71rpx;
		line-height: 71rpx;
		background: rgba(0,0,0,0.04);
		font-size: 20rpx;
		color:rgb(126, 126, 126);
		margin-left: 10rpx;
		padding-left: 16rpx;
	}
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
	 .bottom {
		 width: 750rpx;
		 height: 144rpx;
		 line-height: 144rpx;
		 text-align: center;
		 font-size: 36rpx;
		 font-weight: 900;
		 color: #fff;
		 background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
		 margin-top: 40rpx;
	 }
	 .total {
		 line-height: 80rpx;
		 margin-left: 20rpx;
		 float: left;
	 }
 }
</style>
