<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="车辆参数" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item" @click="toNext">
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
				<u-form-item label="长*宽*高" prop="name"><u-input v-model="form.name" :clearable="false" :border="true" class="form_input"/><text class="middle-content-label">mm</text></u-form-item>
				<u-form-item label="行李箱容积" prop="name"><u-input v-model="form.name" :clearable="false"  maxlength="30" :border="true" class="form_input"/><text class="middle-content-label">L</text></u-form-item>
				<u-form-item label="轴距" prop="name"><u-input v-model="form.name" type="number" :clearable="false" maxlength="30" :border="true" class="form_input"/><text class="middle-content-label">mm</text></u-form-item>
				<u-form-item label="排量" prop="name"><u-input v-model="form.name" type="number" :clearable="false" maxlength="30" :border="true" class="form_input"/><text class="middle-content-label">L</text></u-form-item>
			    <u-form-item label="环 保 标 准 " prop="name">
			    	<u-input v-model="form.name" class="form_input" type="select" :border="true" placeholder="请选择" @click="show = true" />
			    	<u-action-sheet :list="list" v-model="show" @click="actionSheetCallback"></u-action-sheet>
			    </u-form-item>
			</u-form>
		  </view>
		</view>
		<view @click="showDialog" style="padding: 20pt;">
			<u-icon name="plus-circle-fill" color="#6DD99B" size="40"></u-icon><text style="vertical-align: top;">添加其他参数</text>
		</view>
		<view class="view-content" v-show="otherList.length>0">
		  <view style="margin-top: 20pt;font-size: 14pt;padding-left: 5pt;">
		  	<view class="">
		  		其他参数
		  	</view>
			<u-form-item :label="item.label" prop="name" label-width="180" v-for="(item,index) in otherList" :key='index'>
				<u-input v-model="item.model" type="number" :clearable="false" maxlength="30" :border="true" class="form_input"/>
				<text class="middle-content-label">{{item.text}}</text>
			</u-form-item>
		  </view>
		</view>
		<u-modal v-model="dialogShow" @confirm="confirm" ref="uModal" title="其他参数" :async-close="true" :show-cancel-button="true" confirm-text="添加" cancel-text="放弃">
			<view class="slot-content" style="padding:5pt 15pt;">
				<u-input v-model="addForm.label" :border="true" placeholder="请输入参数名称"/>
			</view>
			<view class="slot-content" style="padding:5pt 15pt;">
				<u-input v-model="addForm.model" :border="true" placeholder="请输入参数内容"/>
			</view>
			<view class="slot-content" style="padding:5pt 15pt;">
				<u-input v-model="addForm.text" :border="true" placeholder="请输入参数单位"/>
			</view>
		</u-modal>
				<u-row>
					<u-col span="6">
						<u-button type="success" class="btn-agree" @click="toNext">预览</u-button>
					</u-col><u-col span="6">
						<u-button type="success" class="btn-agree" @click="toNext">提交审核</u-button>
					</u-col>
				</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				form:{
					name:''
				},
				show:false,
				dialogShow:false,
				addForm:{
					label:'',
					model:'',
					text:''
				},
				otherList:[],
                list:[
					{value: '1',text: '国4'},{value: '2',text: '国5'},{value: '3',text: '国6'},{value: '4',text: '其他'},
				]
			}
		},
		methods: {
			actionSheetCallback(index) {
				this.form.name = this.list[index].text;
			},
			showDialog(){
				this.addForm = {label:'',model:'',text:''};
				this.dialogShow = true
			},
			confirm(){
				if(this.addForm === ''){
				   this.$u.toast('请输入新内容')
				   setTimeout(() => {
				  this.$refs.uModal.clearLoading();
					}, 100)
				  return false
				}
				this.otherList.push(this.addForm)
				this.dialogShow = false
			},
			toNext(){
				// this.$u.route("/pages/company/lease/step/stepCards/stepCards")
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
