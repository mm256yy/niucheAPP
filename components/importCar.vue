<template>
	<view>
		<u-popup v-model="importShow" length="60%" >
			<view style="background-color: #f5f5f8;min-height: 100%;">
				<u-card :show-head="false" margin='0 0 20rpx' border-radius='0' padding='10' v-for="(item,index) in list" :key='index'>
					<view class="" slot="body">
						<view class="u-flex">
						 <image :src="item.carModelPhoto" class="card-img"></image>
						 <view class="u-line-2 card-title">
							 <view class="">
							 	{{item.carBrand}} {{item.carModel}}
							 </view>
							 <view>
							 	{{item.carxinghao}}
							 </view>
						  </view>
						</view>
						<view>
							 <u-tag :text="info" type="success" mode="dark" class="tag-style" v-for="(info,index) in item.carTag" :key='index'/>
						</view>
					</view>
					<view slot="foot" style="text-align: right;">
						<u-radio-group v-model="val" v-if="childType" active-color="#6DD99B"  @change="radioChange">
							<u-radio :name="index"></u-radio>
						</u-radio-group>
						<u-checkbox-group v-else>
							<u-checkbox  v-model="item.check" :name="item.id" active-color="#6DD99B"></u-checkbox>
						</u-checkbox-group>
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
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				checked:false,
				importShow:false,
				val:'',
				list:[],
				idList:[],
			};
		},
		props:{
			childType:{
				type:Boolean,
				default:true,
				//true 单选 fasle 多选
			},
			carPubType:{
				type:Number,
				//1 租车 2 司机招聘 3 车辆转卖
			},
		},
		computed:{
			...mapGetters(['telephone'])
		},
		mounted() {
			this.initList()
		},
		methods:{
			radioChange(name){
				let arr = [];
				arr.push(this.list[name])
				this.importShow = false
				this.$emit("handleId", arr);
			},
			initList(){
				this.$u.api.getMyCar({State:this.carPubType,telephone:this.telephone}).then(res=>{
					if(res.code === 200){
						this.list = res.object;

					}else {
						 this.$u.toast(res.message);
					}
				})
			},
			toNext(){
				let arr = [];
				this.list.forEach((item)=>{
					if (item.check){
						arr.push(item)
					}
				})
				this.$emit("handleId", arr);	
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
