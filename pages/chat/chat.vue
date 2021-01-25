<template>
	<view>
		<view v-for="(item, index) in arr" :key="index" class="chat_list">
			<uni-swipe-action :options="options" @click="action_click($event, item)">
				<view class="tap_mask" @tap.stop.prevent="into_chatRoom(item)">
					<view class="list_box">
						<view class="list_left" :data-username="item.username">
							<view class="list_pic">
								<image :src="(item.chatType == 'groupchat' || item.chatType == 'chatRoom')? '../../static/images/groupTheme.png':'../../static/images/theme@2x.png'"></image>
							</view>
							<view class="list_text">
								<text class="list_user">{{(item.chatType == 'groupchat' || item.chatType == 'chatRoom' || item.groupName)?item.groupName : item.username}}</text>
								<text class="list_word" v-if="item.msg.data[0].data">{{item.msg.data[0].data}}</text>
								<text class="list_word" v-if="item.msg.type == 'img'">[图片]</text>
								<text class="list_word" v-if="item.msg.type == 'audio'">[语音]</text>
							</view>
						</view>
						<view class="list_right">
							<text :data-username="item.username">{{item.time}}</text>
						</view>
						<view class="em-msgNum" v-if="item.unReadCount > 0 || item.unReadCount == '99+'">{{ item.unReadCount }}</view>
					</view>
				</view>
			</uni-swipe-action>
		</view>
		
		<view v-if="arr.length == 0" class="chat_noChat">
			当前没有历史聊天，添加一个好友开始聊天吧
		</view>

		<view style="height: 1px;"></view>
		
		
		<view class="mask" @tap="close_mask" v-if="show_mask"></view>
	</view>
</template>

