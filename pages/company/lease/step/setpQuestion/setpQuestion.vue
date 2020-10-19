<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="租车常见问题" :background="backgroundCom" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item" @click="toNext">
					<text>跳过</text>
				</view>
			</view>
		</u-navbar>
		<view class="view-content" >
		  <view style="margin-top: 20pt;font-size: 10pt;padding-left: 5pt;">
		  		*  点击文字区域进入编辑状态，修改问题或答案。      
		  </view>
		</view>
		<view class="view-content" v-for="(item,index) in form.carMobanVoList" :key='index'>
		  <view class="" style="background: #FFFFFF;padding: 10pt;">
			<u-row>
				<u-col span="2">
					<u-avatar :src="quesrc"></u-avatar>
				</u-col>
				<u-col span="9">
					<view style="word-break: break-all;" v-show="!item.show" @click="editShow(index)">{{item.CarwWenti}}</view>
					<u-input v-model="item.CarwWenti" type="textarea" :border="true"  v-show="item.show"/>
				</u-col>
				<u-col span="12" class="question-border"></u-col>
				<u-col span="2">
					<u-avatar :src="anssrc"></u-avatar>
				</u-col>
				<u-col span="9">
					<view style="word-break: break-all;" v-show="!item.show" @click="editShow(index)">{{item.Carhuida}}</view>
					<u-input v-model="item.Carhuida" type="textarea" :border="true" v-show="item.show"/>
				</u-col>
			</u-row>		
		   </view>
			<view class="" style="text-align: right;padding: 10pt 0;">
				<u-button type="success" shape='circle' size="mini" style="margin-right: 5pt;" @click="delQus(index)">删除</u-button>
			</view>
		</view>
		<u-modal v-model="dialogShow" @confirm="confirm" ref="uModal" title="添加新问题" 
		 :async-close="true" :show-cancel-button="true" confirm-text="添加" cancel-text="放弃">
			<view class="slot-content" style="padding:5pt 15pt;">
				<u-input v-model="addForm.CarwWenti" :border="true" placeholder="请输入新问题"/>
			</view>
			<view class="slot-content" style="padding:5pt 15pt;">
				<u-input v-model="addForm.Carhuida" type="textarea" maxlength='1000' :border="true" placeholder="请输入解答"/>
			</view>
		</u-modal>
		<view class="" style="height: 40pt;"></view>
		  <view class="fixed-btn">
			<view class=" btn-inline">
			<u-button type="success" class="btn-agree" style="width: 50%;" @click="addQue">添加新问题</u-button>
			<u-button type="success" class="btn-agree" style="width: 50%;" @click="toSubmit">完成</u-button>	
			</view>
		</view>

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
				addForm:{
					CarwWenti:'', Carhuida:''
				},
				form:{
					CartagId:'',
					carMobanVoList:[],
				},
				dialogShow:false,
				quesrc:'../../../../../static/que.png',
				anssrc:'../../../../../static/ans.png',
			}
		},
		mounted() {
			this.getQus()
		},
		computed:{
			...mapGetters(['carPubType'])
		},
		onLoad(option) {
			let id = option.id;
			this.form.CartagId = id;
		},
		methods: {
			getQus(){
				this.$u.api.getQuestion({}).then(res=>{
					if(res.code === 200){
						let data = res.object;
						data.forEach((item)=>{
							this.form.carMobanVoList.push({show:false,CarwWenti:item.mobanquestionname, Carhuida:item.mobandaan})
						})
					}else {
						 this.$u.toast(res.message);
					}
				})
			},
			delQus(index){
				this.form.carMobanVoList.splice(index,1)
			},
			editShow(index){
				this.form.carMobanVoList[index].show = true;
			},
			toNext(){
				let index = 2
				if (this.carPubType === 1) {
					index = 0
				}
				this.$u.route('/pages/company/myPublish/myPublish', {index: index});
			},
			addQue(){
				this.addForm = {
					CarwWenti:'',Carhuida:'',show:false
				};
				this.dialogShow = true;
			},
			confirm(){
				if(this.addForm.CarwWenti === '' || this.addForm.Carhuida === ''){
				   this.$u.toast('请输入新内容')
				   setTimeout(() => {
				     this.$refs.uModal.clearLoading();
					}, 100)
				  return false
				}
				if (this.form.carMobanVoList.length>20){
					this.$u.toast('添加问题超过上限');
					return
				}
				this.form.carMobanVoList.push(this.addForm)
				this.dialogShow = false
			},
			toSubmit(){
				this.$u.api.saveAnswer(this.form).then(res=>{
					if(res.code === 200){
						this.toNext()
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
.question-border{
	margin: 5pt 0;
	border-bottom: 1px solid #E5E5E5;
}
.view-content{
	margin-top: 20pt;padding: 0 10pt;
}
.fixed-btn{
     box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 998;
}
.btn-inline{
	display: flex;
	justify-content: center;
	 flex-direction: row;
	// width: 40%;
}
 .btn-agree{
	 width: 50%;
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>
