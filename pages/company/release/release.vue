<template>
	<view>
		<u-navbar back-text="返回"  back-icon-size="0" title="" :background="{}" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="content" style="text-align: center;padding: 40pt;">
			<view class="" style="font-size: 18pt;color: #fff;">
				您要发布什么信息？
			</view>
			<view class="" style="padding: 30pt 0;">
				<view class="zlzl">
					<u-row>
						<u-col span="2"></u-col>
						<u-col span="3" @click="toPage(1)">
							<u-avatar :src="zcxxsrc" mode='square' size="50" class='vermiddle'></u-avatar>
							<text class="border-dotted"></text>
						</u-col>
						<u-col span="4" @click="toPage(1)" class="fontbold">车辆租赁</u-col>
					</u-row>	
				</view>
				<view class="zlzl">
					<u-row>
						<u-col span="2"></u-col>
						<u-col span="3" @click="toPage(2)">
							<u-avatar :src="zlzmsrc" mode='square' size="50" class='vermiddle'></u-avatar>
							<text class="border-dotted"></text>
						</u-col>
						<u-col span="7" @click="toPage(2)" class="fontbold">司机招募</u-col>
					</u-row>
				</view>
				<view class="zlzl" >
					<u-row>
						<u-col span="2"></u-col>
						<u-col span="3" @click="toPage(3)">
							<u-avatar :src="qgxxsrc" mode='square' size="50" class='vermiddle'></u-avatar>
							<text class="border-dotted"></text>
						</u-col>
						<u-col span="7" @click="toPage(3)" class="fontbold">车辆转卖</u-col>
					</u-row>
					
				</view>
				<view class="zlzl">
					<u-row >
						<u-col span="2"></u-col>
						<u-col span="3" @click="toPage(4)">
							<u-avatar :src="zpxxsrc" mode='square' size="50" class='vermiddle'></u-avatar>
							<text class="border-dotted"></text>
						</u-col>
						<u-col span="7" class="fontbold" @click="toPage(4)">购车需求</u-col>
					</u-row>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				 backTextStyle:{
				 	'color':'#ffffff'
				 },
				 src: 'https://cdn.uviewui.com/uview/example/fade.jpg',
				 zcxxsrc:'../../../static/sign104@2x.png',
				 zlzmsrc:'../../../static/iconfontzhizuobiaozhun023120@2x.png',
				 qgxxsrc:'../../../static/xuqiuguanli@2x.png',
				 zpxxsrc:'../../../static/chezhuzhaomu@2x.png',
				 linesrc:'../../../static/juxing4@2x.png'
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
				  this.CARPUBTYPE(1)
				   this.$u.route('/pages/company/lease/lease')
				} else if(type === 2){
					this.$u.route('/pages/company/recruit/recruit')
				}else if(type === 3){
					this.CARPUBTYPE(3)
					this.$u.route('/pages/company/lease/lease')
				}else{
					this.$u.route('/pages/company/demand/demand')
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
	background-image: url(@/static/release1x.png);
	background-position: 50% 20%;
	background-repeat: no-repeat;
	height: 100%;
}
</style>
