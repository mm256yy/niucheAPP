<template>
	<view class="filter">
	  <u-navbar back-text="返回" back-icon-size="0" title="更多筛选条件" :background="backgroundDri" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"><view @click="history()" style="color: #fff;margin-right: 20rpx;font-size: 30rpx;" slot="right">
		   历史</view></u-navbar>
	   <view class="view-content">
		   <view class="name">比亚迪+宝马 / 3万以内</view>
	   	  <u-form :model="form" ref="uForm" label-width="280" :border-bottom="false">
	   	  	<u-form-item label="业务类型" prop="businesstype">
				<u-radio-group v-model="form.businesstype" @change="radioGroupChange" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">不限 </u-radio>
					<u-radio name="1" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="2" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group>
				<text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text>
	   	  	</u-form-item>
			<u-form-item label="意向品牌(多选)" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="brandGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in brandList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-row>
				<u-col span="8"><u-input v-model="value" maxlength="30" :border="true" placeholder="请输入车辆品牌"/></u-col>
				<u-col span="3"><u-button type="success" shape='circle' class="btn-agree" @click="addBrand">添加</u-button></u-col>
			</u-row>
			<u-form-item label="车型(多选)" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="modelGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in modelList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="动力(多选)" label-position="top">
				<u-checkbox-group active-color="#FFA032" @change="powerGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in powerList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="月租" label-position="top">
				<u-radio-group @change="radioGroupChangeRent" v-model="priceid"  :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in rentList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="车龄" label-position="top">
				<u-radio-group @change="radioGroupChangeAge" v-model="carage" :active-color="'#FFA032'" style="text-align: right;">
					<u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in ageList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="行驶里程" label-position="top">
				<u-radio-group @change="radioGroupChangeKm" v-model="form.km" :active-color="'#FFA032'" style="text-align: right;">
				  <u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in objType[radioType]" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
		  </u-form>	
	   </view>
		<view class="bottom">
			<view class="btn">重置</view>
			<view class="total" @click="result()">当前选择条件的检索结果，共{{total}}条>></view>
		</view>
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				form: {
				  businesstype: '',
				  carbrand: '',
				  cartype: '',
				  city: '杭州',
				  startCarAge: '',
				  endCarAge: '',
				  startPriceid: '',
				  endPriceid: '',
				  km: '',
				  power: '',
				  islogin: ''
				},
				priceid: '',
				carage: '',
				total: '',
				value:'',
				brandList:[{name: '比亚迪',checked: false},{name: '北汽新能源',checked: false},{name: '丰田',checked: false},
						{name: '日产',checked: false},{name: '大众',checked: false},{name: '吉利',checked: false},
						{name: '本田',checked: false},{name: '北京现代',checked: false}],
				modelList:[{name:'轿车',checked: false},{name:'SUV',checked:false},{name:'MPV',checked: false},{name:'其他',checked: false}],
				powerList:[{name:'纯电动',checked: false},{name:'插电混动',checked:false},{name:'燃油车(含油电混动)',checked: false}],
				rentList:[{name: '1',text:'不限' },{name: '2',text:'2000以内' },{name: '3',text:'2000-3000' },{name: '4',text:'3000-4000' },{name: '5',text:'4000以上' }],
				ageList:[{name: '1',text:'不限' },{name: '2',text:'1年内' },{name: '3',text:'1年-3年' },{name: '4',text:'3年-5年' },{name: '5',text:'5年以上' }],
				objType:{
					wycList:[{name: '0',text:'0-2万公里' },{name: '1',text:'2-5万公里'},{name: '2',text:'5-10万公里' },{name: '3',text:'10-20万公里' },
					     {name: '4',text:'20-30万公里' },{name: '5',text:'30万公里以上'},],
					      czcList:[{name: '0',text:'0-2万公里' },{name: '1',text:'2-5万公里' },
					      {name: '2',text:'5-10万公里' },{name: '3',text:'10-20万公里' },{name: '4',text:'20-30万公里' },
					      {name: '5',text:'30-50万公里' },{name: '6',text:'50-70万公里' },{name: '7',text:'70万公里以上'}],
				},
				radioType:'wycList'
			}
		},
		computed:{
			...mapGetters(['token'])
		},
		mounted() {
			const token = this.token;
			if(token) {
				this.form.islogin = 1
			}else{
				this.form.islogin = 0
			}
			this.select()
		},
		methods: {
			brandGroupChange(e) {
				this.form.intentionbrand = e;
				this.select()
				},
			powerGroupChange(e) {
				this.form.power = e;
				this.select()
				},
			modelGroupChange(e) {
				this.form.carmodel = e;
				this.select()
				},
			radioGroupChange(e){
				this.radioType = e=== '1'?'wycList':'czcList'
				this.select()
			},
			radioGroupChangeRent(e){
				if(priceid == 1) {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
				}
				if(priceid == 2) {
					this.form.startPriceid = '';
					this.form.endPriceid = '2000';
				}
				if(priceid == 3) {
					this.form.startPriceid = '2000';
					this.form.endPriceid = '3000';
				}
				if(priceid == 4) {
					this.form.startPriceid = '3000';
					this.form.endPriceid = '4000';
				}
				if(priceid == 5) {
					this.form.startPriceid = '4000';
					this.form.endPriceid = '';
				}
				this.select()
			},
			radioGroupChangeAge(e){
				if(carage == 1) {
					this.form.startPriceid = '';
					this.form.endPriceid = '';
				}
				if(carage == 2) {
					this.form.startPriceid = '';
					this.form.endPriceid = '1';
				}
				if(carage == 3) {
					this.form.startPriceid = '1';
					this.form.endPriceid = '3';
				}
				if(carage == 4) {
					this.form.startPriceid = '3';
					this.form.endPriceid = '5';
				}
				if(carage == 5) {
					this.form.startPriceid = '5';
					this.form.endPriceid = '';
				}
				this.select()
			},
			radioGroupChangeKm(e){
				this.select()
			},
			addBrand(){
				if (this.value){
					this.brandList.push({name:this.value,checked:false})
					this.value = ''
				}
			},
			select(){
				// if (this.form.mainBusiness === ''){
				// 	this.$u.toast('请选择业务类型');
				// 	return
				// }
				const params = Object.assign(this.form, {
					pageNum: 1,
					pageSize: 10,
					isCount: 1
				});
				this.$u.api.homeRent(params).then(res=>{
					if(res.code === 200){
						this.total = res.total;
					}else {
						 this.$u.toast(res.message);
					}
				})
			},
			history() {
				this.$u.route('/pages/index/driver/components/index/historyRent');
			},
			result() {
				this.$u.route('/pages/index/driver/components/index/resultRent',{form:JSON.stringify(this.form)});
			}
		}
	}
</script>

<style lang="scss">
.scroll-container {height: 100%;}
page{
	background-color:#f5f5f8 ;
	height: 100%;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}

.view-content{
	margin-top: 20pt;padding: 0 10pt;
	.name {
		padding: 39rpx;
		width: 670rpx;
		height: 148rpx;
		font-size: 28rpx;
		background: #fff;
	}
}
 .btn-agree{
	background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
 }
 .filter {
	 .u-slot-content {
		 width: 100rpx;
		 color: #fff;
		 float: right;
	 }
	 .bottom .btn {
		 width: 200rpx;
		 height: 80rpx;
		 line-height: 80rpx;
		 text-align: center;
		 color: #fff;
		 background: linear-gradient(115deg, $bg-grad-FE, $bg-grad-FCD);
		 float: left;
	 }
	 .total {
		 line-height: 80rpx;
		 margin-left: 20rpx;
		 float: left;
	 }
 }
</style>
