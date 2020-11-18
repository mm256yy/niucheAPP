<template>
	<view class="filter">
	  <u-navbar back-text="返回" back-icon-size="0" title="筛选" :background="backgroundCom" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"><view @click="history()" style="color: #fff;margin-right: 20rpx;font-size: 30rpx;" slot="right">
		   历史</view></u-navbar>
	   <view class="view-content">
		   <view class="name">{{addkey}}</view>
	   	  <u-form :model="form" ref="uForm" label-width="280" :border-bottom="false">
	   	  	<u-form-item label="业务类型(必选)" label-position="top">
				<u-radio-group v-model="form.businessType" @change="radioGroupChange" :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">不限 </u-radio>
					<u-radio name="1" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="2" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group>
				<!-- <text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text> -->
	   	  	</u-form-item>
			<u-form-item label="品牌" label-position="top">
				<u-checkbox-group active-color="#6DD99C" @change="brandGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in brandList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-row>
				<u-col span="8"><u-input v-model="value" maxlength="30" :border="true" placeholder="请输入车辆品牌"/></u-col>
				<u-col span="3"><u-button type="success" shape='circle' class="btn-agree" @click="addBrand">添加</u-button></u-col>
			</u-row>
			<u-form-item label="车型" label-position="top">
				<u-checkbox-group active-color="#6DD99C" @change="modelGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in modelList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="动力" label-position="top">
				<u-checkbox-group active-color="#6DD99C" @change="powerGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in powerList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="打包价" label-position="top">
				<u-radio-group @change="radioGroupChangePrice" v-model="form.packprice"  :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in priceList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="车龄" label-position="top">
				<u-radio-group @change="radioGroupChangeAge" v-model="carage"  :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in ageList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="行驶里程" label-position="top">
				<u-radio-group @change="radioGroupChangeKm" v-model="form.km"  :active-color="'#6DD99C'" style="text-align: right;">
				  <u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in objType[radioType]" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
		  </u-form>	
	   </view>
		<view class="bottom">
			<view class="btn" @click="reset()">重置</view>
			<view class="total" @click="result()">当前选择条件的检索结果，共{{total}}条>></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				form:{
					businessType:0,
					carbrand:'',
					cartype:'',
					km: 100,
					power:'',
					packprice:'',
					startCarAge:'',
					endCarAge:''
				},
				carage: '',
				value:'',
				total: '',
				brandList:[{name: '比亚迪',checked: false},{name: '北汽新能源',checked: false},{name: '丰田',checked: false},
						{name: '日产',checked: false},{name: '大众',checked: false},{name: '吉利',checked: false}],
				modelList:[{name:'轿车',checked: false},{name:'SUV',checked:false},{name:'MPV',checked: false},{name:'其他',checked: false}],
				powerList:[{name:'纯电动',checked: false},{name:'插电混动',checked:false},{name:'燃油车(含油电混动)',checked: false}],
				priceList:[{name: '4',text:'不限' },{name: '1',text:'3万以内' },{name: '2',text:'3万-5万' },{name: '3',text:'5万以上' }],
				ageList:[{name: '4',text:'不限' },{name: '0',text:'1年内' },{name: '1',text:'1年-3年' },{name: '2',text:'3年-5年' },{name: '3',text:'5年以上' }],
				objType:{
					wycList:[{name: '',text:'不限' },{name: '1',text:'0-2万公里' },{name: '2',text:'2-5万公里'},{name: '3',text:'5-10万公里' },{name: '4',text:'10-20万公里' },
					     {name: '5',text:'20-30万公里' },{name: '6',text:'30万公里以上'},],
					      czcList:[{name: '',text:'不限' },{name: '1',text:'0-2万公里' },{name: '2',text:'2-5万公里' },
					      {name: '3',text:'5-10万公里' },{name: '4',text:'10-20万公里' },{name: '5',text:'20-30万公里' },
					      {name: '6',text:'30-50万公里' },{name: '7',text:'50-70万公里' },{name: '8',text:'70万公里以上'}],
				},
				radioType:'wycList',
				addkey: '不限',
				businessTypekey: '不限',
				carbrandkey: '',
				cartypekey: '',
				powerkey: '',
				packpricekey: {
					text:''
				},
				caragekey: '',
				kmkey: {
					text:''
				}
			}
		},
		// computed:{
		// 	...mapGetters(['telephone'])
		// },
		// mounted() {
		// 	this.form.userid = this.telephone;
		// },
		mounted() {
			this.select()
		},
		methods: {
			reset() {
				this.form={
					businessType:0,
					km: 100,
					packprice:''
				};
				this.brandList.map( item => {
				  item.checked=false;
				});
				this.modelList.map( item => {
				  item.checked=false;
				});
				this.powerList.map( item => {
				  item.checked=false;
				});
				this.carage='';
				this.addkey = '不限';
			},
			add() {
				this.addkey = this.businessTypekey + (this.carbrandkey?'/':'')+this.carbrandkey + 
				(this.cartypekey?'/':'')+this.cartypekey + (this.powerkey?'/':'')+this.powerkey +
				(this.packpricekey.text?'/':'')+this.packpricekey.text + (this.caragekey?'/':'') + this.caragekey +
				(this.kmkey.text?'/':'')+this.kmkey.text;
			},
			brandGroupChange(e) {
				this.form.carbrand = e.join(',');
				this.carbrandkey = e.join('+');
				this.add()
				this.select()
			},
			powerGroupChange(e) {
				this.form.power = e.join(',');
				this.powerkey = e.join('+');
				this.add()
				this.select()
			},
			modelGroupChange(e) {
				this.form.cartype = e.join(',');
				this.cartypekey = e.join('+');
				this.add()
				this.select()
			},
			radioGroupChange(e){
				this.radioType = e=== '1'?'wycList':'czcList' 
				if(e==='0'){
					this.businessTypekey = '不限'
				}
				if(e==='1'){
					this.businessTypekey = '网约车'
				}
				if(e==='2'){
					this.businessTypekey = '出租车'
				}
				this.add()
				this.select()
			},
			radioGroupChangePrice(e){
				this.packpricekey =  this.priceList.find( item => {
				   if(item.name === e) {
					   return item
				   }
				});
				this.add()
				this.select()
			},
			radioGroupChangeAge(e){
				if(this.carage == '0') {
					this.form.startCarAge = '0';
                    this.form.endCarAge = '1';
					this.caragekey = '1年内';
				}
				if(this.carage == '1') {
					this.form.startCarAge = '1';
				    this.form.endCarAge = '3';
					this.caragekey = '1年-3年';
				}
				if(this.carage == '2') {
					this.form.startCarAge = '3';
				    this.form.endCarAge = '5';
					this.caragekey = '3年-5年';
				}
				if(this.carage == '3') {
					this.form.startCarAge = '5';
				    this.form.endCarAge = '';
					this.caragekey = '5年以上';
				}
				if(this.carage == '4') {
					this.form.startCarAge = '';
				    this.form.endCarAge = '';
					this.caragekey = '不限';
				}
				this.add()
				this.select()
			},
			radioGroupChangeKm(e){
				this.kmkey =  this.objType[this.radioType].find( item => {
				   if(item.name === e) {
					   return item
				   }
				});
				this.add()
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
				this.$u.api.sellCar(params).then(res=>{
					if(res.code === 200){
						this.total = res.total;
					}else {
						 this.$u.toast(res.message);
					}
				})
			},
			history() {
				this.$u.route('/pages/mymessage/company/components/index/history');
			},
			result() {
				this.$u.route('/pages/mymessage/company/components/index/result',{form:JSON.stringify(this.form),title:this.addkey});
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
		// height: 148rpx;
		font-size: 28rpx;
		background: #fff;
	}
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
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
		 background: linear-gradient(115deg,#6DD99C, #37AB63);
		 float: left;
	 }
	 .total {
		 line-height: 80rpx;
		 margin-left: 20rpx;
		 float: left;
	 }
 }
</style>
