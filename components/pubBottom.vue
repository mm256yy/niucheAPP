<template>
	<view>
		<!-- <u-gap height="80" bg-color="#F5F5F8"></u-gap> -->
		<view class="fixed-btn" style="">
		  <view class="btn-inline">
				<view class="btn-edit" @click="toNext">编辑</view>
				<view class="" >
					<u-icon size="80" style="vertical-align: middle;" :name="delSrc" @click="delTips=true"></u-icon>
				</view>
				<view @click="opened">
					{{isopen == 0?'上架':'下架'}}
				</view>
		  </view>
		</view>
		<u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        处理成功,点击我知道了,跳转到我的发布列表
			</view>
		</u-modal>
		<u-modal v-model="delTips" title="提示" :show-cancel-button="true" @confirm="delConfirm">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
		        确认要删除吗?
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showTips:false,
				delTips:false,
				delSrc:"/static/shanchu.png",
			};

		},
		props:{
			id: {
			  type: String,
			},
			isopen:{
				// type:String,
			},
			type:{
				type:Number,
			},
			editId:{
				 type: String,
			}
			
		},
		methods:{
			tipsConfirm(){
				this.$u.route('/pages/company/myPublish/myPublish', {
					index: this.type-1,
				});
			},
			delConfirm(){
				this.$u.api.MyIssueDelete({BusinessState:this.type,id:this.id}).then(res=>{
					if(res.code === 200){
						 this.showTips = true;
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			opened(){
				let isopen = this.isopen == 0 ?1:0;
				this.$u.api.MyIssueHighLowLimit({BusinessState:this.type,id:this.id,isopen:isopen}).then(res=>{
					if(res.code === 200){
						 this.showTips = true;
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			toNext(){
				let type = this.type;
				if(type === 1){
					 uni.setStorageSync('carPubType',type);
					 this.$u.route('/pages/company/lease/lease',{editId:this.id})
				}else if(type ===3){
					  uni.setStorageSync('carPubType',type);
					  this.$u.route('/pages/company/lease/lease',{editId:this.editId})
				} else if(type ===4){
					 uni.setStorageSync('carPubType',4);
					  this.$u.route('/pages/company/demand/demand',{AskToShopId :this.id})
				} else {
					uni.setStorageSync('carPubType',2);
					this.$u.route('/pages/company/recruit/recruit',{editId:this.id})
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
