<template>
	<view>
		<u-navbar  back-text="杭州" back-icon-size="0" back-icon-color="#333333" title="" :background="background" title-color="#333333" v-show="navBarShow">
			<view class="navbar-right" slot="right">
				<view class="message-box right-item" @click="message">
					<u-icon name="bell" color="#333333" size="38"></u-icon>
					<u-badge size="mini" type="error" :count="num" :offset="[-10,-14]"></u-badge>
				</view>
			</view>
		</u-navbar>
		<scroll-view scroll-y style="height: 1000px;width: 100%;" @scroll="scrollView" @@scrolltoupper="scrollToupper">
			<view class="wrap">
				<u-swiper :list="list" height="500" mode="round" @click="toSwiperPage"></u-swiper>
				<view style="position: absolute;top: 40px;left: 2%;color: #fff;font-size: 10pt;" v-show="!navBarShow">
					杭州 
					<!-- <u-icon name="arrow-down-fill" color="#ffffff" size="26" style="margin-left: 4px;"></u-icon> -->
					</view>
				<view style="position: absolute;top: 40px;right: 2%;" @click="message" v-show="!navBarShow">
					<view style="position: relative;">
						<u-icon name="bell" color="#ffffff" size="38"></u-icon>
						<u-badge size="mini" type="error" :count="num" :offset="[-10,-14]"></u-badge>
					</view>
				</view>
			</view>
			<view class="bg_btn">
				<view style="width: 164px;" @click="toPage(1)">
					<u-image src="../../static/cheliangzulin@3x.png" height="140rpx" border-radius="8"></u-image>
				</view>
				<view style="width: 164px;" @click="toPage(2)">
					<u-image src="../../static/sijizhaopin@3x.png" height="140rpx" border-radius="8"></u-image>
				</view>
			</view>
			<view class="kszc">
				<view style="font-size: 20px;color: #333333;padding: 10px 0;">快速找车</view>
				<view style="display: flex;justify-content: space-around;">
					<view v-for="(item,index) in tuBiaoList" :key="index" style="width: 17%;" @click="toIndexCar(item.text)">
						<u-image :src="item.url" height="110rpx"></u-image>
						<view class="kszc_title">{{item.text}}</view>
					</view>
				</view>

				<view style="margin-top: 10pt;">
					<view class="money_tag" v-for="(info,index) in moneyList" :key="index" @click="toIndexId(info.id)">
						{{info.text}}
					</view>
				</view>
			</view>
			<view class="djhc">
				<view class="djhc_title">低价好车</view>
				<view class="djhc_link" @click="toChild(1)">
					<text>平台精选好车，价低质不低</text>
					<view>
						<u-icon name="arrow-right" color="#FF5A00" size="38"></u-icon>
					</view>
				</view>
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="scroll-view-item_H" @click="toView(item.comparymainid)" :style="{marginLeft:index==0?'10px':0}" v-for="(item, index) in lowPriceList"
					 :key="item.comparymainid">
						<view style="background: #FFFFFF;">
							<u-image :src="item.photourl" height="166rpx" border-radius="8"></u-image>
						</view>
						<view class="bg_fff" style="padding: 4px 4px 0;">
							<view class="djhc_model u-line-1">{{item.carname}}</view>
							<view class="djhc_power u-line-1">{{item.power}}/{{item.carage}}</view>
							<view class="djhc_money">{{item.lowprice}}元/月</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="xcfl">
				<view class="xcfl_title">新春福利</view>
				<view class="xcfl_link" @click="toChild(2)">
					<text>送油 送保养 送免租</text>
					<view>
						<u-icon name="arrow-right" color="#6D6D6D" size="38"></u-icon>
					</view>
				</view>
				<swiper :current="swiperCurrent" indicator-dots="true" indicator-color="#f5f5f5" indicator-active-color="#FF5A00"
				 style="height: 180px;">
					<swiper-item class="swiper-item" v-for="(item, index) in list" :key="index">
						<view style="display: flex;justify-content: space-around;padding: 0 10px;">
							<view v-for="(info,index) in welfareList[index]" :key="info.comparymainid" @click="toView(info)"
							 style="" class="swiper_xcfl">
								<u-image :src="info.photoUrl" height="168rpx" border-radius="8" class="border_radius"></u-image>
								<view class="swiper_price">¥{{info.packPrice}}/月</view>
								<view class="bg_fff" style="padding:12px 4px 6px;box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);">
									<view class="djhc_model u-line-1">{{info.carBrand}} {{info.carText}}</view>
									<view class="djhc_power u-line-1">{{info.companyNickName || info.companyName}}</view>
								</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="xcfl" style="padding-bottom: 40pt;">
				<view class="xcfl_title">优质商家推荐</view>
				<view class="xcfl_link">
					<text>好商家，租车安心首选</text>
				</view>
				<view style="padding:10px 15px;" v-for="(item,index) in companyList" >
					<u-row >
						<u-col span="4" @click="toShopPage(item.userMainId)">
							<view style="background: #FFFFFF;">
								<u-image :src="item.companyLogoPhoto" height="180rpx" border-radius="8"></u-image>
							</view>
							
						</u-col>
						<u-col span="8" @click="toShopPage(item.userMainId)">
							<view style="color: #000000;font-size: 12pt;">{{item.companyName}}</view>
							<view style="text-align: right;padding: 8px 0;">
								<u-icon name="arrow-right" color="#6D6D6D" size="38"></u-icon>
							</view>
							<view class="u-line-1" style="color: #6D6D6D;">{{item.companyIntro}}</view>
						</u-col>
					</u-row>
				</view>
			</view>
		</scroll-view>
		<phone-auth :id="comparyid" :status="4" v-show="openShow" ref="other"></phone-auth>
	</view>
