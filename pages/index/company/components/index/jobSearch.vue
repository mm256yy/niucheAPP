<template>
	<view class="jobSearch">
		<view class="middle-content">
			<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
				<u-form-item style="width:180rpx;margin-left:40rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="选择驾龄" @click="show = true" v-model="form.driverAgeKey" type="select" /></u-form-item>
				<view class="line"></view>
				<u-form-item style="width:180rpx;margin-left:60rpx;margin-top: -18rpx;float: left;" label=""><u-input placeholder-style="color:#000;" placeholder="业务类型" @click="showType = true" v-model="form.typeBusinessKey" type="select" /></u-form-item>
			</u-form>
			<view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view>
			<view class="clear"></view>
			<u-select v-model="show" mode="single-column" :list="select" @confirm="confirm"></u-select>
			<u-select v-model="showType" mode="single-column" :list="selectType" @confirm="confirmType"></u-select>
		</view>
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<view class="list" v-for="(item, index) in list" :key="index" @click="detail(item.driverDemandId)">
			<u-image class="left" width="190rpx" height="190rpx" src="https://cdn.uviewui.com/uview/example/fade.jpg"></u-image>
			<view class="right">
				<view class="time">刷新时间：{{item.updateTimeStr}}</view>
				<view class="clear"></view>
				<view class="name">{{item.drivername}}</view>
				<view class="year">驾龄{{item.driverAgeTag}}年</view>
				<view v-show="item.onlinecarcardis == 0" class="type">未认证</view>
				<view v-show="item.onlinecarcardis == 1"  class="type">网约车认证</view>
				<view v-show="item.onlinecarcardis == 2"  class="type">出租车认证</view>
				<view class="clear"></view>
				<!-- <u-image class="img" width="20rpx" height="19rpx" src="@/static/distance.png"></u-image> -->
				<view class="car u-line-1"">求职意向：{{item.carCard}}</view>
				<u-image class="chat" width="38rpx" height="32rpx" src="@/static/chat.png"></u-image>
			</view>
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
				  driverAge: '',
				  businessType: 0,
				  type: 2
				},
				driverAgeKey: '',
				businessTypeKey: '',
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				total: 0,
				select: [
					{
						label: '3年及以上',
						value: '3'
					},
					{
						label: '不限',
						value: '0'
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
						value: '0'
					}
				],
				list: []
			}
		},
		mounted() {
			this.search()	
		},
		methods: {
		    getList(){
		        const params = Object.assign(this.form, {
		        	pageNum: this.pagination.pageNum + 1,
		        	pageSize: 10,
					condition: this.form.driverAge ? 2:''
		        });
		    		this.$u.api.askWork(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    				 this.total= res.total;
							 this.list.forEach(item=>{
							    if (item.carCard){
							 		item.carCard = item.carCard.split(',').join('/')
							 	}
								if (item.updateTime){
									item.updateTimeStr = this.timeZ(item.updateTime)
								}
							 })
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    search(){
		        const params = Object.assign(this.form, {
		    		pageNum: 1,
		    		pageSize: 10,
					condition: this.form.driverAge ? 2:'',
					orderByColumn: 'a.updateTime',
					isAsc: 'desc'
		    	});
		    		this.$u.api.askWork(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    				 this.total= res.total;
							 this.list.forEach(item=>{
							    if (item.carCard){
							 		item.carCard = item.carCard.split(',').join('/')
							 	}
								if (item.updateTime){
									item.updateTimeStr = this.timeZ(item.updateTime)
								}
							 })					
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
			timeZ(value){
				let nowTime = new Date().getTime();
				let oneDay= 86400000;
				let timeDiff = nowTime-value;//时间差
				let tian =parseInt(timeDiff/oneDay);
				let day6 = oneDay*6;
				if(timeDiff>day6){
					return this.$u.timeFormat(value, 'yyyy-mm-dd');
				} else if (timeDiff>oneDay && timeDiff < day6){
					return tian+"天前"
				} else if (timeDiff<oneDay){
					return '刚刚'
				} else {
					console.log(timeDiff)
				 }
			},
		    confirm(arr){
		    	this.form.driverAge = arr[0].value;
		    	this.driverAgeKey = arr[0].label;
		    },
		    confirmType(arr){
		    	this.form.businessType = arr[0].value;
		    	this.businessTypeKey = arr[0].label;
		    },
			detail(id) {
				this.$u.route("/pages/index/company/components/index/jobSearchDetail",{id:id})
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
			margin-top: 10rpx;
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
			margin-top: 10rpx;
		}
		.list .right {
			.car {
				width: 365rpx;
				color: #7f7f7f;
				font-size: 20rpx;
				margin-top: 18rpx;
				overflow: hidden;
				text-overflow:ellipsis; 
				white-space: nowrap;
		    }
		}
		.list .right .chat {
			float: right;
			margin-top: 10rpx;
		}
	}
</style>
