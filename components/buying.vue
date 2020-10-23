<template>
	<view>
        <swiper-item class="swiper-item">
        	<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
        		<view class="page-box">
        			<view class="order" v-for="(res, index) in orderList[0]" :key="res.id">
        				<view class="top">
        					<view class="left">
        						<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
        						<view class="store">{{ res.store }}</view>
        						<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
        					</view>
        					<view class="right">{{ res.deal }}</view>
        				</view>
        				<view class="item" v-for="(item, index) in res.goodsList" :key="index">
        					<view class="left"><image :src="item.goodsUrl" mode="aspectFill"></image></view>
        					<view class="content">
        						<view class="title u-line-2">{{ item.title }}</view>
        						<view class="type">{{ item.type }}</view>
        						<view class="delivery-time">发货时间 {{ item.deliveryTime }}</view>
        					</view>
        					<view class="right">
        						<view class="price">
        							￥{{ priceInt(item.price) }}
        							<text class="decimal">.{{ priceDecimal(item.price) }}</text>
        						</view>
        						<view class="number">x{{ item.number }}</view>
        					</view>
        				</view>
        				<view class="total">
        					共{{ totalNum(res.goodsList) }}件商品 合计:
        					<text class="total-price">
        						￥{{ priceInt(totalPrice(res.goodsList)) }}.
        						<text class="decimal">{{ priceDecimal(totalPrice(res.goodsList)) }}</text>
        					</text>
        				</view>
        				<view class="bottom">
        					<view class="more"><u-icon name="more-dot-fill" color="rgb(203,203,203)"></u-icon></view>
        					<view class="logistics btn">查看物流</view>
        					<view class="exchange btn">卖了换钱</view>
        					<view class="evaluate btn">评价</view>
        				</view>
        			</view>
        			<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
        		</view>
        	</scroll-view>
        </swiper-item>
	</view>
</template>

<script>
	export default {
		props: {
			current:{
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				orderList: [[], [],[],[]],
				dataList: [
					{
						id: 1,
						store: '夏日流星限定贩卖',
						deal: '交易成功',
						goodsList: [
							{
								goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								type: '灰色;M',
								deliveryTime: '付款后30天内发货',
								price: '348.58',
								number: 2
							},
							{
								goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
								title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
								type: '45cm;S',
								deliveryTime: '付款后30天内发货',
								price: '135.00',
								number: 1
							}
						]
					},
					{
						id: 2,
						store: '江南皮革厂',
						deal: '交易失败',
						goodsList: [
							{
								goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
								title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
								type: '粉色;M',
								deliveryTime: '付款后7天内发货',
								price: '128.05',
								number: 1
							}
						]
					},
					{
						id: 3,
						store: '三星旗舰店',
						deal: '交易失败',
						goodsList: [
							{
								goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
								title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
								type: '4K，广色域',
								deliveryTime: '保质5年',
								price: '1998',
								number: 3
							},
							{
								goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
								title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
								type: '容量大，速冻',
								deliveryTime: '保质5年',
								price: '2354',
								number: 1
							}
						]
					},
					{
						id: 4,
						store: '三星旗舰店',
						deal: '交易失败',
						goodsList: [
							{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
								title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
								type: '4K，广色域',
								deliveryTime: '珍藏10年好酒',
								price: '1543',
								number: 3
							},
							{
								goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
								title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
								type: '一打',
								deliveryTime: '口感好',
								price: '120',
								number: 1
							}
						]
					}
				],
				loadStatus: ['loadmore','loadmore','loadmore','loadmore']
			}
		},
		onReady() {
		    
		},
		mounted() {
			
		},
		methods: {
			// 页面数据
			getOrderList(idx) {
				for(let i = 0; i < 5; i++) {
					let index = this.$u.random(0, this.dataList.length - 1);
					let data = JSON.parse(JSON.stringify(this.dataList[index]));
					data.id = this.$u.guid();
					this.orderList[idx].push(data);
				}
				this.loadStatus.splice(this.current,1,"loadmore")
			},
			reachBottom() {
				// 此tab为空数据
				if(this.current != 2) {
					this.loadStatus.splice(this.current,1,"loading")
					setTimeout(() => {
						this.getOrderList(this.current);
					}, 1200);
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-item {
		height: 100%;
	}
</style>
