<template>
	<view>
		<!-- <u-navbar back-text="" back-icon-color="#333333" title="聊天记录" :background="background" title-color="#333333"></u-navbar> -->
<!-- 		<view class="user-box">
			<view class="nav-tab">
				<view :class="isActive ==0 ?'tab-item-active tab-item': 'tab-item'" @click="changeTabBtn(0)">聊天记录</view>
				<view :class="isActive ==1 ?'tab-item-active tab-item1': 'tab-item1'" @click="changeTabBtn(1)">好友列表</view>
				<view class="out-login" @click="outLoginBtn()"> 注 销</view>
				<view class="clear-box"></view>
			</view>
		</view> -->
		<!-- 聊天记录 会话列表 -->
		<view class="conversition-box" v-if="isActive ==0">
			<view class="list-box" v-if="userAddConversationList.length>0">
				<view class="item-box" v-for="(item,index) in userAddConversationList" :key="index" @click="toRoom(item)">
					<view class="item-img">
						<img :src="item.conversation.userProfile.avatar" alt="">
					</view>
					<view class="item-text">
						<view class="item-user">
							{{item.conversation.userProfile.nick}}
						</view>
						<view class="item-text-info">
							<rich-text :nodes="nodesFliter(item.conversation.lastMessage.messageForShow)"></rich-text>
						</view>
					</view>
					<view class="item-msg">
						<view class="item-msg-icon" v-if="item.conversation.unreadCount">{{item.conversation.unreadCount}}</view>
					</view>
				</view>
			</view>
			<view class="list-box" v-else>
				<span class="msg-box">暂无聊天记录</span>
			</view>
		</view>
		<!-- 好友列表 -->
		<!-- <view class="user-box" v-if="isActive ==1">
			<view class="list-box">
				<view class="user-item-box" v-for="(item,index) in friendList" :key="index" @click="checkUserToRoom(item)">
					<view class="user-img">
						<image :src="item.img" alt=""></image>
					</view>
					<view class="user-name">
						{{item.user}}
					</view>
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex";
	export default {
		name: 'record',
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				// conversationList: [],
				friendList:[],
				isActive: 0, //默认聊天记录
				userAddConversationList:[]
			}
		},
		computed: {
			...mapState({
				isLogin: state => state.isLogin,
				isSDKReady: state => state.isSDKReady,
				conversationList: state => state.conversationList,
			})
		},
		watch: {
			isSDKReady(val) {
				//isSDKReady == true 请求会话列表
				if (val) {
					this.getConversationList()
				}
			},
			conversationList(val){
				this.getUserInfo(val)
			}

		},
		methods: {
			//注销登录
			outLoginBtn(){
				let promise = this.tim.logout();
				promise.then(res=> {
					this.$store.commit('reset')
					this.$u.route({url:'/pages/init/init',type:'switchTab'})
				}).catch(err=> {
				   console.log('退出失败')
				});
			},
			//聊天的节点加上外层的div
			nodesFliter(str){
				let nodeStr = '<div style="align-items: center;word-wrap:break-word;">'+str+'</div>' 
				return nodeStr
			},
			//切换tab
			changeTabBtn(_index) {
				this.isActive = _index
				if (this.isSDKReady) {
					this.getConversationList()
				}
			},
			//获取消息列表
			getConversationList() {
				// 拉取会话列表
				let promise = this.tim.getConversationList();
				promise.then((res) => {
					console.log(res,'返回回话列表')
					let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
					if (conversationList.length) {
						//将返回的会话列表拼接上 用户的基本资料  
						//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
						console.log(conversationList)
						this.$store.commit("updateConversationList", conversationList);
					}

				}).catch((err) => {
					console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
				});
			},
			//根据消息列表请求聊天对象的用户信息 并完成数据拼接
			getUserInfo(conversationList) {
				 this.userAddConversationList = []
				conversationList.forEach(item => {
					if (item.type != "@TIM#SYSTEM"){
					let obj = {}
					obj.conversation = item;
					// userList.forEach(item1 => {
					// 	if (item.toAccount == item1.userId) {
					// 		obj.user = item1
					// 	}
					// })
					this.userAddConversationList.push(JSON.parse(JSON.stringify(obj)))
					} 
				})
			},
			toRoom(item) {
				this.$store.commit('updateConversationActive', item)
				uni.navigateTo({
					url: './room'
				})
			},
			//选择用户聊天
			// checkUserToRoom(toUserInfo) {
			// 	this.$store.commit('createConversationActive', toUserInfo.userId)
			// 	uni.navigateTo({
			// 		url: './room'
			// 	})
			// }

		},
		onShow() {
			if (this.isSDKReady) {
				console.log('2222')
				this.getConversationList()
			}else{
				console.log('sdk未准备好')
			}
		},
		onLoad(){
			let userInfo = JSON.parse(uni.getStorageSync('userInfo'))
			this.friendList = []
			// userList.forEach(item=>{
			// 	if(item.userId != userInfo.userId){
			// 		this.friendList.push(item)
			// 	}
			// })
			
		}
	}
