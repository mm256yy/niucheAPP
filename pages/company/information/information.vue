<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" @custom-back="toCenter" title="公司信息" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view style="padding: 10pt 0;">
			<view class="" style="display: flex;text-align: center;flex-direction:column;">
				<view class="">
					<u-avatar :src="companySrc" size="150"></u-avatar>
				</view>
				<view >{{companyName}}</view>
			</view>
		</view>
         <view style="padding: 0 20pt; ">
			<u-row style="padding: 8pt;background: #FFFFFF;">
				<u-col span="4">企业身份认证</u-col>
				<u-col span="8" class="auth-col" v-if="authFlag"> {{checkstate| state}}</u-col>
				<u-col span="8" class="auth-col" @click="toAuth" v-else>去认证>></u-col>
			</u-row>
         </view>
		 <view class="content">
            <view class="content-view">
			  <u-form :model="form" ref="uForm" label-width='60pt' :label-style="labelStyle">
				<u-form-item label="公司名称">
					<u-input v-model="form.comparyname" :disabled="true" :border="false" placeholder=""/>
				</u-form-item>
				<u-form-item label="公司成员">
					<u-input v-model="form.memberNumber" :disabled="!form.memberNumberFlag" :border="form.memberNumberFlag" placeholder=""/> 
					<u-icon name="edit-pen" @click="editShow('memberNumberFlag')" v-show="!form.memberNumberFlag"></u-icon>
					<u-icon name="checkbox-mark"  @click="editSave('memberNumber')" style="padding-left: 15rpx;" color="#6DD99C" size='40' v-show="form.memberNumberFlag"></u-icon>
				</u-form-item>
				<u-form-item label="经营车辆">
					<u-input v-model="form.carNum" :disabled="!form.carNumFlag" :border="form.carNumFlag" placeholder=""/>
					<u-icon name="edit-pen" @click="editShow('carNumFlag')" v-show="!form.carNumFlag"></u-icon>
					<u-icon name="checkbox-mark" @click="editSave('carNum')" style="padding-left: 15rpx;" color="#6DD99C" size='40' v-show="form.carNumFlag"></u-icon>
				</u-form-item>
			   </u-form>
             </view>
		  </view>
		  <view class="content">
			  <view class="content-view">
			  	<u-row style="padding: 8pt 0;">
			  		<u-col span="4">主营业务</u-col>
			  		<u-col span="8" style="text-align: right;">
						<u-icon name="edit-pen" @click="editShow('mainBusinessFlag')" v-show="!form.mainBusinessFlag"></u-icon>
						<u-icon name="checkbox-mark" @click="editSave('mainBusiness')" style="padding-left: 15rpx;" color="#6DD99C" size='40' v-show="form.mainBusinessFlag"></u-icon>
					</u-col>
			  	</u-row>
				<view style="padding: 8pt 0;" v-show="!form.mainBusinessFlag">
	                <u-tag :text="item" type="success" mode="dark" class="tag-style" v-for="(item,index) in form.mainBusiness" :key="index"/>
			  	</view>
				<view style="padding: 8pt 0;" v-show="form.mainBusinessFlag">
					<u-checkbox-group active-color="#6DD99C" width="50%"  @change="radioGroupChange" shape="circle">
						<u-checkbox v-model="item.checked" v-for="(item, index) in checkboxList" :key="index" :name="item.name">
							{{ item.name }}
						</u-checkbox>
					</u-checkbox-group>
				</view>
				
			  </view>
		  </view>
		  <view class="content">
			 <view class="content-view">
			<u-row style="padding: 8pt 0;">
				<u-col span="4">公司介绍</u-col>
				<u-col span="8" style="text-align: right;">
					<u-icon name="edit-pen" @click="editShow('companyIntroduceFlag')" v-show="!form.companyIntroduceFlag"></u-icon>
					<u-icon name="checkbox-mark" @click="editSave('companyIntroduce')" style="padding-left: 15rpx;" color="#6DD99C" size='40' v-show="form.companyIntroduceFlag"></u-icon>
					</u-col>
				<u-col span='12' style="padding: 8pt 0;">
					<u-input v-model="form.companyIntroduce" type="textarea" maxlength='300' :disabled="!form.companyIntroduceFlag" :border="form.companyIntroduceFlag" :auto-height="true" placeholder=""/>
				</u-col>
			</u-row>
			 </view>
		  </view>
		  <view class="content" style="margin-bottom: 20pt;">
		     <view class="content-view">
				 <u-row style="padding: 8pt 0;">
				 	<u-col span="4">企业联系人</u-col>
				 	<u-col span="8" style="text-align: right;"><u-icon name="edit-pen" @click="toPerson"></u-icon></u-col>
				 </u-row>
				  <u-form :model="form" label-width='60pt' :label-style="labelStyle">
					<u-form-item label="姓名">
						<u-input v-model="form.name" :disabled="true" :border="false" placeholder=""/>
					</u-form-item>
					<u-form-item label="联系电话">
						<u-input v-model="form.phone" :disabled="true" :border="false" placeholder=""/> 
					</u-form-item>
				   </u-form>
		      </view>
		   </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				labelStyle:{
					'color':'#000'
				},
				checkstate:'',
				checkboxList: [
							{name: '网约车',checked: false},{name: '出租车',checked: false},{name: '长短租',checked: false},
							{name: '汽车生产',checked: false},{name: '车辆销售',checked: false},{name: '维修与保养',checked: false},
							{name: '汽车金融',checked: false},{name: '汽车保险',checked: false},{name: '装修与美容',checked: false},
							{name: '其他',checked: false}
						],
				companyName:'',		
				form:{
					comparyid:'',
					comparyname:'',
					memberNumber:'',
					memberNumberFlag:false,
					carNum:'',
					carNumFlag:false,
					mainBusiness:'',
					mainBusinessFlag:false,
					companyIntroduce:'',
					companyIntroduceFlag:false,
					name:'',
					phone:''
				},
				resData:{},
				authFlag:false,//认证状态
				companySrc: '../../static/touxx.png',
				token:''
			}
		},
		filters: {
		  state: function (value) {
				if (value === 2) {
					return '已认证不可更改'
				} else if (value === 0){
					return '未认证'
				} else if (value === 1){
					return '审核中'
				} else if (value === 3){
					return '认证未通过'
				}else {
					return ''
				}
		  }
		},
        mounted() {
			this.initStorage()
        	this.getCompanyInfo()
        },
		methods: {
			initStorage(){
				this.token = uni.getStorageSync('token');
			},
			toAuth(){
				this.$u.route('/pages/company/identityAuth/identityAuth',{id:this.form.comparyid})
			},
			toPerson(){
				this.$u.route('/pages/company/personEdit/personEdit',{id:this.form.comparyid})
			},
			toCenter(){
				this.$u.route({url:'/pages/mycenter/mycenter',type:'switchTab'})
			},
			getCompanyInfo(){
				let token = this.token;
					if (token) {
						this.$u.api.getCompanyInfo().then(res=>{
							if(res.code === 200){
								let data = res.comparySelectByidVo;
								this.resData = data;
								this.checkstate = data.checkstate;
								if (data.checkstate === 1 || data.checkstate === 2) {
									this.authFlag = true
								}
								this.companyName = data.comparynickname;
								this.form.comparyid = data.comparyid;
								this.form.comparyname =data.comparyname;
								this.form.memberNumber = data.comparypeoplenum;
								this.form.carNum = data.comparycarnum;
								this.form.mainBusiness = data.mainbusiness;
								this.form.companyIntroduce = data.comparytext;
								this.form.name = data.username;
								this.form.phone = data.telephone;
								this.companySrc = data.comparylogophoto
								let list = data.mainbusiness;
								if(list === null){
									return
								}
								list.forEach(item=>{
									this.checkboxList.map(val => {
										if(val.name === item){
											val.checked = true;
										}
									})
								})
							}else {
								 this.$u.toast(res.msg);
							}
						})
					}
			},
			radioGroupChange(e) {
				this.form.mainBusiness = e;
			},
			editShow(name){
				this.form[name] = true;
			},
			editSave(name){
				let flag = name+'Flag';
				if(name === 'memberNumber'){
					this.resData.comparypeoplenum = this.form[name]
				} else if (name === 'carNum') {
					this.resData.comparycarnum = this.form[name]
				} else if (name === 'mainBusiness'){
					this.resData.mainbusiness = this.form[name]
				} else {
					this.resData.comparytext =this.form[name]
				}
				this.$u.api.editCompany(this.resData).then(res=>{
					if(res.code === 200){
						this.$u.toast(res.msg);
					}else {
						 this.$u.toast(res.msg);
					}
				}).catch(res=>{this.$u.toast(res.msg)})
				this.form[flag] = false;
			},
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color:#f5f5f8 ;
		height: 100%;
	}
	.auth-col{
		text-align:right!important;color: #7E7E7E;
	}
	.content{
		padding: 0 20pt; margin-top: 20pt;
	}
	.content-view{
		padding:0 10pt;background: #FFFFFF;border-radius: 8pt;
	}
	.tag-style{
		margin-right: 8pt;margin-bottom: 5pt;
	}
	.btn-refuse{
		background: #C0C4CC;
	}
	 .btn-agree{
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
	 }
</style>
