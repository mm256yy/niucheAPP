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
		<view class="view-content" v-for="(item,index) in list" :key='index'>
		  <view class="" style="background: #FFFFFF;padding: 10pt;">
			<u-row>
				<u-col span="2">
					<u-avatar src="@/static/chezhuzhaomu@2x.png"></u-avatar>
				</u-col>
				<u-col span="9">
					<view style="word-break: break-all;" v-show="!item.show" @click="editShow(index)">{{item.qus}}</view>
					<u-input v-model="item.qus" type="textarea" :border="true"  v-show="item.show"/>
				</u-col>
				<u-col span="12" class="question-border"></u-col>
				<u-col span="2">
					<u-avatar src="@/static/chezhuzhaomu@2x.png"></u-avatar>
				</u-col>
				<u-col span="9">
					<view style="word-break: break-all;" v-show="!item.show" @click="editShow(index)">{{item.ans}}</view>
					<u-input v-model="item.ans" type="textarea" :border="true" v-show="item.show"/>
				</u-col>
			</u-row>		
		   </view>
			<view class="" style="text-align: right;padding: 10pt 0;">
				<u-button type="success" shape='circle' size="mini" style="margin-right: 5pt;" @click="toNext">删除</u-button>
			</view>
		</view>
		<view class="" style="height: 40pt;"></view>
		<view class="fixed-btn">
			<u-button type="success" class="btn-agree btn-inline" @click="toNext">添加新问题</u-button>
			<u-button type="success" class="btn-agree btn-inline" @click="toNext">完成</u-button>
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
				list:[
					{qus:'1111111',ans:'222222',show:false},{qus:'3+3',ans:'222222',show:false},{qus:'4+5',ans:'7777777777777',show:false},
					{qus:'4+5',ans:'7777777777777',show:false},
					{qus:'4+5',ans:'7777777777777',show:false},
					{qus:'4+5',ans:'7777777777777',show:false},
					{qus:'4+5',ans:'7777777777777',show:false},
					{qus:'4+5',ans:'7777777777777',show:false},
				],
				zpxxsrc:'@/static/chezhuzhaomu@2x.png',
				value:'111111111'
			}
		},
		methods: {
			editShow(index){
				this.list[index].show = true;
			},
			toNext(){
				this.$u.route("/pages/company/lease/step/stepCards/stepCards")
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
.question-border{
	margin: 5pt 0;
	border-bottom: 1px solid #E5E5E5;
}
.view-content{
	margin-top: 20pt;padding: 0 10pt;
}
.fixed-btn{
	position: fixed;
	bottom: 0;
	width: 100%;
	z-index: 10;
}
.btn-inline{
	display: inline-block;
	width: 50%;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>