</script>

<style scoped lange="scss">
	.list-box {
		width: 94%;
		margin: 40rpx auto;
	}

	.item-box {
		width: auto;
		height: 130rpx;
		padding: 20rpx;
		overflow: hidden;
		border-bottom: 1px solid #eee;
	}

	.item-img {
		float: left;
		margin-top: 20rpx;
		width: 80rpx;
		height: 80rpx;
	}

	.item-img img {
		width: 80rpx;
		height: 80rpx;
	}

	.item-text {
		float: left;
		margin-left: 30rpx;
		width: 500rpx;
		height: 100rpx;
		color: #666;
		font-size: 28rpx;
	}

	.item-user {
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		color: 333;
		font-size: 32rpx;

	}

	.item-text-info {
		width: auto;
		height: 60rpx;
		line-height: 60rpx;
		color: #666;
		font-szie: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.user-box {
		width: auto;
		height: 80rpx;
		padding: 0 20rpx;
	}

	.nav-tab {
		padding-top: 20rpx;
		background: #fff;
		height: 80rpx;

	}

	.tab-item {
		float: left;
		height: 70rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #666;
		font-size: 28rpx;
		border: 1px solid #F56C6C;
		border-top-left-radius: 25rpx;
		border-bottom-left-radius: 25rpx;
	}

	.tab-item1 {
		float: left;
		height: 70rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #666;
		font-size: 28rpx;
		border: 1px solid #F56C6C;
		border-top-right-radius: 25rpx;
		border-bottom-right-radius: 25rpx;
	}

	.tab-item-active {
		color: #fff;
		background: #F56C6C;
	}

	.msg-box {
		line-height: 30rpx;
		font-size: 28rpx;
		color: #666;
	}

	.user-item-box {
		padding: 0 0 10rpx;
		width: auto;
		height: 80rpx;
		line-height: 80rpx;
		cursor: pointer;
		border-bottom: 1px solid #eee;
	}

	.user-img {
		float: left;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.user-img image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.user-name {
		float: left;
		margin-left: 20rpx;
		width: 300rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: #666;
		font-weight: 500;
	}
	.item-msg{
		float: left;
		width: 40rpx;
		height: 100rpx;
	}
	.item-msg-icon{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #f06c7a;
		color: #fff;
		line-height: 40rpx;
		margin-top: 30rpx;
		text-align: center;
		font-size: 24rpx;
	}
	.clear-box {
		clear: both;
	}
	.out-login{
		float: right;
		margin-right:20rpx;
		height: 70rpx;
		line-height: 70rpx;
		padding: 0 40rpx;
		border-radius: 25rpx;
		color: #fff;
		background: #F56C6C;
		font-size: 26rpx;
	}
</style>
