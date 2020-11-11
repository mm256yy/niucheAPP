<template>
	<view>
		<u-gap height="80" bg-color="#F5F5F8"></u-gap>
		<view class="fixed-btn" style="">
		  <view class="btn-inline">
				<view class="btn-edit" @click="toNext">编辑</view>
				<view class="" >
					<u-icon size="80" style="vertical-align: middle;" :name="delSrc" @click="delSubmit"></u-icon>
				</view>
				<view @click="opened">
					{{isOpen === 0?'上架':'下架'}}
				</view>
		  </view>
		</view>
		<u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        删除成功,点击我知道了,跳转到我的发布列表
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTips:false,
				delSrc:"../../../../../static/shanchu.png",
			};

		},
		props:{
			id: {
			  type: String,
			},
			isOpen:{
				type:String,
			},
			type:{
				type:Number,
			}
		},
		mounted() {
			console.log(this.id)
			console.log(this.isOpen)
		},
		methods:{
			tipsConfirm(){
				
			},
			opened(){
				
			},
			delSubmit(){
				
			},
			toNext(){
				console.log(this.id)
				console.log(this.isOpen)
				console.log(this.type)
				if(this.type === 3){
					 uni.setStorageSync('carPubType',3);
					this.$u.route('/pages/company/lease/lease',{editId:this.id})
				}
			}
		}
	}
</script>

<style>
.fixed-btn{
	box-sizing: border-box;
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	z-index: 98;
	color: #FFFFFF;
	background: linear-gradient(115deg,#6DD99C, #37AB63);
}
.btn-inline{
	display: flex;
	justify-content:space-around ;
	 flex-direction: row;
	 font-size: 12pt;
	 line-height: 72px;
	 height: 72px;
}
</style>
