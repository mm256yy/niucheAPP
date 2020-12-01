<template>
	<view>
	  <u-navbar back-text="返回" back-icon-size="0" title="车辆求购需求发布" :background="backgroundCom" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
	   	  <u-form :model="form" ref="uForm" label-width="280" :border-bottom="false">
	   	  	<u-form-item label="业务类型(必选)" prop="businesstype">
				<u-radio-group v-model="form.businesstype" @change="radioGroupChange" :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio name="1" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="2" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group>
				<!-- <text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text> -->
	   	  	</u-form-item>
			<!-- <view style="background-color: #dedede;font-size: 10pt;padding: 5pt 0;">* 以下为加分项，可以不设置。</view> -->
			<u-form-item label="意向品牌(多选)" label-position="top">
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
			<u-form-item label="车型(多选)" label-position="top">
				<u-checkbox-group active-color="#6DD99C" @change="modelGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in modelList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="动力(多选)" label-position="top">
				<u-checkbox-group active-color="#6DD99C" @change="powerGroupChange" shape="circle">
					<u-checkbox v-model="item.checked"  v-for="(item, index) in powerList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="打包价" label-position="top">
				<u-radio-group v-model="form.monthzu"  :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in rentList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="数量" label-width="150">
				<u-input v-model="form.intentioncarbrandnum" maxlength="8" type="number" :border="true" placeholder="请输入"/>
			</u-form-item>
			<u-form-item label="车龄" label-position="top">
				<u-radio-group v-model="form.carage"  :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in ageList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="行驶里程" label-position="top">
				<u-radio-group v-model="form.km"  :active-color="'#6DD99C'" style="text-align: right;">
				  <u-radio :name="item.text" style="margin-left: 10pt;" v-for="(item,index) in objType[radioType]" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
		  </u-form>	
	   </view>
		<view style="text-align: center; padding: 5pt 20pt;margin-top: 10pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">发布</u-button>
		</view>
		<u-modal v-model="showTips" @confirm="tipsConfirm"  confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
                信息发布成功
			</view>
		</u-modal>
		<auth></auth>
	</view>
</template>

