<template>
	<view>
		<u-navbar back-icon-color="#111111" title="验车单(2/2)" :background="background" title-color="#111111"></u-navbar>
		<view>
			<view style="background: #F5F5F5;padding: 20rpx 30rpx 30rpx;">
				<view class="head_tips">
					提示：为保障您的合法权益，务必按要求上传车辆信息，车辆信息上传后将锁定到《汽车租赁合同》中。
				</view>
				<view class="title">车况详细登记</view>
			</view>
			<view class="collapse_content">
				<view class="header">
					<view class="label">一、外观漆面和碰撞登记</view>
					<view>1111</view>
				</view>
				<view class="content">
					<view class="collapse-item" v-for="(item,index) in form.oneList">
						<view>{{item.name}}</view>
						<CarTags :list="item.list" :forIndex="index" :active="item.value" @onClick="oneListChange"></CarTags>
						<u-upload :custom-btn="true" :action="action" :index="index" @on-success="uploadChange" upload-text="" :file-list="item.photo"
						 class="upload" v-if="item.flag">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<u-icon name="plus" size="60" color="#000000"></u-icon>
							</view>
						</u-upload>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import CarTags from './btnTags.vue'
	import {
		checkCarObj,
		action
	} from '@/utils/constant.js'
	export default {
		components: {
			CarTags
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				action: action,
				form: {
					oneList: [{
							name: '1.前保险杠',
							value: 10,
							text: '',
							photo: [],
							flag: false,
							list: checkCarObj.bumperList
						},
						{
							name: '2.发动机盖',
							value: 10,
							text: '',
							photo: [],
							flag: false,
							list: checkCarObj.bumperList
						},
						{
							name: '3.右前翼子板',
							value: 10,
							text: '',
							photo: [],
							flag: false,
							list: checkCarObj.bumperList
						},
						{
							name: '4.右侧前门',
							value: 10,
							text: '',
							photo: [],
							flag: false,
							list: checkCarObj.bumperList
						}
					]
				}
			}
		},
		methods: {
			oneListChange(obj) {
				let forIndex = obj.index;
				if (obj.value === this.form.oneList[forIndex].value) {
					this.form.oneList[forIndex].value = 100
				} else {
					this.form.oneList[forIndex].value = obj.value;
					this.form.oneList[forIndex].text = obj.text;
				}
				if (obj.value !== 0) {
					this.form.oneList[forIndex].flag = true
				} else {
					this.form.oneList[forIndex].flag = false
				}
			},
			uploadChange(data, index, lists, name) {
				console.log(name)
				// this.form[name].push(data.object);
				this.$u.toast(data.msg);
			},
			saveSubmit() {
				let obj = {
					oneList: []
				}
				let arr1 = this.form.oneList;
				arr1.forEach(item => {
					obj.oneList.push({
						name: item.name,
						text: item.text,
						photo: item.photo
					})
				})
				console.log(this.form)
				console.log(JSON.stringify(obj))
			}
		}
	}
</script>

<style lang="scss" scoped>
	.head_tips {
		padding: 16rpx 30rpx;
		background: #FFFFFF;
		color: #666666;
		font-size: 26rpx;
		box-shadow: 0px 0px 0px 0px #DEDEDE;
		border-radius: 12rpx;
	}

	.title {
		color: #111111;
		font-size: 36rpx;
		font-weight: 700;
		padding: 20rpx 0 0;
	}
	.collapse_content{
		padding: 20rpx 20rpx;
		.header{
			display: flex;justify-content: space-between;
		}
	}
</style>
