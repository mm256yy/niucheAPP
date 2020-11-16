<template>
	<view class="search">
	  <u-navbar back-text="返回" back-icon-size="0" title="求职发布" :background="backgroundDri" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
	   	  <u-form :error-type="errorType" :model="form" ref="uForm" label-width="320" :border-bottom="false">
			  <u-form-item label="是否公开我的求职信息?(必选)" label-position="top">
			  	<u-radio-group v-model="form.isOpen" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
			  		<u-radio name="1" style="margin-left: 10pt;">公开 </u-radio>
			  		<u-radio name="0" style="margin-left: 10pt;">不公开 </u-radio>
			  	</u-radio-group>
			  </u-form-item>
			  <!-- <view class="public">*公开，则该条消息将被租车公司看到。</view>
			  <view class="public">不公开，则隐藏该消息 租车公司不可见。</view> -->
	   	  	<u-form-item label="业务类型(必选)" prop="businessType">
				<u-radio-group v-model="form.businessType" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="1" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group>
				<!-- <text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text> -->
	   	  	</u-form-item>
			<u-form-item label="工作城市(必选)"><u-input v-model="form.workCity" /></u-form-item>			
			<!-- <view class="rules">
				<view>*以下设置项都可多选，至少完成其中1项才能发布</view>
				<view>不选则代表此项“不限”</view>
			</view> -->
			<u-form-item label="月薪" label-position="top" prop="monthprice">
				<u-radio-group v-model="form.monthprice"  :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in salaryList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="能接受的工作时长" label-position="top" prop="worktime">
				<u-radio-group v-model="form.worktime"  :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in hoursList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<!-- <u-form-item label="押金" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="depositGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in depositList" :key="index" :name="item.text">
						{{ item.text }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item> -->
			<!-- <view class="more">*以下为加分项，可以不设置。</view> -->
			<u-form-item label="网约车工作年限" prop="workexperience">
				<u-input class="inp" maxlength="2" type="number" style="width: 200rpx;height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;margin-right: 10rpx;text-indent: 31rpx;" placeholder="请输入网约车工作年限" v-model="form.workexperience" />年
			</u-form-item>
			<u-form-item label="租车工作年限" prop="taxiExperience">
				<u-input class="inp" maxlength="2" type="number" style="width: 200rpx;height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;margin-right: 10rpx;text-indent: 31rpx;" placeholder="请输入出租车工作年限" v-model="form.taxiExperience" />年
			</u-form-item>
			<u-form-item label="福利要求" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="benefitGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in benefitList" :key="index" :name="item.text">
						{{ item.text }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="我的优势" label-position="top">
				<u-input type="textarea" maxlength="50" style="width: 607rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;text-indent: 31rpx;" placeholder="退伍军人英语口语交际能力" v-model="form.myok" />
			</u-form-item>
		  </u-form>
	   </view>
		<view class="bottom">
			<view class="btn" @click="release()">发布</view>
		</view>
		<u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        信息发布成功
			</view>
		</u-modal>
		<NotLogin></NotLogin>
		<auth></auth>
	</view>
</template>

<script>
	import {mapGetters,mapActions} from 'vuex'
	import NotLogin from '@/components/notlogin/notlogin.vue'
	import auth from '@/components/auth.vue'
	import {requiredRule} from '@/common/rule.js'
	export default {
		components:{
			NotLogin,
			auth
		},
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				errorType:[
				  'message'
				],
				showTips: false,
				form:{
					businessType:0,
					isOpen: 1,
					monthprice:'',
					myok:'',
					taxiExperience:'',
					welfare:'',
					workexperience:'',
					worktime:'',
					workCity: '杭州'
				},
				rules:{
					monthprice:requiredRule,
					taxiExperience:requiredRule,
					workexperience:requiredRule,
					worktime:requiredRule
				},
				salaryList:[{name: '0',text:'6000以内' },{name: '1',text:'6000-8000' },{name: '2',text:'8000-10000' },{name: '3',text:'10000以上' }],
				hoursList:[{name: '0',text:'8小时' },{name: '1',text:'8-10小时' },{name: '2',text:'10小时以上' },{name: '3',text:'不限' }],
				depositList:[{text: '有押金',checked: false},{text: '无押金',checked: false},{text: '芝麻信用免押',checked: false},
						{text: '不限',checked: false}],
				benefitList:[{text: '有3险',checked: false},{text: '有5险',checked: false},{text: '无责任底薪',checked: false},
						{text: '月休4天',checked: false}]
			}
		},
		onReady() {
		     this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			benefitGroupChange(e){
				this.form.welfare = e.join(',');
			},
			release(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						this.$u.api.releaseSearch(this.form).then(res=>{
								if(res.code === 200){
									this.showTips = true;
									this.form = {
							           businessType:0,
							           isOpen: 1,
							           monthprice:'',
							           myok:'',
							           taxiExperience:'',
							           workexperience:'',
							           worktime:'',
							           workCity: '杭州'
						            };
								    this.benefitList.forEach(item => {
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
				this.$u.route('/pages/driver/myPub/myPub', {index: 1});
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
 .search {
	 .inp{
		 width: 10rpx;
	 }
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