<script>
	import uniSwipeAction from "@/comps/uni/uni-swipe-action/uni-swipe-action.vue"
	let disp = require("../../utils/broadcast");
	let isfirstTime = true

	export default {
		components: {
			uniSwipeAction
		},
		data() {
			return {
				focus: false,
				search_btn: true,
				search_chats: false,
				show_mask: false,
				yourname: "",
				unReadSpotNum: 0,
				unReadNoticeNum: 0,
				messageNum: 0,
				unReadTotalNotNum: 0,
				arr: [],
				show_clear: false,
				
				gotop: false,
				input_code: '',
				
				options: [{
					text: '置顶'
				}, {
					text: '标记为已读',
					style: {
						backgroundColor: 'rgb(254,156,1)'
					}
				}, {
					text: '删除',
					style: {
						backgroundColor: 'rgb(255,58,49)'
					}
				}],
			}
		},
		onLoad() {
			let me = this;
			//监听加好友申请
			disp.on("em.xmpp.subscribe", function(){
				console.log('chatchatchatchatchatchatchatchatchatchatchatchatchatchatchatchatchatchatchatchatchatchatchat');
				me.messageNum = getApp().globalData.saveFriendList.length;
				me.unReadTotalNotNum = getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length;
			});
			
			//监听解散群
			disp.on("em.xmpp.invite.deleteGroup", function(){
				me.listGroups();
				me.getRoster();
				me.arr = me.getChatList();
				me.messageNum = getApp().globalData.saveFriendList.length;
			});
			
			//监听未读消息数
			disp.on("em.xmpp.unreadspot", function(message){
				me.arr = me.getChatList();
				me.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
			});
			
			//监听未读加群“通知”
			disp.on("em.xmpp.invite.joingroup", function(){
				me.unReadNoticeNum = getApp().globalData.saveGroupInvitedList.length;
				me.unReadTotalNotNum = getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length
			});
			
			disp.on("em.xmpp.contacts.remove", function(){
				me.getRoster();
				// me.setData({
				// 	arr: me.getChatList(),
				// 	unReadSpotNum: getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum,
				// });
			});
			
			this.getRoster();
			
		},
		onShow(){
			this.arr = this.getChatList();
			this.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
			this.messageNum = getApp().globalData.saveFriendList.length;
			this.unReadNoticeNum = getApp().globalData.saveGroupInvitedList.length;
			this.unReadTotalNotNum = getApp().globalData.saveFriendList.length + getApp().globalData.saveGroupInvitedList.length;
		},
		methods: {
			openSearch(){
				this.search_btn = false;
				this.search_chats = true;
				this.gotop = true;
				setTimeout(()=> { //加适当延迟,避免focus时软键盘闪退
					this.focus = true;
				}, 300);
			},
			
			onSearch(val){
				let searchValue = val.detail.value
				let chartList = this.getChatList();
				let searchList = [];
				chartList.forEach((item, index)=>{
					if(String(item.username).indexOf(searchValue) != -1){
						searchList.push(item)
					}
				})
				
				this.arr = searchList
			},
			
			cancel(){
				this.search_btn = true;
				this.search_chats = false;
				this.gotop = false;
				this.focus = false;
				this.arr = this.getChatList();
				this.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum;
			},
			clearInput(){
				this.input_code = '';
				this.show_clear = false;
			},
			
			onInput(e){
				let inputValue = e.detail.value
				if (inputValue) {
					this.show_clear = true;
				} else {
					this.show_clear = false;
				}
			},
			getRoster() {
				let me = this;
				let rosters = {
					success(roster){
						var member = [];
						for(let i = 0; i < roster.length; i++){
							if(roster[i].subscription == "both"){
								member.push(roster[i]);
							}
						}
						uni.setStorage({
							key: "member",
							data: member
						});

						me.listGroups()
						
						disp.fire("em.main.ready");
						me.arr = me.getChatList();
						me.unReadSpotNum = getApp().globalData.unReadMessageNum > 99 ? '99+' : getApp().globalData.unReadMessageNum
					},
					error(err){
						console.log(err);
					}
				};
				this.$im.conn.getRoster(rosters);
			},
			listGroups(){
				var me = this;
				return this.$im.conn.listRooms({
					success: function(rooms){
						uni.setStorage({
							key: "listGroup",
							data: rooms
						});
						me.getChatList()
					},
					error: function(err){
						console.log(err)
					}
				});
			},
			
			getChatList(){
				var array = [];
				var member = uni.getStorageSync("member");
				var myName = uni.getStorageSync("myUsername");
				var listGroups = uni.getStorageSync('listGroup')|| [];
				for(let i = 0; i < member.length; i++){
					let newChatMsgs = uni.getStorageSync(member[i].name + myName) || [];
					let historyChatMsgs = uni.getStorageSync("rendered_" + member[i].name + myName) || [];
					let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
			
					if(curChatMsgs.length){
						let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
						lastChatMsg.unReadCount = newChatMsgs.length;
						if(lastChatMsg.unReadCount > 99) {
							lastChatMsg.unReadCount = "99+";
						}
						let dateArr = lastChatMsg.time.split(' ')[0].split('-')
						let timeArr = lastChatMsg.time.split(' ')[1].split(':')
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
						array.push(lastChatMsg);
					}
				}
				for(let i = 0; i < listGroups.length; i++){
					let newChatMsgs = uni.getStorageSync(listGroups[i].roomId + myName) || [];
					let historyChatMsgs = uni.getStorageSync("rendered_" + listGroups[i].roomId + myName) || [];
					let curChatMsgs = historyChatMsgs.concat(newChatMsgs);
					if(curChatMsgs.length){
						let lastChatMsg = curChatMsgs[curChatMsgs.length - 1];
						lastChatMsg.unReadCount = newChatMsgs.length;
						if(lastChatMsg.unReadCount > 99) {
							lastChatMsg.unReadCount = "99+";
						}
						let dateArr = lastChatMsg.time.split(' ')[0].split('-')
						let timeArr = lastChatMsg.time.split(' ')[1].split(':')
						let month = dateArr[2] < 10 ? '0' + dateArr[2] : dateArr[2]
						lastChatMsg.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
						lastChatMsg.dateTimeNum = `${dateArr[1]}${month}${timeArr[0]}${timeArr[1]}${timeArr[2]}`
						lastChatMsg.groupName = listGroups[i].name
						array.push(lastChatMsg);
					}
				}
				
					// 测试列表
				// for (let i = 0; i < 12; i++) {
				// 	let newSESSION = {
				// 		info: {from: "zdtest", to: "zdtest2"},
				// 		mid: "txtWEBIM_427ab8b10c",
				// 		unReadCount: 6,
				// 		msg: {type: "txt", data: [{data: "丢晚高丢完", type: "txt"}]},
				// 		style: "self",
				// 		time: "2019-2-18 16:59:25",
				// 		username: "zdtest" + i,
				// 		yourname: "zdtest"
				// 	}
				// 	let dateArr = newSESSION.time.split(' ')[0].split('-')
				// 	let timeArr = newSESSION.time.split(' ')[1].split(':')
				// 	newSESSION.time = `${dateArr[1]}月${dateArr[2]}日 ${timeArr[0]}时${timeArr[1]}分`
				// 	array.push(newSESSION)
				// }
				
				array.sort((a, b) => {
					return b.dateTimeNum - a.dateTimeNum
				})
				return array;
			},
			
			into_chatRoom(item){
				let detail = item;
				
				//↓↓↓↓ 谁赞成谁反对?
				//群聊的chatType居然是singlechat？脏数据？ 等sdk重写后整理一下字段
				if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom' || detail.groupName) {
					this.into_groupChatRoom(detail)
				} else {
					this.into_singleChatRoom(detail)
				}
			},
			
			//	单聊
			into_singleChatRoom(detail){
				var my = uni.getStorageSync("myUsername");
				var nameList = {
					myName: my,
					your: detail.username
				};
				uni.navigateTo({
					url: "../chatroom/chatroom?username=" + JSON.stringify(nameList)
				});
			},
			
			//	群聊 和 聊天室 （两个概念）
			into_groupChatRoom(detail){
				var my = uni.getStorageSync("myUsername");
				var nameList = {
					myName: my,
					your: detail.groupName,
					groupId: detail.info.to
				};
				uni.navigateTo({
					url: "../groupChatRoom/groupChatRoom?username=" + JSON.stringify(nameList)
				});
			},
			
			action_click(e, item) {
				switch (e.index){
					case 2:
						this.del_chat(item);
						break;
					default:
						break;
				}
			},
			
			del_chat(item){
				
				let detail = item;
				let nameList;
				if (detail.chatType == 'groupchat' || detail.chatType == 'chatRoom') {
					nameList = {
						your: detail.info.to
					};
				} else {
					nameList = {
						your: detail.username
					};
				}
			
				var myName = uni.getStorageSync("myUsername");
				var currentPage = getCurrentPages();
				
				
				uni.showModal({
					title: "",
					content: "删除该聊天记录?",
					confirmText: "删除",
					success: function(res){
						if(res.confirm){
							uni.setStorageSync(nameList.your + myName, "");
							uni.setStorageSync("rendered_" + nameList.your + myName, "");
							if(currentPage[0]){
								currentPage[0].onShow();
							}
							disp.fire("em.chat.session.remove");
						}
					},
					fail: function(err){
					}
				});
			},
			
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		overflow: hidden;
	}
	.chat_title{
	
		background-color: #fff;
		width: 100%;
		z-index: 9;
	
		height: 128rpx;
	}
	.chat_title text{
		line-height: 96rpx;
		font-size: 64rpx;
		font-weight: 400;
		margin-left: 32rpx;
	}
	
	.search,.search_input {
		width: 100%;
		height: 88rpx;
		background-color: #fff;
		display: flex;
		align-items: center;
		top: 0;
		left: 0;
	}
	
	
	.search {
		justify-content: space-around;
	}
	.search_input {
		justify-content: space-around;	
	}
	.search view, .search_input view {
		height: 64rpx;
		line-height: 64rpx;
		background-color: #F5F5F5;
		border-radius: 16rpx;
		text-align: center;
		display: flex;
		align-items: center;
		margin: 0 32rpx;
	}
	.search view {
		width: 100%;
		justify-content: center;
		align-items: center;
	}
	.search image {
		display: block;
		width: 5%;
		height: 50%;
	}
	.search_input view {
		padding-left: 24rpx;
		text-align: left;
		flex: 1;
		margin: 0 28rpx 0 32rpx;
	}
	.search icon,.search_input icon {
		display: inline-block;
		margin: 8rpx 12rpx 0;
		font-size: 24rpx;
	}
	.search text {
		font-size: 30rpx;
		color: #9B9B9B;
	}
	
	.search_input text {
		display: inline-block;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		color: #0873DE;
		margin-right: 32rpx;
	}
	.search_input input {
		font-size: 28rpx;
		width: 90%;
	}
	.mask {
		background-color: black;
		opacity: 0.4;
		position: fixed;
		top: 80rpx;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.chat_list_wraper{
		padding-bottom: 128rpx;
		/* #ifdef H5 */
		padding-bottom: 228rpx;
		/* #endif */
		box-sizing: border-box; 
		height: 100%;
		position: fixed;
		top: 128rpx;
		overflow: hidden;
	}
	
	.chat_list {
		width: 100%;
		height: 128rpx;
		overflow: hidden;
	}
	.tap_mask{
		width: 100%;
		overflow: hidden;
	}
	.list_box{
		margin: 0 32rpx;
		height: 126rpx;
		border-bottom: 0.5px #E5E5E5 solid;
		display: flex;
	}
	.list_left {
		width: 63%;
		height: 100%;
		float: left;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex: 1;
	}
	.list_text {
		width: 60%;
		height: 100%;
		float: left;
		font-size: 28rpx;
	}
	.list_pic {
		margin-right: 20rpx;
	}
	.list_pic image {
		display: block;
		width: 88rpx;
		height: 88rpx;
	}
	.list_user{
		font-size: 34rpx;
		color: #000;
		position: relative;
		top: 22rpx;
		overflow: hidden;
		width: 350rpx;
		display: inline-block;
		text-overflow: ellipsis;
	}
	.em-msgNum {
		position: relative;
		right: 32rpx;
		top: 76rpx;
		min-width: 28rpx;
		height: 28rpx;
		border-radius: 14rpx;
		background: #f04134;
		color: #fff;
		line-height: 28rpx;
		font-size: 24rpx;
		text-align: center;
	}
	.list_word {
		height: 40rpx;
		display: block;
		margin-top: 26rpx;
		overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    /* position: absolute; */
	    width: 70%;
	    font-size: 24rpx;
	    color: #9B9B9B;
	    /* top: 66rpx; */
	}
	.list_right {
		width: 240rpx;
		height: 100%;
		float: right;
		font-size: 24rpx;
		text-align: right;
	}
	.list_right text:first-child {
		display: block;
		line-height: 60rpx;
		margin: 12rpx auto auto auto;
	}
	.list_right text:last-child {
		height: 40rpx; 
		font-size: 26rpx;
		color: #CFCFCF;
		display: block;
		margin-top: 4rpx;
	}
	
	.chat_noChat{
		text-align: center;
		font-size: 30rpx;
		color: #9B9B9B;
		margin-top: 400rpx;
	}
	
	.main_title_hide{
		top: -128rpx ;
		/* #ifdef H5 */
		top: 0 ;
		/* #endif */
		transition: top 0.5s;
	}
	.main_title_show{
		top: 0;
		transition: top 0.5s;
	}
	.goTop{
		top: 0rpx;
		transition: top 0.5s;
		padding-bottom: 0rpx!important;
	}
	.goTopX{
		top: 0rpx;
		transition: top 0.5s;
		padding-bottom: 140rpx!important;
	}
	.goback{
		top: 128rpx;
		transition: top 0.5s;
	}

</style>
