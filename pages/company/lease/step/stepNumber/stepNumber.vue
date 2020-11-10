<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="车辆参数" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item" @click="setForm">
					<text>跳过</text>
				</view>
			</view>
		</u-navbar>
		<view class="view-content">
		  <view style="margin-top: 20pt;font-size: 14pt;padding-left: 5pt;">
		  	<view class="">
		  		基本参数
		  	</view>
			<u-form :model="form" ref="uForm" label-width="180" :border-bottom="false">
				<u-form-item label="长*宽*高" prop="name"><u-input v-model="form.specification" :clearable="false" :border="true" class="form_input"/>
				<text class="middle-content-label">mm</text></u-form-item>
				<u-form-item label="行李箱容积"><u-input v-model="form.trunk" :clearable="false"  maxlength="30" :border="true" class="form_input"/>
				<text class="middle-content-label">L</text></u-form-item>
				<u-form-item label="轴距"><u-input v-model="form.wheel" type="number" :clearable="false" maxlength="30" :border="true" class="form_input"/>
				<text class="middle-content-label">mm</text></u-form-item>
				<u-form-item label="排量"><u-input v-model="form.displacement" type="number" :clearable="false" maxlength="30" :border="true"
				 class="form_input"/><text class="middle-content-label">L</text></u-form-item>
			    <u-form-item label="环 保 标 准 ">
			    	<u-input v-model="form.environmental" class="form_input" type="select" :border="true" placeholder="请选择" @click="show = true" />
			    	<u-action-sheet :list="list" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			    </u-form-item>
			</u-form>
		  </view>
		</view>
		<view @click="showDialog" style="padding: 20pt;">
			<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon><text style="vertical-align: top;">添加其他参数</text>
		</view>
		<view class="view-content" v-show="form.elseParamterList.length>0">
		  <view style="margin-top: 20pt;font-size: 14pt;padding-left: 5pt;">
		  	<view class="">
		  		其他参数
		  	</view>
			<u-form-item :label="item.paramtername" prop="name" label-width="180" v-for="(item,index) in form.elseParamterList" :key='index'>
				<u-input v-model="item.paramtertext" :clearable="false" maxlength="30" :border="true" class="form_input"/>
				<text class="middle-content-label">{{item.paramterunit}}</text>
			</u-form-item>
		  </view>
		</view>
		<u-modal v-model="dialogShow" @confirm="confirm" ref="uModal" title="其他参数" :async-close="true" :show-cancel-button="true" 
		confirm-text="添加" cancel-text="放弃">
			<view class="slot-content" style="padding:5pt 15pt;">
				<u-input v-model="addForm.paramtername" :border="true" placeholder="请输入参数名称"/>
			</view>
			<view class="slot-content" style="padding:5pt 15pt;">
				<u-input v-model="addForm.paramtertext" :border="true" placeholder="请输入参数内容"/>
			</view>
			<view class="slot-content" style="padding:5pt 15pt;">
				<u-input v-model="addForm.paramterunit" :border="true" placeholder="请输入参数单位"/>
			</view>
		</u-modal>
		<u-row>
			<u-col span="12">
				<u-button type="success" class="btn-agree" @click="setForm">提交审核</u-button>
			</u-col>
		</u-row>
		<u-modal v-model="showTips" @confirm="tipsConfirm" @cancel="tipsCancel" :show-cancel-button="true" confirm-text="现在开始编辑" cancel-text="跳过">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
				您是第一次发布租车信息，需要完成贵公司租车常见问题编辑。编辑后贵公司其他在租车辆可直接使用。
				您可在问题模板基础上编辑，也可自行编辑。是否现在开始？
			</view>
		</u-modal>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				form:{
					specification:'',
					trunk:'',
					wheel:'',
					displacement:'',
					environmental:'',
					elseParamterList:[]
					
				},
				show:false,
				showTips:false,
				dialogShow:false,
				addForm:{
					"paramtername":'',
					"paramtertext":'',
					"paramterunit":''
				},
                list:[
					{value: '1',text: '国4'},{value: '2',text: '国5'},{value: '3',text: '国6'},{value: '4',text: '其他'},
				],
				 CartagId:'',
			}
		},
		computed:{
			...mapGetters(['telephone','carPubType','carPubFirst','carPubSecond','carPubThree','carPubFour','carPubFive',
			'carPubSix','carPubSeven','carPubEight',])
		},
		
		methods: {
			setForm(){
				let obj = Object.assign({comparyid:this.telephone},this.carPubFirst, this.carPubSecond,this.carPubThree,this.carPubFour,
				this.carPubFive,this.carPubSix,this.carPubSeven,this.form);
				obj.mainbusinesstype = this.carPubType;
				obj.businesstype = Number(obj.businesstype)
				this.$u.api.saveMainBusiness(obj).then(res=>{
					if(res.code === 200){
						this.clearStorage()
						let data = res.object;
						if (data.isfirst === 1){
							this.showTips = true;
						} else{
							this.tipsCancel()
						}
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			clearStorage(){
				uni.removeStorageSync('carPubType');
				uni.removeStorageSync('carPubFirst');
				uni.removeStorageSync('carPubSecond');
				uni.removeStorageSync('carPubThree');
				uni.removeStorageSync('carPubFour');
				uni.removeStorageSync('carPubFive');
				uni.removeStorageSync('carPubSix');
				uni.removeStorageSync('carPubSeven');
				uni.removeStorageSync('carPubEight');
			},
			actionSheetCallback(index) {
				this.form.environmental = this.list[index].text;
			},
			showDialog(){
				this.addForm = {"paramtername":'',"paramtertext":'',"paramterunit":''};
				this.dialogShow = true
			},
			tipsConfirm(){
				this.$u.route('/pages/company/lease/step/setpQuestion/setpQuestion',{id:this.CartagId})
			},
			tipsCancel(){
				let index = 2
				if (this.carPubType === 1) {
					index = 0
				}
				this.$u.route('/pages/company/myPublish/myPublish', {index: index});
			},
			confirm(){
				if(this.addForm.paramtername === '' || this.addForm.paramtertext === '' || this.addForm.paramterunit === ''){
				   this.$u.toast('请输入新内容')
				   setTimeout(() => {
				     this.$refs.uModal.clearLoading();
					}, 100)
				  return false
				}
				this.form.elseParamterList.push(this.addForm)
				this.dialogShow = false
			}
		}
	}
</script>

<style lang="scss">
.scroll-container {height: 100%;}
page{
	// background-image: url(@/static/lease.png);
	background-size: cover;
	background-repeat: no-repeat;
	background-color:#f5f5f8 ;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
.list-cell {
	display: flex;
	box-sizing: border-box;
	width: 100%;
	padding: 10px 24rpx;
	overflow: hidden;
	color: $u-content-color;
	font-size: 14px;
	line-height: 24px;
	background-color: #fff;
}
.navbar-right {
	margin-right: 24rpx;
	display: flex;
}
.right-item {
	margin: 0 12rpx;
	position: relative;
	color: #ffffff;
	display: flex;
}
.view-content{
	margin-top: 20pt;padding: 0 10pt;
}
.form_input{
	background-color: #FFFFFF;
	border-radius: 20pt;
}
.middle-content-label{
  position: absolute;right: 10px;
}

 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>
