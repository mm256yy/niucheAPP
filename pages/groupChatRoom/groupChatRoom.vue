<template>
	<view>
		<u-navbar back-text="" back-icon-color="#333333" :title="title" :background="background" title-color="#333333"></u-navbar>
		<chat :username="username" chatType="chatRoom"></chat>
	</view>
</template>

<script>
	import chat from "@/comps/chat/chat.vue";
	let disp = require("../../utils/broadcast");
	export default {
		components: {
			chat
		},
		props: {
			
		},
		data() {
			return {
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 39%,#ffffff 0%)'
				},
				title:'',
				username: {
					your: "",
				},
			}
		},
		onLoad(options) {
			let username = JSON.parse(options.username);
			console.log(username);
			this.username = username;
			this.title = username.your
			// uni.setNavigationBarTitle({
			// 	title: username.your
			// });
		},
		onUnload(){
			disp.fire("em.chatroom.leave");
		},
		methods: {
			onPullDownRefresh: function() {
				uni.showNavigationBarLoading();
				//这里触发chat组件的getMore方法 --xyliu
				// this.selectComponent('#groupchat').getMore()
				// 停止下拉动作
				uni.hideNavigationBarLoading();
				uni.stopPullDownRefresh();
			},
		}
	}
</script>

<style>

</style>
