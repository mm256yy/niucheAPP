<template>
	<view>
	  <u-navbar back-text="返回" back-icon-size="0" title="车辆求购需求发布" :background="backgroundCom" 
	   :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
	   <view class="view-content">
	   	  <u-form :model="form" ref="uForm" label-width="280" :border-bottom="false">
	   	  	<u-form-item label="业务类型" prop="carmodel">
				<u-radio-group v-model="form.carmodel" size='24' :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio name="0" style="margin-left: 10pt;">网约车 </u-radio>
					<u-radio name="1" style="margin-left: 10pt;">出租车 </u-radio>
				</u-radio-group>
				<text style="position: absolute;top: 8pt;left: 40pt;font-size: 10pt;color: #7E7E7E;">（必选一项）</text>
	   	  	</u-form-item>
			<view style="background-color: #dedede;font-size: 10pt;padding: 5pt 0;">* 以下为加分项，可以不设置。</view>
			<u-form-item label="意向品牌" prop="intentionbrand" label-position="top">
				<u-checkbox-group active-color="#6DD99C" @change="radioGroupChange" shape="circle">
					<u-checkbox v-model="item.checked" size='24' v-for="(item, index) in brandList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-row>
				<u-col span="8"><u-input v-model="value" :border="true" placeholder="请输入车辆品牌"/></u-col>
				<u-col span="3"><u-button type="success" shape='circle' class="btn-agree">添加</u-button></u-col>
			</u-row>
			<u-form-item label="车型" label-position="top">
				<u-checkbox-group active-color="#6DD99C" @change="radioGroupChange" shape="circle">
					<u-checkbox v-model="item.checked" size='24' v-for="(item, index) in modelList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="动力" label-position="top">
				<u-checkbox-group active-color="#6DD99C" @change="radioGroupChange" shape="circle">
					<u-checkbox v-model="item.checked" size='24' v-for="(item, index) in powerList" :key="index" :name="item.name">
						{{ item.name }}
					</u-checkbox>
				</u-checkbox-group>
			</u-form-item>
			<u-form-item label="月租" prop="carmodel" label-position="top">
				<u-radio-group v-model="form.carmodel" size='24' :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in rentList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="车龄" prop="carmodel" label-position="top">
				<u-radio-group v-model="form.carmodel" size='24' :active-color="'#6DD99C'" style="text-align: right;">
					<u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in ageList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
			<u-form-item label="行驶里程" prop="carmodel" label-position="top">
				<u-radio-group v-model="form.carmodel" size='24' :active-color="'#6DD99C'" style="text-align: right;">
				  <u-radio :name="item.name" style="margin-left: 10pt;" v-for="(item,index) in mileageList" :key="index">{{item.text}}</u-radio>
				</u-radio-group>
			</u-form-item>
		  </u-form>	
	   </view>
		<view style="text-align: center; padding: 5pt 20pt;margin-top: 10pt;">
			<u-button type="success" shape='circle' class="btn-agree" @click="toNext">发布</u-button>
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
					carmodel:'',
					intentionbrand:''
				},
				value:'',
				brandList:[{name: '比亚迪',checked: false},{name: '北汽新能源',checked: false},{name: '丰田',checked: false},
						{name: '日产',checked: false},{name: '大众',checked: false},{name: '吉利',checked: false}],
				modelList:[{name:'轿车',checked: false},{name:'SUV',checked:false},{name:'MPV',checked: false},{name:'其他',checked: false}],
				powerList:[{name:'纯电动',checked: false},{name:'插电混动',checked:false},{name:'燃油车(含油电混动)',checked: false}],
				rentList:[{name: '0',text:'3000以内(含3000)' },{name: '1',text:'3000以上' }],
				ageList:[{name: '0',text:'1年内' },{name: '1',text:'1年-3年' },{name: '2',text:'3年-5年' },{name: '3',text:'5年以上' }],
				mileageList:[{name: '0',text:'新车(300公里以内)' },{name: '1',text:'300公里-2万公里' },{name: '2',text:'2万公里-5万公里' },
				 {name: '3',text:'5万公里-10万公里' },{name: '0',text:'10万公里-20万公里' },{name: '1',text:'20万公里-30万公里' },{name: '2',text:'30万公里以上'},
				]
			}
		},
		methods: {
			radioGroupChange(e) {
				this.form.intentionbrand = e;
			},
			toNext(){
				this.$u.route("/pages/company/lease/step/stepCards/stepCards")
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
