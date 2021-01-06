<template>
	<view class="search">
	  <u-navbar back-text="返回" back-icon-size="0" title="求职发布" :background="backgroundDri" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
	   	  <u-form :error-type="errorType" :model="form" ref="uForm" label-width="320" :border-bottom="false">
			  <!-- <u-form-item label="是否公开我的求职信息?(必选)" label-position="top">
			  	<u-radio-group v-model="form.isOpen" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
			  		<u-radio name="1" style="margin-left: 10pt;">公开 </u-radio>
			  		<u-radio name="0" style="margin-left: 10pt;">不公开 </u-radio>
			  	</u-radio-group>
			  </u-form-item> -->
			  <!-- <view class="public">*公开，则该条消息将被租车公司看到。</view>
			  <view class="public">不公开，则隐藏该消息 租车公司不可见。</view> -->
	   	  	<u-form-item label="业务类型(必选)" prop="businessType" label-position="top">
				<search-tags :list="publishObj.onLineList" :active="currentType" :singleType="true" @onClick="getDataType"></search-tags>
				<!-- <u-radio-group v-model="form.businessType" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio name="1" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="2" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group> -->
				<!-- <text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text> -->
	   	  	</u-form-item>
			<u-form-item label="工作城市(必选)" label-position="top">
				<search-tags :list="publishObj.cityList" :active="currentCity" :singleType="true"></search-tags>
			</u-form-item>
			<!-- <view class="rules">
				<view>*以下设置项都可多选，至少完成其中1项才能发布</view>
				<view>不选则代表此项“不限”</view>
			</view> -->
			<u-form-item label="月薪" label-position="top" prop="monthprice">
				<search-tags :list="publishObj.salaryList" :active="currentSalary" :singleType="true" @onClick="getDataSalary"></search-tags>
				<!-- <u-radio-group v-model="form.monthprice"  :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in salaryList" :key="index">{{item.text}}</u-radio>
				</u-radio-group> -->
			</u-form-item>
			<u-form-item label="能接受的工作时长" label-position="top" prop="worktime">
				<search-tags :list="publishObj.hoursList" :active="currentHour" :singleType="true" @onClick="getDataHour"></search-tags>
				<!-- <u-radio-group v-model="form.worktime"  :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in hoursList" :key="index">{{item.text}}</u-radio>
				</u-radio-group> -->
			</u-form-item>
			<!-- <u-form-item label="押金" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="depositGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in depositList" :key="index" :name="item.text">
						{{ item.text }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item> -->
			<!-- <view class="more">*以下为加分项，可以不设置。</view> -->
			<u-form-item style="width: 670rpx;" label="网约车工作年限" prop="workexperience">
				<u-input class="inp" maxlength="2" type="number" style="width: 200rpx;height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;margin-right: 10rpx;text-indent: 31rpx;" placeholder="请输入" v-model="form.workexperience" />年
			</u-form-item>
			<u-form-item style="width: 670rpx;" label="出租车工作年限" prop="taxiExperience">
				<u-input class="inp" maxlength="2" type="number" style="width: 200rpx;height: 72rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;margin-right: 10rpx;text-indent: 31rpx;" placeholder="请输入" v-model="form.taxiExperience" />年
			</u-form-item>
			<u-form-item label="福利要求" label-position="top">
				<search-tags :list="publishObj.benefitList" :active="currentBenefit" :singleType="false" @onClick="getDataBenefit"></search-tags>
				<!-- <u-checkbox-group active-color="#FFA032" @change="benefitGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in benefitList" :key="index" :name="item.text">
						{{ item.text }}
					</u-checkbox>
				</u-checkbox-group> -->
			</u-form-item>
			<u-form-item label="我的优势" label-position="top">
				<u-input type="textarea" maxlength="50" style="width: 607rpx;line-height: 72rpx;border-radius: 30rpx;background: #fff;text-indent: 31rpx;" placeholder="退伍军人英语口语交际能力" v-model="form.myok" />
			</u-form-item>
			<u-form-item label="是否公开?(必选)" label-position="top">
				<search-tags :list="publishObj.publicList" :active="currentPublic" :singleType="true" @onClick="getDataPublic"></search-tags>
				<!-- <u-radio-group v-model="form.isOpen" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio name="1" style="margin-left: 10pt;">公开 </u-radio>
					<u-radio name="0" style="margin-left: 10pt;">不公开 </u-radio>
				</u-radio-group> -->
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
				currentSalary: -1,
				currentHour: -1,
				currentBenefit: -1,
				publishObj: publishObj,
				backTextStyle:{
					'color':'#ffffff'
				},
				errorType:[
				  'message'
				],
				showTips: false,
				form:{
					businessType:1,
					isOpen: 1,
					monthprice:'',
					myok:'',
					taxiExperience:'',
					welfare:'',
					workexperience:'',
					worktime:'',
					workCity: '杭州'
				},
				welfare: [],
				arrBenefit: [],
				currentSalary: -1,
				currentHour: -1,
				salaryList:[{name: '0',text:'6000以内' },{name: '1',text:'6000-8000' },{name: '2',text:'8000-10000' },{name: '3',text:'10000以上' }],
				hoursList:[{name: '0',text:'8小时' },{name: '1',text:'8-10小时' },{name: '2',text:'10小时以上' },{name: '3',text:'不限' }],
				depositList:[{text: '有押金',checked: false},{text: '无押金',checked: false},{text: '芝麻信用免押',checked: false},
						{text: '不限',checked: false}],
				benefitList:[{text: '有3险',checked: false},{text: '有5险',checked: false},{text: '无责任底薪',checked: false},
						{text: '月休4天',checked: false}]
			}
		},
		methods: {
			getDataType(obj) {
				this.currentType = obj.index;
				this.form.businessType = obj.index + 1;
			},
			getDataPublic(obj) {
				this.currentPublic = obj.index;
				this.form.isOpen = obj.index;
			},
			getDataSalary(obj) {
				this.currentSalary = obj.index;
				this.form.monthprice = obj.index;
			},
			getDataHour(obj) {
				this.currentHour = obj.index;
				this.form.worktime = obj.index;
			},
			getDataBenefit(item) {
				this.arrBenefit.push(item);
				this.welfare = [];
				this.arrBenefit.map(item=>{
				   if(item.checked == true){
				   	this.welfare.push(item.text);
				   }
				})
				let welfare = new Set(this.welfare);
				this.welfare = Array.from(welfare);
				this.form.welfare = this.welfare.join(',');
			},
			benefitGroupChange(e){
				this.form.welfare = e.join(',');
			},
			release(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						if(this.currentSalary == -1||this.currentHour == -1
						||!this.form.taxiExperience||!this.form.workexperience){
							this.$u.toast('请填写');
							return;
						}
						this.$u.api.releaseSearch(this.form).then(res=>{
								if(res.code === 200){
									this.showTips = true;
									this.form = {
							           businessType:1,
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
	 .u-form{
		 width: 700rpx;
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