</template>

<script>
	import {
		format
	} from '@/common/rule.js'
	import phoneAuth from '@/components/phoneAuth.vue'
	export default {
		components: {
			phoneAuth
		  },
		data() {
			return {
				comparyid:'',
				openShow:false,
				background: {
					'background-image': 'linear-gradient(to bottom, #000000 36%,#ffffff 0%)'
				},
				list: [{
					image: '../../static/banner_1@3x.png'
				}, {
					image: '../../static/banner_2@3x.png'
				}, {
					image: '../../static/banner_3@3x.png'
				}],
				tuBiaoList: [{
						url: '../../static/biyadi@2x.png',
						text: '比亚迪'
					},
					{
						url: '../../static/rongwei@2x.png',
						text: '荣威'
					},
					{
						url: '../../static/beiqixinnnegyuan@2x.png',
						text: '吉利'
					},
					{
						url: '../../static/changan@2x.png',
						text: '长安'
					},
					{
						url: '../../static/richan@2x.png',
						text: '东风'
					}
				],
				moneyList: [{
					text: '2千/月',
					id: 2
				}, {
					text: '2-3千/月',
					id: 3
				}, {
					text: '3-4千/月',
					id: 4
				}, {
					text: '4千以上/月',
					id: 5
				}],
				searchForm: {
					businesstype: '',
					carbrand: '',
					cartype: '',
					city: '杭州',
					startCarAge: '',
					endCarAge: '',
					startPriceid: '',
					endPriceid: '',
					pageNum: 1,
					pageSize: 10,
					km: '',
					power: '',
					islogin: ''
				},
				title: '不限',
				lowPriceList: [],
				welfareList: [],
				swiperCurrent: 0,
				num: 0,
				time: '',
				swiperList: [],
				navBarShow: false,
				companyList: [
		{
        "userMainId": "90870526117023744",
        "createTime": "7/12/2020 10:32:31",
        "companyName": "浙江车壹网络科技有限公司",
        "companyAbbreviation": "车壹资本",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/90869528115941376",
        "companyIntro": "车壹融资租赁（天津）有限公司（以下简称车壹融资），创立于2016年5月，注册资本人民币30000万元，总部位于浙江省杭州市，是一家为汽车全产业链提供服务的综合性汽车服务平台，业务范围涵盖汽车贸易、汽车金融服务、汽车租赁服务、汽车后市场服务和车联网服务等。\n车壹融资旗下现已在“限牌”热门地区设立宁波车壹、绍兴车壹、南京车壹、成都车壹等分支机构，并在浙江省内拥有覆盖全省的多家经营性汽车租赁公司。\n车壹融资以互联网思维和平台化运作来经营汽车（融资）租赁业务，打破了汽车租赁行业的重资产模式，运用全新的模式打造了一个整合司机、资本、车辆的平台。结合银行、投资机构、汽车厂商、4S店、网络叫车平台等，为用户"
      },
      {
        "userMainId": "86890184045629440",
        "createTime": "26/11/2020 11:01:59",
        "companyName": "杭州俊程汽车服务有限公司",
        "companyAbbreviation": "",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/86888148520538112",
        "companyIntro": "公司主要片"
      },
      {
        "userMainId": "89487811903885312",
        "createTime": "3/12/2020 13:54:29",
        "companyName": "杭州御匾会汽车服务有限公司",
        "companyAbbreviation": "杭州御匾会汽车服务有限公司",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/89478461370011648",
        "companyIntro": "公司于2015年03月03日成立。法定代表人张伟，公司经营范围包括：普通货运，汽车道路救援服务，汽车租赁、咨询服务，汽车代驾，汽车事务代理，二手车经营；停车软件开发；汽车销售；停车服务；房屋租赁；其他无需报经审批的一切合法项目。"
      },
      {
        "userMainId": "89872153863917568",
        "createTime": "4/12/2020 16:30:41",
        "companyName": "浙江妙达新能源科技有限公司",
        "companyAbbreviation": "妙达",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/89869389708529664",
        "companyIntro": "专业从事网约车租金，网约车销售，公司自建网约车出行平台，网约车售后维修厂，全方面服务每一个驾驶员。"
      },
      {
        "userMainId": "89885300641370112",
        "createTime": "4/12/2020 14:00:07",
        "companyName": "杭州赢泰科技有限公司",
        "companyAbbreviation": "逸乘出行",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/89884174676267008",
        "companyIntro": "高德打车平台——逸乘出行，招募自营司机，车辆免租金，代缴社保，底薪10500加提成加奖励！"
      },
  
      {
        "userMainId": "91302989003886592",
        "createTime": "8/12/2020 15:09:19",
        "companyName": "杭州越途汽车服务有限公司",
        "companyAbbreviation": "杭州越途汽车服务有限公司",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/91298796335665152",
        "companyIntro": "杭州越途汽车服务有限公司是杭州时空电动旗下的全资子公司，有成熟的管理经验,配套专业的业务知识培训,专业及时有效的服务追踪体系,公司提供优势车辆给司机,方案灵活。目前拥有大约2000辆合规网约车。"
      },
      {
        "userMainId": "91970672548515840",
        "createTime": "10/12/2020 11:27:29",
        "companyName": "浙江美途出行汽车服务有限公司",
        "companyAbbreviation": "美途出行",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/91967899916439552",
        "companyIntro": "我公司是杭州5年以上的网约车租赁公司，是滴滴等网约车平台的长期合作伙伴，名下自有车辆500多台，800多个司机。选择我们就等于选择可靠，选择安心。"
      },
      {
        "userMainId": "92022474245541888",
        "createTime": "10/12/2020 14:42:48",
        "companyName": "杭州蓝鲸智享汽车科技有限公司",
        "companyAbbreviation": "蓝鲸智享",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/92017921487933440",
        "companyIntro": "杭州蓝鲸智享汽车有限公司是T3出行旗下合资企业，专注于在出行领域提供专业化的网约车运力运营服务。公司秉承“服务第一，诚信至上”的管理理念，致力于为广大司机提供专业、优质的服务方案。\n作为杭州第一家T3出行落地运营服务商，蓝鲸智享团队凭借着在共享出行、车联网大数据、金融风控、汽车租赁等方面的积累和经验，打造了一支集司服运营、汽车租赁、维修保养、云计算、大数据风控等领域人才的专业团队，建立规范化的制度和完善的服务体系，为司机提供专业、系统的培训、具有竞争力的薪酬福利和个人职业发展规划。\n目前，蓝鲸智享在职司机700+，公司注重员工关怀和团队建设，定期组织团建文化活动、节日福利等，培养出一批优秀、专"
      },
      {
        "userMainId": "92300933601562624",
        "createTime": "11/12/2020 09:26:25",
        "companyName": "杭州高佳汽车租赁有限公司",
        "companyAbbreviation": "高佳汽车租赁",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/92299898816434176",
        "companyIntro": "我公司为杭州滴滴长期车辆供应伙伴，名下有200多台网约车可供司机选择。"
      },
      {
        "userMainId": "94490448659353600",
        "createTime": "17/12/2020 09:40:02",
        "companyName": "杭州广途商务服务有限公司",
        "companyAbbreviation": "广途",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/94477994416017408",
        "companyIntro": "杭州广途商务服务有限公司成立于2015年12月，总部位于浙江省杭州市。广途借鉴业内优秀公司的成功经验，提高专业性，公司配备对应的车管人员、司管人员以及司机培训讲师，打造专业的团队。同时积极实践互联网＋的理念，配合滴滴出行投身于网约车事业的推广并最终成为网约车行业领导者---滴滴出行的合作伙伴。\n公司坚持以人为本、服务至上的理念。对内不断完善企业内控制度，对外在遵守商业道德的前提下不断的发展经营。"
      },
      {
        "userMainId": "95230589183070208",
        "createTime": "18/12/2020 13:05:10",
        "companyName": "杭州逸尘汽车服务有限责任公司",
        "companyAbbreviation": "杭州逸尘汽车服务有限公司",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/95230124714233856",
        "companyIntro": "逸尘是杭州T3国企最新的UP网约车公司！欢迎各大网约车司机来公司发展！"
      },
      {
        "userMainId": "96388201324875776",
        "createTime": "22/12/2020 14:36:27",
        "companyName": "杭州知行汽车服务有限公司",
        "companyAbbreviation": "杭州知行汽车服务有限公司",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/96387139608121344",
        "companyIntro": "网约车租赁与销售"
      },
      {
        "userMainId": "96757977708630016",
        "createTime": "2/12/2020 15:47:50",
        "companyName": "杭州乐腾新能源汽车服务有限公司",
        "companyAbbreviation": "乐到新能源",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/96756703512629248",
        "companyIntro": "“乐到新能源”集团成立于2017年。早在2011年起乐到已携手上海创驱共同研发电车驱动系统，并拟定全国新能源汽车战略版图。公司专注于新能源汽车技术研发、\n   整车定制生产，并衍生开拓新商用租赁服务和互联网汽车新零售平台。乐到致力于成为产业链上下游一体化发展的新能源汽车综合运营服务商。浙江乐到在长达6年的技术\n   研发实践中稳步上行，联合多家知名车企推出数款电动车型，实现多区域联袂合作，共同发展。\n    截止目前，公司已在全国12座城市开展新能源汽车租赁、销售业务，上线运营车辆7000多台。2019年业务版图将在此基础上扩展至30座以上大中城市。"
      },
      {
        "userMainId": "97070532972908544",
        "createTime": "24/12/2020 13:15:20",
        "companyName": "杭州瑾涵科技有限公司",
        "companyAbbreviation": "杭州瑾涵",
        "companyLogoPhoto": "http://niuche-default.neocab.cn/97069615519240192",
        "companyIntro": "公司目前主经营吉利帝豪EV300纯电车出租，公司目前跟曹操，携华，添猫，阳光，飞嘀，蓝色大道合作招募司机"
      },
  ]
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			scrollView(e) {
				if(e.target.scrollTop>50){
					this.navBarShow = true;
				} else {
					this.navBarShow = false
				}
			},
			scrollToupper(){
				this.navBarShow = false
			},
			toIndexId(id) {
				if (id === 2) {
					this.searchForm.startPriceid = '0';
					this.searchForm.endPriceid = '2000';
					this.title = '不限/2000以内';
				}
				if (id === 3) {
					this.searchForm.startPriceid = '2000';
					this.searchForm.endPriceid = '3000';
					this.title = '不限/2000-3000';
				}
				if (id === 4) {
					this.searchForm.startPriceid = '3000';
					this.searchForm.endPriceid = '4000';
					this.title = '不限/3000-4000';
				}
				if (id === 5) {
					this.searchForm.startPriceid = '4000';
					this.searchForm.endPriceid = '-1';
					this.title = '不限/4000以上';
				}
				this.$u.route('/pages/index/driver/components/index/resultRent', {
					form: JSON.stringify(this.searchForm),
					title: this.title
				});
			},
			toIndexCar(text) {
				this.title = '不限/' + text;
				this.searchForm.carbrand = text;
				this.$u.route('/pages/index/driver/components/index/resultRent', {
					form: JSON.stringify(this.searchForm),
					title: this.title
				});
			},
			getList() {
				this.$u.api.driverSideHomePage({
					pageNum:1,
					pageSize:6
				}).then(res => {
					if (res.code === 200) {
						this.lowPriceList = res.rows
					} else {
						this.$u.toast(res.msg);
					}
				})
				this.getWelfareList()
				this.getMessageNum()
				this.getYzsjList()
			},
			toShopPage(id){
				this.comparyid = id;
				this.openShow = true;
				this.$refs.other.getStatus()
			},
			getYzsjList(){
				uni.request({
					url: 'http://image.neocab.cn/yzsj',//接口地址
					success: (res) => {
						if(res.statusCode === 200){
							this.companyList = res.data.RECORDS;
						} 
					 }
				});
			},
			getWelfareList() {
				this.$u.api.getYearWelfare({
					pageNum: 1,
					pageSize: 9,
					orderByColumn: "newyear.sort",
					isAsc: "desc"
				}).then(res => {
					if (res.code === 200) {
						let data = res.rows;
						let arr0 = data.slice(0, 3)
						let arr1 = data.slice(3, 6)
						let arr2 = data.slice(6, 9)
						this.welfareList = [arr0, arr1, arr2]
					} else {
						this.$u.toast(res.msg);
					}
				})
			},
			getMessageNum() {
				let token = uni.getStorageSync('token');
				if (token) {
					this.$u.api.haveIs().then(res => {
						if (res.code === 200) {
							this.num = res.object.titlenum;
							this.time = format(res.object.recentlytime, 'yyyy-MM-dd HH:mm');
						} else {
							this.$u.toast(res.msg);
						}
					})
				}
			},
			toSwiperPage(index) {
				if (index === 0) {
					this.toChild(1)
				} else if (index === 1) {
					this.toChild(2)
				} else {
					this.$u.route('/pages/driver/inviteFriends/inviteFriends')
				}
			},
			message() {
				let token = uni.getStorageSync('token');
				if (token) {
					this.$u.route("/pages/index/company/components/index/message", {
						time: this.time
					})
				} else {
					this.$u.route('/pages/login/login');
				}
			},
			toPage(type) {
				if (type === 1) {
					this.$u.route({
						url: '/pages/index/index',
						type: 'switchTab'
					})
				} else {
					this.$u.route({
						url: '/pages/mymessage/mymessage',
						type: 'switchTab'
					})
				}
			},
			toChild(type) {
				if (type === 1) {
					this.$u.route({
						url: '/pages/init/affordableCar',
					})
				} else {
					this.$u.route({
						url: '/pages/init/newYearWelfare',
					})
				}
			},
			toView(item) {
				this.$u.route('/pages/index/driver/components/index/carRentDetail', {
					id: item.comparymainid,
					tags: item.params
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navbar-left {
		margin-left: 24rpx;
	}

	.navbar-right {
		margin-right: 24rpx;
		display: flex;
	}

	.right-item {
		margin: 0 12rpx;
		position: relative;
		// color: #ffffff;
		display: flex;
	}

	.wrap /deep/ .u-swiper-indicator {
		bottom: 60px !important;
	}

	.wrap_text_left {
		position: absolute;
		top: 20px;
		left: 1%;
		color: #fff;
		font-size: 16px;
	}

	.wrap_text_right {
		position: absolute;
		top: 20px;
		right: 1%;
	}

	.bg_btn {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: -40px;
	}
    .swiper_xcfl{
		width: 31%;position: relative;background-color: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	}
	.kszc {
		padding: 15px;

		.kszc_title {
			color: #333333;
			height: 30pt;
			line-height: 30pt;
			font-size: 12px;
			text-align: center;
		}
	}

	.kszc_tb {
		display: flex;
		justify-content: space-between;
		// align-items: center;
	}

	.money_tag {
		display: inline-block;
		width: 22%;
		margin-right: 3%;
		background: #F6F6F6;
		text-align: center;
		padding: 8px 0;
		font-size: 10pt;
		border-radius: 4px;
		color: #333333;
	}

	.djhc {
		background-image: url('../../static/dijiahaoche@2x.png');
		background-size: 100%;
		background-size: cover;
		height: 268px;

		.djhc_title {
			color: #FF5A00;
			font-size: 20px;
			padding: 10px;
		}

		.djhc_link {
			color: #FF5A00;
			font-size: 14px;
			padding: 0 10px 10px;
			display: flex;
			justify-content: space-between;
		}



		.djhc_money {
			color: #FF5A00;
			font-size: 14px;
			padding: 4px 0;
		}
	}
    .border_radius{
		border-top-left-radius: 4px;
		    border-top-right-radius: 4px;
		    border-bottom-right-radius: 0px;
		    border-bottom-left-radius: 4px;
	}
	.xcfl {
		background: #FFFFFF;

		.xcfl_title {
			font-size: 20px;
			padding: 10px;
			color: #000000;
		}

		.xcfl_link {
			font-size: 14px;
			padding: 0 10px 20px;
			display: flex;
			color: #6D6D6D;
			justify-content: space-between;
		}
	}

	.bg_fff {
		background-color: #FFFFFF;
		text-align: center;

		.djhc_model {
			color: #333;
			padding: 2px 0;
		}

		.djhc_power {
			color: #6D6D6D;
			padding: 2px 0;
		}
	}

	.swiper_price {
		position: absolute;
		top: 72px;
		left: 17%;
		width: 74px;
		color: #FFFFFF;
		text-align: center;
		background: linear-gradient(270deg, #FF342D 0%, #FF4600 44%, #FF5A00 100%);
		border-radius: 4px 0px 4px 0px;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item_H {
		display: inline-block;
		width: 36%;
		margin-right: 10pt;
		text-align: center;
	}
</style>
