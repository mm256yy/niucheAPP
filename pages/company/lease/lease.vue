<template>
    <view>
		<u-navbar back-text="返回"  back-icon-size="0" title="租赁车辆发布" :background="{}" :back-text-style="backTextStyle" height='44' title-color="#FFFFFF"></u-navbar>
		<view class="zlcontent">
		   <view class="zlyjdr">一键导入已有车辆为“在租”车辆</view>
		   <view class="zlcontent-mid">
		   	 <text style="font-size:10pt;">* 请注意本页内容除“车辆在租总数”外，其他都是必填项！未填写不能进入下一步</text>
		   </view>
		   <view class="zlcontent-mid">
		   	 <u-form :model="form" ref='uForm'>
		   	 	<u-form-item label="" prop="phone" label-width='0' style="border-bottom: 1px solid #f6f6f6;">
		   	 		<u-input v-model="form.phone" disabled="true" @click="show=true"/>
		   	 	</u-form-item>
		   	 	<u-form-item label="业务类型" prop="role" label-width='100pt'>
		   	 		<u-radio-group v-model="form.role" :active-color="'#6DD99C'" style="text-align: right;">
		   	 			<u-radio name="1" style="margin-left: 10pt;">网约车</u-radio>
		   	 			<u-radio name="2" style="margin-left: 10pt;">出租车</u-radio>
		   	 		</u-radio-group>
		   	 	</u-form-item>
				<u-select v-model="show" :list="list"></u-select>
		   	 </u-form>
		</view>
	 </view>
<!--        <button @click="handleClick">click</button>
        <uni-drawer ref="drawer">
         // 使用scroll-view才可以区域滚动 且配置scroll-y为true时,需要给scroll-view设置高度
          <scroll-view class="scroll-container" scroll-y="true">
          </scroll-view>
        </uni-drawer> -->
     </view>
</template>

<script>
import uniDrawer from "@/components/uni-drawer/uni-drawer.vue";

export default {
  components: {
    uniDrawer
  },
  data(){
	return {
		backTextStyle:{
			'color':'#ffffff'
		},
		form:{
			name:'',
			role:1
		},
		show: false,
		list: [
			{
				value: '1',
				label: '江'
			},
			{
				value: '2',
				label: '湖'
			}
		],
	}  
  },
  methods: {
    handleClick(){
        this.$refs.drawer.open();
    }
  }
}
</script>
<style lang="scss">
.scroll-container {height: 100%;}
page{
	background-image: url(../../../static/lease.png);
	background-position: 40% 40%;
	background-repeat: no-repeat;
	height: 100%;
}
.zlyjdr{
	background-image: url(../../../static/leasebg.png);
	background-repeat: no-repeat;
	height: 40pt;
	line-height: 35pt;
	margin: 20pt 0;
	color: #fff;
}
.zlcontent-mid{
	padding: 0 20pt;
}
/deep/ .u-border-bottom:after{
	border-bottom-width:0;
}
</style>