<script>
	import {list} from "@/utils/index.list.js";
	import auth from '@/components/auth.vue'
	export default {
		components:{
			auth
		},
		data() {
			return {
				backTextStyle:{
					'color':'#ffffff'
				},
				form:{
					userid:'',
					businesstype:1,
					carmodel:[],
					intentionbrand:[],
					power:[],
					monthzu:'',
					carage:'',
					km:'',
					intentioncarbrandnum:''
				},
				value:'',
				brandList:[{name: '比亚迪',checked: false},{name: '北汽新能源',checked: false},{name: '丰田',checked: false},
						{name: '日产',checked: false},{name: '大众',checked: false},{name: '吉利',checked: false}],
				modelList:[{name:'轿车',checked: false},{name:'SUV',checked:false},{name:'MPV',checked: false},{name:'其他',checked: false}],
				powerList:[{name:'纯电动',checked: false},{name:'插电混动',checked:false},{name:'燃油车(含油电混动)',checked: false}],
				rentList:[{name: '0',text:'3万以内' },{name: '1',text:'3万-5万' },{name: '3',text:'5万以上' }],
				ageList:[{name: '0',text:'1年内' },{name: '1',text:'1年-3年' },{name: '2',text:'3年-5年' },{name: '3',text:'5年以上' }],
				objType:{
					wycList:[{name: '0',text:'0-2万公里' },{name: '1',text:'2-5万公里' },
					 {name: '2',text:'5-10万公里' },{name: '3',text:'10-20万公里' },{name: '4',text:'20-30万公里' },
					 {name: '5',text:'30万公里以上'},],
					 czcList:[{name: '0',text:'0-2万公里' },{name: '1',text:'2-5万公里' },
					 {name: '2',text:'5-10万公里' },{name: '3',text:'10-20万公里' },{name: '4',text:'20-30万公里' },
					 {name: '5',text:'30-50万公里' },{name: '6',text:'50-70万公里' },{name: '7',text:'70万公里以上'}],
				},
				radioType:'wycList',
				showTips:false,
				telephone:'',
				AskToShopId:''
			}
		},
		onLoad(option) {
			let id = option.AskToShopId;
			if(id){
				this.AskToShopId = id;
			}
		},
		mounted() {
			this.initStorage();
			if(this.AskToShopId){
				this.editInfo()
			}
		},
		methods: {
			editInfo(){
				this.$u.api.ComparyAskToShopEchoText({AskToShopId:this.AskToShopId}).then(res=>{
					if(res.code === 200){
						let data = res.object;
						 this.form = data;
						 this.radioType = data.businesstype=== '0'?'wycList':'czcList'
						if (data.carmodel){
							let carModel = data.carmodel;
							carModel.forEach(obj=>{
								 this.modelList.forEach(item=>{
									 if(item.name === obj){
										item.checked = true;
									 }
								 })
							})
							console.log(this.modelList)
						}
						 let arr = []
						if (data.intentionbrand){
							 let carCardList = data.intentionbrand;
							 carCardList.forEach(item=>{
								 this.brandList.forEach(obj=>{
									 if(obj.name === item){
										obj.checked = true;
									 }
									arr.push(obj.name)
								 })
							})
							let arrset = new Set(arr);
							carCardList.forEach(item=>{
								if(!arrset.has(item)){
									this.brandList.push({name:item,checked:true})
								}
							})
						}
						if (data.power){
							let power = data.power;
							power.forEach(obj=>{
								 this.powerList.forEach(item=>{
									 if(item.name === obj){
										item.checked = true;
									 }
								 })
							})
					    }
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			initStorage(){
					this.telephone = uni.getStorageSync('telephone');
					this.form.userid = this.telephone;
			},
			
			brandGroupChange(e) {this.form.intentionbrand = e;},
			powerGroupChange(e) {this.form.power = e;},
			modelGroupChange(e) {this.form.carmodel = e;},
			radioGroupChange(e){
				this.radioType = e=== '0'?'wycList':'czcList'
			},
			addBrand(){
				if (this.value){
					this.brandList.push({name:this.value,checked:true})
					this.form.intentionbrand.push(this.value)
					console.log(this.form.intentionbrand)
					this.value = ''
				}
			},
			toNext(){
				if (this.form.intentionbrand.length === 0){
					this.$u.toast('品牌不能为空')
					return
				}
					
				if (this.form.carmodel.length === 0){
					this.$u.toast('车型不能为空')
					return
				}
				if (this.form.power.length === 0){
					this.$u.toast('动力不能为空')
					return
				}
				if (this.form.monthzu === ''){
					this.$u.toast('打包价不能为空')
					return
				}
				if (this.form.intentioncarbrandnum === ''){
					this.$u.toast('数量不能为空')
					return
				}
				if (this.form.carage === ''){
					this.$u.toast('车龄不能为空')
					return
				}
				if (this.form.km === ''){
					this.$u.toast('行驶里程不能为空')
					return
				}
				if (this.form.id){
					this.updateChange()
				} else {
					this.$u.api.saveShoping(this.form).then(res=>{
						if(res.code === '200'){
							this.showTips = true;
						}else {
							 this.$u.toast(res.msg);
						}
					})
				}
			},
			updateChange(){
				this.$u.api.ComparyAskToShopUpdate(this.form).then(res=>{
					if(res.code === '200'){
						this.showTips = true;
					}else {
						 this.$u.toast(res.msg);
					}
				})
			},
			tipsConfirm(){
				this.form = {
					userid:'',
					businesstype:1,
					carmodel:[],
					intentionbrand:[],
					power:[],
					monthzu:'',
					carage:'',
					km:'',
					intentioncarbrandnum:''
				};
				this.brandList=[{name: '比亚迪',checked: false},{name: '北汽新能源',checked: false},{name: '丰田',checked: false},
						{name: '日产',checked: false},{name: '大众',checked: false},{name: '吉利',checked: false}];
				this.modelList=[{name:'轿车',checked: false},{name:'SUV',checked:false},{name:'MPV',checked: false},{name:'其他',checked: false}];
				this.powerList=[{name:'纯电动',checked: false},{name:'插电混动',checked:false},{name:'燃油车(含油电混动)',checked: false}]
				this.$u.route('/pages/company/myPublish/myPublish', {index: 3});
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
}
 .btn-agree{
	background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
 }
</style>
