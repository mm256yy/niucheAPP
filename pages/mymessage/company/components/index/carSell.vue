<template>
	<view class="carSell">
		<u-mask z-index="2" :show="show" @click="hideMask">
		</u-mask>
		<list-tags v-show="showKm" :list="selectKm" :active="currentKm" @onClick="getDataKm"></list-tags>
		<list-tags v-show="showPrice" :list="selectPrice" :active="currentPrice" @onClick="getDataPrice"></list-tags>
		<list-tags v-show="showAge" :list="selectAge" :active="currentAge" @onClick="getDataAge"></list-tags>
		<view :class="['middle-content',!filterData.length?'active':'']">
			<view style="width: 100%;height: 100rpx;padding-left: 34rpx;">
				<u-form :model="form" ref="uForm" label-width="150" :border-bottom="false">
					<u-form-item style="padding: 0 16rpx;margin-top: -18rpx;float: left;
					background: #F8F9FB;border-radius: 4px;width: 108rpx;display: flex;" label="">
					<view>杭州</view>
					<u-image style="margin-top: -50rpx;margin-left: 2rpx;" width="18rpx" height="22rpx" src="@/static/city.png"></u-image>
					</u-form-item>
					<u-form-item style="padding: 0 16rpx;margin-top: -18rpx;float: left;
				    background: #F8F9FB;border-radius: 4px;width: 112rpx;margin-left: 24rpx;" label="">
					<u-input :custom-style="style" v-show="!showAge" disabled placeholder-style="color:#000;" placeholder="车龄" @click="toggleAge()"  v-model="agekey" /><text v-show="!showAge" class='triangle'></text>
					<u-input :custom-style="styleActive" v-show="showAge" disabled placeholder-style="color:#40B26D;" placeholder="车龄" @click="toggleAge()"  v-model="agekey" /><text v-show="showAge" class='triangleActive'></text></u-form-item>
					<u-form-item style="padding: 0 16rpx;margin-left:24rpx;margin-top: -18rpx;float: left;
				    background: #F8F9FB;border-radius: 4px;width: 112rpx;" label="">
					<u-input :custom-style="style" v-show="!showKm" disabled placeholder-style="color:#000;" placeholder="里程" @click="toggleKm()" v-model="kmkey" /><text v-show="!showKm" class='triangle'></text>
					<u-input :custom-style="styleActive" v-show="showKm" disabled placeholder-style="color:#40B26D;" placeholder="里程" @click="toggleKm()" v-model="kmkey" /><text v-show="showKm" class='triangleActive'></text>
					</u-form-item>
					<u-form-item style="padding: 0 16rpx;margin-left:24rpx;margin-top: -18rpx;float: left;
					background: #F8F9FB;border-radius: 4px;width: 146rpx;" label="">
					<u-input :custom-style="style" v-show="!showPrice" disabled placeholder-style="color:#000;" placeholder="打包价" @click="togglePrice()" v-model="packpricekey" /><text v-show="!showPrice" class='triangle'></text>
					<u-input :custom-style="styleActive" v-show="showPrice" disabled placeholder-style="color:#40B26D;" placeholder="打包价" @click="togglePrice()" v-model="packpricekey" /><text v-show="showPrice" class='triangleActive'></text>
					</u-form-item>
					<u-image style="margin-left: 2rpx;float: right;margin-top: 4rpx;" width="32rpx" height="34rpx" src="@/static/filter.png"></u-image>
					<view @click="filter()" style="
					float: right;margin-right: 2rpx;">更多</view>
				</u-form>
			</view>
			<view v-show="filterData.length" :class="filterData.length?'active':''" style="margin-top: 42rpx;display: flex;padding-bottom: 26rpx;padding-left: 34rpx;">
				<scroll-view style="width: 572rpx;display: inline-block;" class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view @click="close(index,item)" class="scroll-view-item_H" v-for="(item, index) in filterData" :key="index">{{item}}</view>
				</scroll-view>
				<view @click="clear" style="width: 90rpx;margin-left: 30rpx;display: inline-block;margin-top: 8rpx;">清空</view>
			</view>
			<!-- <view style="display: flex;margin-left: 38rpx;">
				<view v-for="(item, index) in filterData" :key="index" style="padding: 10rpx 18rpx;border-radius: 8rpx;background: #f8f9fb;margin-right:24rpx;">{{item}}</view>
			</view> -->
			<!-- <view class="icon"><u-icon @click="search()" name="search" color="#fff"></u-icon></view> -->
			<!-- <view style="position: fixed;top: 100rpx;left:0;background-color: #fff;" v-show="show">
				<text style="width: 206rpx;height: 76rpx;border: 1px solid #D9DEDF;line-height: 76rpx;text-align: center;display: inline-block;color: #666;margin-left: 32rpx;" v-for="(item, index) in select" :key="index">{{item.label}}</text>
			</view> -->
			<!-- <u-dropdown style="width: 50rpx;">
				<u-dropdown-item @change="change()" v-model="form.km" title="行驶里程" :options="select"></u-dropdown-item>
				<u-dropdown-item @change="changePrice()" v-model="form.packprice" title="打包价" :options="selectPrice"></u-dropdown-item>
			</u-dropdown> -->
		</view>
		<!-- <view class="tagBox">
			<view v-show="kmkey" class="selectTag">{{kmkey}}</view>
			<view v-show="packpricekey" class="selectTag">{{packpricekey}}</view>
			<view v-show="kmkey||packpricekey" class="clearNull" @click="clear()">清空</view>
			<view class="clear"></view>
		</view> -->
		<!-- <view v-show="kmkey||packpricekey" style="width: 100%;height: 50rpx;"></view> -->
		<!-- <view class="wrap">
			<u-swiper height="377" bg-color="#CDE5E3" mode="dot" :list="list"></u-swiper>
		</view> -->
		<view v-show="!filterData.length" style="height: 132rpx;"></view>
		<view v-show="filterData.length" style="height: 226rpx;"></view>
		<load-refresh
		  v-show="list.length"
		  ref="loadRefresh"
		  :pageNo='pageNum'
		  :totalPageNo='total'
		  :isRefresh="true"
		  refreshType="halfCircle"
		  refreshTime="1000"
		  color="#04C4C4"
		  heightReduce="10"
		  backgroundCover="#F3F5F5"
		  @loadMore="loadMore" 
		  @refresh="refresh">
		  <view slot="content-list">
		    <view class="last">
		    	<view class="lists" v-for="(item, index) in list" :key="index">
		    		<view class="list" @click="detail(item.demandid)">
						<img style="width: 288rpx;height: 196rpx;border-radius: 12rpx;" v-show="!item.photoUrl" class="left" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif" alt="">
						<img style="width: 288rpx;height: 196rpx;border-radius: 12rpx;" v-show="item.photoUrl" class="left" :src="item.photoUrl" alt="">
		    			<!-- <u-image v-show="item.photoUrl" class="left" width="312rpx" height="231rpx" :src="item.photoUrl"></u-image>
		    			<u-image v-show="!item.photoUrl" class="left" width="312rpx" height="231rpx" src="http://pic1.jisuapi.cn/car/static/images/logo/300/2982.gif"></u-image> -->
		    			<!-- <u-image class="left" width="312rpx" height="231rpx" :src="item.photoUrl"></u-image> -->
		    			<view class="right">
							<view style="height: 116rpx;">
								<view class="name u-line-2">{{item.carBrand}}{{item.carText}}</view>
								<view class="tag">{{item.carAge}}/{{item.km}}</view>
							</view>
		    				<view class="price">{{item.packPrice|moneyFormat}}元</view>
							<view v-show="item.carnbumber" style="width: 136rpx;height: 48rpx;line-height: 40rpx;text-align: center;border-radius: 8rpx;border: 2rpx solid #4aba75;color: #4aba75;float: left;margin-top: 30rpx;margin-left: 34rpx;">在售{{item.carnbumber}}辆</view>
		    			</view>
		    			<view class="clear"></view>
						<!-- <view class="flex">
							<view class="company">{{item.comparyname}}</view>
							<view class="area">{{item.comparyarea}}</view>
							<view class="clear"></view>
						</view> -->
		    			<!-- <u-icon class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		    		</view>
		    		<!-- <u-icon v-show="item.iscollection === 1" @click="cancel(item,item.demandid)" class="heart" name="heart-fill" color="#3FB26C" size="28"></u-icon> -->
		    		<!-- <u-icon v-show="item.iscollection === 2" @click="favorites(item,item.demandid)" class="heart" name="heart-fill" color="rgba(0,0,0,0.1)" size="28"></u-icon> -->
		    	</view>
		    	<!-- <u-loadmore :status="status" :icon-type="iconType" :load-text="loadText" /> -->
		    </view>
		  </view>
		</load-refresh>
		<view class="null" v-show="!list.length">
			<view>
				<u-image width="371" height="171rpx" src="@/static/null.png"></u-image>
				<view style="width: 371rpx;text-align: center;margin-top: 20rpx;">亲，当前空空如也</view>
			</view>
		</view>
	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import listTags from '@/components/listTags.vue'
	import {
		publishObj
	} from '@/utils/constant.js'
	export default {
		components: {
			loadRefresh,
			listTags
		},
		data() {
			return {
				showKm:false,
				showPrice:false,
				showAge:false,
				iconType: 'flower',
				publishObj:publishObj,
				age: '',
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
				  km: '',
				  packprice: '',
				  businessType:0,
				  carbrand:'',
				  cartype:'',
				  power:'',
				  packprice:'',
				  startCarAge:'',
				  endCarAge:''
				},
				agekey:'',
				kmkey: '',
				packpricekey: '',
				pagination: {
				  pageNum: 1, 
				  pageSize: 10
				},
				total: 0,
				selectKm: [
					{
						label: '不限',
						value: '0'
					},
					{
						label: '0-2万公里',
						value: '1'
					},
					{
						label: '2-5万公里',
						value: '2'
					},
					{
						label: '5-10万公里',
						value: '3'
					},
					{
						label: '10-20万公里',
						value: '4'
					},
					{
						label: '20-30万公里',
						value: '5'
					},
					{
						label: '30-50万公里',
						value: '6'
					},
					{
						label: '50-70万公里',
						value: '7'
					},
					{
						label: '70万公里以上',
						value: '8'
					}
				],
				selectPrice: [
					{
						label: '3万以内',
						value: '1'
					},
					{
						label: '3万-5万',
						value: '2'
					},
					{
						label: '5万以上',
						value: '3'
					},
					{
						label: '不限',
						value: '4'
					}
				],
				selectAge: [
					{
						label: '1年内',
						value: '0'
					},
					{
						label: '1年-3年',
						value: '1'
					},
					{
						label: '3年-5年',
						value: '2'
					},
					{
						label: '5年以上',
						value: '3'
					},
					{
						label: '不限',
						value: '4'
					}
				],
				list: [],
				status: 'loadmore',
				loadText: {
					loadmore: '轻轻上拉',
					loading: '努力加载中',
					nomore: '我也是有底线的'
				},
				pageNum: 1,
				currentKm:-1,
				currentAge:-1,
				currentPrice:-1,
				style:{
					color:'#000'
				},
				styleActive:{
					color:'#40B26D'
				},
				show: false,
				filterData:[],
				image: '#333'
			}
		},
		filters:{
				//取截单元,单位
				moneyFormat:function(arg){
					if(arg.toString().length>=4){
						const moneys = arg/10000
						const realVal = parseFloat(moneys);
						return realVal+"万"
					}
					}
				},
		mounted() {
			this.pageNum = 1;
			this.transform()
		},
		methods: {
			close(index,text){
				var carbrand = [];
				var cartype = [];
				var power = [];
				this.filterData.splice(index, 1);
				this.publishObj.onLineList.map(item=>{
				   if(item.text == text){
				   	this.form.businessType = 0;
					uni.removeStorageSync('businessType');
				   }
				})
				if(uni.getStorageSync('carbrand')){
					carbrand = uni.getStorageSync('carbrand').split(',');
					carbrand.map((item,index)=>{
					   if(item == text){
					   	carbrand.splice(index, 1);
						if(carbrand.length){
							uni.setStorageSync('carbrand', carbrand.join(','));
							this.form.carbrand = uni.getStorageSync('carbrand');
						}else{
							uni.removeStorageSync('carbrand');
							this.form.carbrand = '';
						}
					   }
					})
				}
				if(uni.getStorageSync('cartype')){
					cartype = uni.getStorageSync('cartype').split(',');
					cartype.map((item,index)=>{
					   if(item == text){
					   	cartype.splice(index, 1);
						if(cartype.length){
							uni.setStorageSync('cartype', cartype.join(','));
							this.form.cartype = uni.getStorageSync('cartype');
						}else{
							uni.removeStorageSync('cartype');
							this.form.cartype = '';
						}
					   }
					})
				}
				if(uni.getStorageSync('power')){
					power = uni.getStorageSync('power').split(',');
					power.map((item,index)=>{
					   if(item == text){
					   	power.splice(index, 1);
						if(power.length){
							uni.setStorageSync('power', power.join(','));
							this.form.power = uni.getStorageSync('power');
						}else{
							uni.removeStorageSync('power');
							this.form.power = '';
						}
					   }
					})
				}
				this.search()
			},
			transform(){
				this.form = {
				  km: '',
				  packprice: '',
				  businessType:0,
				  carbrand:'',
				  cartype:'',
				  power:'',
				  packprice:'',
				  startCarAge:'',
				  endCarAge:''
				};
				this.kmkey = '';
				this.packpricekey = '';
				this.agekey = '';
				this.form.km = uni.getStorageSync('kmCom');
				this.form.packprice = uni.getStorageSync('priceCom');
				this.age = uni.getStorageSync('ageCom');
				this.currentKm = this.form.km == 0?0:parseInt(this.form.km);
				// this.currentKm = parseInt(this.form.km - 1)?parseInt(this.form.km - 1):0;
				this.currentAge = parseInt(this.age)?parseInt(this.age):-1;
				const price = this.form.packprice - 1
				this.currentPrice = parseInt(price)?parseInt(price):-1;
				this.selectKm.map(item=>{
				   if(item.value == this.form.km){
				   	this.kmkey = item.label;
				   }
				})
				 this.selectPrice.map(item=>{
				    if(item.value == this.form.packprice){
				    	this.packpricekey = item.label;
				    }
				 })
				 this.selectAge.map(item=>{
				    if(item.value == this.age){
				    	this.agekey = item.label;
				    }
				 })
				 this.kmkey = (this.kmkey == '不限')?'':this.kmkey
				 this.packpricekey = (this.packpricekey == '不限')?'':this.packpricekey
				 this.agekey = (this.agekey == '不限')?'':this.agekey
				if(this.age == '0') {
					this.form.startCarAge = '0';
				    this.form.endCarAge = '1';
				}
				if(this.age == '1') {
					this.form.startCarAge = '1';
				    this.form.endCarAge = '3';
				}
				if(this.age == '2') {
					this.form.startCarAge = '3';
				    this.form.endCarAge = '5';
				}
				if(this.age == '3') {
					this.form.startCarAge = '5';
				    this.form.endCarAge = '';
				}
				if(this.age == '4') {
					this.form.startCarAge = '';
				    this.form.endCarAge = '';
				}
				var carbrand = [];
				var cartype = [];
				var power = [];
				var businessType = '';
				this.filterData = [];
				if(uni.getStorageSync('businessType')){
					businessType = uni.getStorageSync('businessType');
					this.filterData.push(businessType);
					this.publishObj.onLineList.map(item=>{
					   if(item.text == businessType){
					   	this.form.businessType = item.id;
					   }
					})
				}
				if(uni.getStorageSync('carbrand')){
					carbrand = uni.getStorageSync('carbrand').split(',');
					this.filterData = this.filterData.concat(carbrand);
					this.form.carbrand = uni.getStorageSync('carbrand');
				}
				this.publishObj.carType.map(items=>{
				   items.checked = false
				})
				if(uni.getStorageSync('cartype')){
					cartype = uni.getStorageSync('cartype').split(',');
					this.filterData = this.filterData.concat(cartype);
					this.form.cartype = uni.getStorageSync('cartype');
					cartype.map(item=>{
						this.publishObj.carType.map(items=>{
						   if(item == items.text){
						   	 items.checked = true
						   }
						})
					})
				}
				this.publishObj.power.map(items=>{
				   items.checked = false
				})
				if(uni.getStorageSync('power')){
					power = uni.getStorageSync('power').split(',');
					this.filterData = this.filterData.concat(power);
					this.form.power = uni.getStorageSync('power');
					power.map(item=>{
						this.publishObj.power.map(items=>{
						   if(item == items.text){
						   	 items.checked = true
						   }
						})
					})
				}
				this.search()
			},
			hideMask(){
				this.show = false;
				this.showPrice = false;
				this.showKm = false;
				this.showAge = false;
			},
			toggleKm(){
				this.show = !this.showKm;
				this.showKm = !this.showKm;
				this.showPrice = false;
				this.showAge = false;
			},
			togglePrice(){
				this.show = !this.showPrice;
				this.showPrice = !this.showPrice;
				this.showKm = false;
				this.showAge = false;
			},
			toggleAge(){
				this.show = !this.showAge;
				this.showAge = !this.showAge;
				this.showPrice = false;
				this.showKm = false;
			},
			getDataKm(index) {
				this.currentKm = index;
				this.kmkey = this.selectKm[index].label;
				this.kmkey = (this.kmkey == '不限')?'':this.kmkey
				this.form.km = this.selectKm[index].value;
				uni.setStorageSync('kmCom', this.form.km);
				this.showKm = false;
				this.show = false;
				this.search()
			},
			getDataPrice(index) {
				this.currentPrice = index;
				this.packpricekey = this.selectPrice[index].label;
				this.packpricekey = (this.packpricekey == '不限')?'':this.packpricekey
				this.form.packprice = this.selectPrice[index].value;
				uni.setStorageSync('priceCom', this.form.packprice);
				this.showPrice = false;
				this.show = false;
				this.search()
			},
			getDataAge(index) {
				this.currentAge = index;
				this.agekey = this.selectAge[index].label;
				this.agekey = (this.agekey == '不限')?'':this.agekey
				this.age = this.selectAge[index].value;
				if(this.age == '0') {
					this.form.startCarAge = '0';
				    this.form.endCarAge = '1';
				}
				if(this.age == '1') {
					this.form.startCarAge = '1';
				    this.form.endCarAge = '3';
				}
				if(this.age == '2') {
					this.form.startCarAge = '3';
				    this.form.endCarAge = '5';
				}
				if(this.age == '3') {
					this.form.startCarAge = '5';
				    this.form.endCarAge = '';
				}
				if(this.age == '4') {
					this.form.startCarAge = '';
				    this.form.endCarAge = '';
				}
				uni.setStorageSync('ageCom', this.age);
				this.showAge = false;
				this.show = false;
				this.search()
			},
			page() {
			    this.pageNum = 1;
			},
			// 上划加载更多
			      loadMore() {
					  this.getList()
			        // 请求新数据完成后调用 组件内loadOver()方法
			        // 注意更新当前页码 currPage
			        this.$refs.loadRefresh.loadOver()
			      },
			// 下拉刷新数据列表
			refresh() {
				this.pageNum = 1;
			    this.search()
			},
			change(){
				this.search()
				this.add()
			},
			changePrice(){
				this.search()
				this.add()
			},
			add(){
				this.selectKm.forEach(item=>{
					if(item.value === this.form.km){
					    this.kmkey = item.label;
					}
				})
				this.selectPrice.forEach(item=>{
					if(item.value === this.form.packprice){
					    this.packpricekey = item.label;
					}
				})
			},
			// favorites(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 2,
			// 		collectionstate: 3,
			// 		iscollection: 1
			// 	};
			// 	item.iscollection = 1;
			//     this.$u.api.collect(params).then(res=>{
			//     	if(res.code === 200){
			//     		 this.$u.toast('收藏成功');
			//     	}else {
			//     		 this.$u.toast(res.msg);
			//     	}
			//     })
			// },
			// cancel(item,id) {
			// 	const params = {
			// 		BeCollectedId: id,
			// 		isDriveAndCompary: 2,
			// 		collectionstate: 3,
			// 		iscollection: 0
			// 	};
			// 	item.iscollection = 2;
			//     this.$u.api.collect(params).then(res=>{
			//     	if(res.code === 200){
			//     		 this.$u.toast('取消收藏成功');
			//     	}else {
			//     		 this.$u.toast(res.msg);
			//     	}
			//     })
			// },
		    getList(){
				this.pageNum = this.pageNum + 1;
		        const params = Object.assign(this.form, {
		        	pageNum: this.pageNum,
		        	pageSize: 10,
					orderByColumn: 'tag.refreshtime',
					isAsc: 'desc'
		        });
		    		this.$u.api.sellCar(params).then(res=>{
		    			if(res.code === 200){
		    				 this.total = Math.ceil(res.total/10);
							 let arr = res.rows
							 arr.forEach(item=>{
							 	this.list.push(item)
							 })
							 let len = this.list.length;
							 if(len<this.total){
							 	this.status = 'loadmore'
							 } else{
							 	this.status = 'nomore'
							 }
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    search(){
		        const params = Object.assign(this.form, {
		    		pageNum: 1,
		    		pageSize: 10,
					orderByColumn: 'tag.refreshtime',
					isAsc: 'desc'
		    	});
		    		this.$u.api.sellCar(params).then(res=>{
		    			if(res.code === 200){
		    				 this.list = res.rows;
		    				 this.total = Math.ceil(res.total/10);
							 let len = this.list.length;
							 if(len<this.total){
							 	this.status = 'loadmore'
							 } else{
							 	this.status = 'nomore'
							 }
		    			}else {
		    				 this.$u.toast(res.msg);
		    			}
		    		})
		    },
		    confirm(arr){
		    	this.form.km = arr[0].value;
		    	this.kmkey = arr[0].label;
				this.search()
		    },
		    confirmPrice(arr){
		    	this.form.packprice = arr[0].value;
		    	this.packpricekey = arr[0].label;
				this.search()
			},
			pull() {
				let len = this.list.length;
				 if (len < this.total){
					 this.getList()
				 }else{
					this.status = 'nomore'
				}
			},
			detail(id) {
				this.$u.route("/pages/mymessage/company/components/index/carSellDetail",{id:id})
			},
			filter(){
				uni.navigateTo({
					url:'/pages/mymessage/company/components/index/filter'  //跳转到B页面
				})
			},
			// filter() {
			// 	this.$u.route("/pages/mymessage/company/components/index/filter")
			// },
			clear(){
				uni.removeStorageSync('cartype');
				uni.removeStorageSync('power');
				uni.removeStorageSync('businessType');
				uni.removeStorageSync('carbrand');
				this.filterData = [];
				this.form.businessType = 0;
				this.form.power = '';
				this.form.cartype = '';
				this.form.carbrand = '';
				this.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carSell {
		.tagBox{
			width: 100%;
			padding: 10rpx 100rpx 10rpx 80rpx;
			position: fixed;
			top: 70rpx;
			left: 0;
			z-index: 1;
			background-color: #f5f5f8;
			.selectTag{
				padding: 4rpx 8rpx;
				border-radius: 20rpx;
				border: 1rpx solid rgba(0,0,0,0.1);
				float: left;
				font-size: 24rpx;
				margin-right: 40rpx;
			}
			.selectTag:last-child{
				margin-right: 0;
			}
			.clearNull{
				float: right;
			}
		}
		.active{
			border-bottom: 1rpx solid rgba(0,0,0,0.08);
		}
		.null{
			height: calc(73vh - var(--window-top));
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.wrap {
			padding: 40rpx;
		}
		.middle-content{
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 10;
			background-color: #fff;
			/deep/ .u-dropdown__content {
			    overflow: visible;
			}
		}
		.middle-content .u-form {
			width: 686rpx;
			height: 71rpx;
			border-radius: 40rpx;
			background-color: #fff;
			margin-top: 48rpx;
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
			margin-left: 40rpx;
			background: rgba(0,0,0,0.2);
		}
		.clear {
			clear: both;
		}
		.last{
			background-color: #fff;
		}
		.lists {
			width: 702rpx;
			// height: 308rpx;
			position: relative;
			.heart {
				margin-top: 14rpx;
				margin-right: 20rpx;
				position: absolute;
				top: 250rpx;
			    right: 0rpx;
			}
			.list {
				width: 702rpx;
				// height: 308rpx;
				padding: 44rpx 0;
				border-bottom: 1rpx solid rgba(0,0,0,0.08);
				margin-left: 24rpx;
				font-size: 20rpx;
				// background-image: url(@/static/bgcarsell.png);
				background-repeat: no-repeat;
				background-size: cover;
				border-bottom: 1rpx solid rgba(0,0,0,0.05);
				.left, .right {
					float: left;
				}
				.right {
					width: 380rpx;
					padding-left: 34rpx;
				}
				.name {
					font-size: 30rpx;
					line-height: 40rpx;
					font-weight: 900;
					color: #333;
				}
				.tag {
					font-size: 26rpx;
					font-weight: 400;
					color: #777777;
					line-height: 36rpx;
					margin-top: 8rpx;
				}
				.price{
					font-size: 18px;
					font-family: SourceHanSansCN-Bold, SourceHanSansCN;
					font-weight: bold;
					color: #FF5200;
			        margin-top: 20rpx;
					float: left;
				}
			}
			.flex{
				padding-top: 22rpx;
				padding-bottom: 34rpx;
                border-bottom: 2rpx solid #dedede;
				.company{
					font-size: 28rpx;
					font-weight: 400;
					color: #343434;
					float: left;
				}
				.area{
					font-size: 26rpx;
					font-weight: 400;
					color: #666666;
					float: right;
				}
			}
		}
		.triangleActive{
			display: inline-block;
		    width: 0;
		    height: 0;
		    border: 10rpx solid;
		    border-color: transparent transparent #40B26D transparent;
			margin-top: -8rpx;
			margin-left: 4rpx;
		}
		.triangle{
			display: inline-block;
		    width: 0;
		    height: 0;
		    border: 10rpx solid;
		    border-color: #777 transparent transparent transparent;
			margin-top: 8rpx;
			margin-left: 4rpx;
		}
		.warp {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;
			}
			.rect {
				width: 120px;
				height: 120px;
				background-color: #fff;
			}
			.scroll-view_H {
				white-space: nowrap;
				width: 100%;
			}
			.scroll-view-item_H {
				display: inline-block;
				width: 140rpx;
				height: 56rpx;
				margin-right: 28rpx;
				line-height: 56rpx;
				text-align: center;
				background-image: url(@/static/shut.png);
				background-repeat: no-repeat;
				height: 100%;
				background-size: cover;
			}
	}
</style>
