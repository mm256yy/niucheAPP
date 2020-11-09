<template>
	<view class="release">
		<u-navbar back-text="返回"  back-icon-size="0" title="" :background="{}" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="publish">
			<view class="message">
				您要发布什么信息？
			</view>
		</view>
		<view class="content">
			<view class="box" @click="toPage(1)">
				<u-image class="img" width="70rpx" height="70rpx" src="@/static/carRent.png"></u-image>
				<text class="text">租车</text>
			</view>
			<view class="box" @click="toPage(2)">
				<u-image class="img" width="70rpx" height="70rpx" src="@/static/qiuzhi.png"></u-image>
				<text class="text">求职</text>
			</view>
		</view>
		<NotLogin></NotLogin>
	</view>
</template>

<script>
	import {mapActions} from 'vuex'
	import NotLogin from '@/components/notlogin/notlogin.vue'
	export default {
		components:{
			NotLogin
		},
		data() {
			return {
				 backTextStyle:{
				 	'color':'#ffffff'
				 }
			}
		},
		mounted() {
			this.setDay()
		},
		methods: {
			...mapActions(['CARPUBTYPE','TODAY']),
			setDay(){
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDate();
				let obj = {year:year,month:month,day:day};
				this.TODAY(obj)
			},
			toPage(type){
				if(type ===1 ){
				   this.$u.route('/pages/driver/release/carRent')
				} else if(type === 2){
					this.$u.route('/pages/driver/release/search')
				}
			}
		}
	}
</script>

<style lang="scss">
	/deep/ .u-border-bottom:after{
		border-bottom-width:0;
	}
	.zlzl{
		background-image: url(../../../static/releasebg.png);
		background-position: center;
		background-repeat: no-repeat;
		height: 50pt;
		line-height: 50pt;
		font-size: 12pt;
		color: #3C9D87;
		background-size: contain;
		margin-bottom: 20pt;
	}
	.vermiddle{
		vertical-align: middle;
	}
	.fontbold{
		font-weight: bold;
	}
	.border-dotted{
		padding-left: 12pt;
		border-right: 2px dotted;
	}
// 	.title{
// 		   position: absolute;
// 		   font-size: 14pt;
// 		   color: #fff;
// 		    top: 40pt;
// 		    left: 20pt;
// 		    z-index: 2;
// 	}
// .content{
// 	position: absolute;
// 	top: 0;
// 	left: 0;
// 	right: 0;
// 	bottom: 0;
// 	z-index: 1;
// 	background-image: url(../../../static/release1x.png);
// 	background-position: 10% 20%;
// 	background-repeat: no-repeat;
// 	text-align: center;
// }
page{
	height: 100%;
	background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
}
.release {
	height: 100%;
	.publish {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		.message {
			width: 326rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 900;
			color: #fff;
			margin-bottom: 114rpx;
			margin-top: 260rpx;
		}
	}
	.content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	.box {
		width: 326rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		border-radius: 60rpx;
		background: #fff;
		font-size: 36rpx;
		color: #FF6501;
		margin-bottom: 41rpx;
		.img {
			float: left;
			margin-top: 12rpx;
			margin-left: 12rpx;
		}
		.text {
			letter-spacing: 30rpx;
		}
	}
}
</style>
