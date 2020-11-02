<template>
	<view class="jobSearch">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item style="width:180rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="选择驾龄" @click="show = true" v-model="form.ageDriver" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:180rpx;margin-left:60rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="业务类型" @click="showType = true" v-model="form.typeBusiness" type="select" /></u-form-item>
			</u-form>
			<view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select v-model="showType" mode="single-column" :list="selectType" @confirm="confirmType"></u-select>
		</view>
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<view class="list" @click="detail()">
			<u-image class="left" width="190rpx" height="190rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="time">刷新时间：刚刚</view>
				<view class="clear"></view>
				<view class="name">{{list.drivername}}</view>
				<view class="year">{{list.driverAgeTag}}</view>
				<view class="type">{{list.onlinecarcardis}}||{{list.onlinecarcardis}}</view>
				<view class="clear"></view>
				<view class="car">求职意向：{{list.jobintention}}</view>
				<u-image class="chat" width="38rpx" height="32rpx" src="@/static/chat.png"></u-image>
			</view>
		</view>
		<view class="list" @click="detail()">
			<u-image class="left" width="190rpx" height="190rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="time">刷新时间：刚刚</view>
				<view class="clear"></view>
				<view class="name">X司机</view>
				<view class="year">驾龄4年</view>
				<view class="type">网约车认证</view>
				<view class="clear"></view>
				<view class="car">求职意向：月薪5000\有保底\无责</view>
				<u-image class="chat" width="38rpx" height="32rpx" src="@/static/chat.png"></u-image>
			</view>
		</view>
		<view class="list">
			<u-image class="left" width="190rpx" height="190rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="time">刷新时间：刚刚</view>
				<view class="clear"></view>
				<view class="name">X司机</view>
				<view class="year">驾龄4年</view>
				<view class="type">网约车认证</view>
				<view class="clear"></view>
				<view class="car">求职意向：月薪5000\有保底\无责</view>
				<u-image class="chat" width="38rpx" height="32rpx" src="@/static/chat.png"></u-image>
			</view>
			<view class="clear"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				showType:false,
				// list: [{
				// 						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
				// 						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
				// 					},
				// 					{
				// 						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
				// 						title: '身无彩凤双飞翼，心有灵犀一点通'
				// 					},
				// 					{
				// 						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
				// 						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
				// 					}
				// 				],
				form: {
				  driverage: '',
				  businesstype: '',
				  isrentAndAskWork: 2
				},
				pagination: {
				  pageNum: 0, 
				  pageSize: 10
				},
				total: 0,
				select: [
					{
						label: '3年及以上',
						value: '1'
					},
					{
						label: '不限',
						value: '2'
					}
				],
				selectType: [
					{
						label: '网约车',
						value: '1'
					},
					{
						label: '出租车',
						value: '2'
					},
					{
						label: '不限',
						value: '3'
					}
				],
				list: [],
				obj: {}
			}
		},
		mounted() {
			this.search()	
		},
		methods: {
		    getList(){
		        const params = Object.assign(this.form, {
		        	pageIndex: this.pagination.pageNum + 1,
		        	pageSize: 10
		        });
		    		this.$u.api.askWork(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    				 this.total= res.total;
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    search(){
		        const params = Object.assign(this.form, {
		    		pageNum: 0,
		    		pageSize: 10
		    	});
		    		this.$u.api.askWork(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    				 this.total= res.total;
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    confirm(arr){
		    	this.form.driverage = arr[0].label;
		    },
		    confirmType(arr){
		    	this.form.businesstype = arr[0].label;
		    },
			detail() {
				this.$u.route("/pages/index/company/components/index/jobSearchDetail")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.jobSearch {
		.wrap {
			padding: 40rpx;
		}
		.middle-content .u-form {
			width: 621rpx;
			height: 71rpx;
			border-radius: 40rpx 0 0 40rpx;
			margin-left: 39rpx;
			background-color: #CDE5E3;
			margin-top: 30rpx;
			float: left;
		}
		.icon {
			width: 51rpx;
			height: 71rpx;
			line-height: 71rpx;
			text-align: center;
			border-radius: 0 0 20rpx 0;
			background: linear-gradient(115deg, #37AB63, #6DD99C);
			float: left;
			margin-top: 30rpx;
		}
		.line {
			width: 1rpx;
			height: 27rpx;
			margin-top: 22rpx;
			float: left;
			margin-left: 60rpx;
			background: rgba(0,0,0,0.2);
		}
		.clear {
			clear: both;
		}
		.list {
			width: 702rpx;
			height: 281rpx;
			margin-left: 24rpx;
			margin-top: 24rpx;
			background-image: url(@/static/bgjobsearch.png);
			background-repeat: no-repeat;
			background-size: cover;
		}
		.list .left {
			float: left;
			margin-left: 49rpx;
			margin-top: 42rpx;
		}
		.list .right {
			width: 460rpx;
			padding: 0 36rpx;
			float: left;
		}
		.list .right .name {
			font-weight: 900;
			font-size: 28rpx;
		}
		.list .right .time {
			font-size: 16rpx;
			float: right;
			margin-top: 39rpx;
		}
		.list .right .year {
			width: 130rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			border-radius: 12rpx;
			background: #37AB63;
			font-size: 10rpx;
			color: #fff;
			float: left;
			margin-top: 6rpx;
		}
		.list .right .type {
			margin-left: 8rpx;
			width: 160rpx;
			height: 30rpx;
			line-height: 30rpx;
			text-align: center;
			border-radius: 12rpx;
			background: #37AB63;
			font-size: 10rpx;
			color: #fff;
			float: left;
			margin-top: 6rpx;
		}
		.list .right .car {
			color: #7f7f7f;
			font-size: 20rpx;
			margin-top: 18rpx;
		}
		.list .right .chat {
			float: right;
			margin-top: 10rpx;
		}
	}
</style>
