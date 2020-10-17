<template>
	<view>
		<u-popup v-model="importShow" length="60%" >
			<view style="background-color: #f5f5f8;min-height: 100%;">
				<u-card :show-head="false" margin='0 0 20rpx' border-radius='0' padding='10' v-for="(item,index) in list" :key='index'>
					<view class="" slot="body">
						<view class="u-flex">
						 <image :src="item.tupian" class="card-img"></image>
						 <view class="u-line-2 card-title">
							 <view class="">
							 	{{item.pingpai}}
							 </view>
							 <view>
							 	{{item.peizhi}}
							 </view>
						  </view>
						</view>
						<view>
							 <u-tag :text="info.text" type="success" mode="dark" class="tag-style" v-for="(info,index) in item.biaoqian" :key='index'/>
						</view>
					</view>
					<view slot="foot" style="text-align: right;">
						<u-radio-group v-model="val" v-if="childType" active-color="#6DD99B" @change="radioChange">
							<u-radio :name="item.id"></u-radio>
						</u-radio-group>
						<u-checkbox v-else v-model="checked" @change="boxChange" :name="item.id" active-color="#6DD99B"></u-checkbox>
					</view>
				</u-card>
				<view class="fixed-btn" v-if="!childType">
					<view class=" btn-inline">
					 <u-button type="success" class="btn-agree" style="width: 100%;" @click="toNext">选择完成</u-button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:false,
				importShow:false,
				val:'abs',
				list:[{id:1,pingpai:'吉利帝豪GL',peizhi:'吉利帝豪GL 1.5L CVT运动版吉利帝豪GL',biaoqian:[{text:'在售'}],tupian:'https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg'},],
				idList:[],
			};
		},
		props:{
			childType:{
				type:Boolean,
				default:true
			}
		},
		mounted() {
			console.log(this.childType)
		},
		methods:{
			radioChange(name){
				this.importShow = false
				this.$emit("handleId", name);
			},
			boxChange(e){
			   this.idList = e;
			},
			toNext(){
				this.$emit("handleId", this.idList);	
				
			}
		}
	}
</script>

<style lang="scss" scoped>
.card-img{
	width: 120rpx;
	flex: 0 0 120rpx;
	height: 120rpx;
}
.card-title{
	font-size: 12pt;
	color: #333;
	padding-left: 5pt;
	position: relative;
	.iconAbs{
	    position: absolute;
	    right: 0;
	    bottom: 0;	
	}
}
.tag-style{
	margin: 8pt 8pt 0 0;
}
.fixed-btn{
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 98;
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>
