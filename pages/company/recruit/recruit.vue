<template>
	<view>
		<u-navbar back-text="返回" back-icon-size="0" title="招聘发布" :background="backgroundCom" :back-text-style="backTextStyle"
		 height='44' title-color="#FFFFFF"></u-navbar>
		<view style="padding: 0 10pt;">
			<text style="font-size:10pt;">* 请注意本页内容都是必填项！未填写不能提交审核</text>
		</view>
		<view class="view-content">
			<view class="">
				<u-form :model="form" ref="uForm" :error-type="errorType" label-width="160" :border-bottom="false">
					<u-form-item :label-style="publishObj.titleStyle" prop="title" label="招聘标题" label-width="180rpx" class="cell_group">
						<u-input v-model="form.title" :clearable="false" placeholder="请输入标题" :border="false" maxlength="10" />
						<!-- <text class="middle-content-label" style="font-size: 32rpx;">辆</text> -->
					</u-form-item>
					<view style="padding: 8px 0;color: #666666;">例：高薪急聘网约车司机福利超多</view>
					<u-form-item :label-style="publishObj.titleStyle" label="岗位名称" label-width="180rpx" prop="workname" class="cell_group">
						<u-input v-model="form.workname" :disabled="true" placeholder="请选择岗位名称" :border="false" @click="show = true"
						 maxlength="10" />
						<u-icon name="arrow-right" color="#333333" size="28"></u-icon>
					</u-form-item>
					<view class="label_title">月薪(元)</view>
					<u-row style="padding-top: 16rpx;">
						<u-col span="4">
							<u-input v-model="form.lowmonthprice" maxlength="7" :border="true" placeholder="请输入最低值" />
						</u-col>
						<u-col span="4" style="padding: 0 40rpx;">
							<view style="border-bottom: 1px solid #D9DEDF;"></view>
						</u-col>
						<u-col span="4">
							<u-input v-model="form.highmonthprice" maxlength="7" :border="true" placeholder="请输入最高值" />
						</u-col>
					</u-row>
					<u-form-item :label-style="publishObj.titleStyle" label="招聘人数" prop="peoplenumber" label-width="180rpx" class="cell_group">
						<u-input v-model="form.peoplenumber" maxlength="7" placeholder="请输入招聘人数" :border="false" />
						<text>人</text>
					</u-form-item>
					<u-form-item label="职位描述" prop="worktext" label-position="top">
						<u-input v-model="form.worktext" class="input_textarea" type="textarea" maxlength="1000" :border="true"
						 placeholder="请输入(字数1000字以内) " />
					</u-form-item>
					<u-cell-group :border="false" class="cell_group">
						<u-cell-item title="工作车辆" :value="selectCarInfo" :title-style="publishObj.titleStyle" @click="showCar = true"></u-cell-item>
					</u-cell-group>
				</u-form>
			</view>
		</view>
		<view class="view-content" style="margin-top: 20px;">
			<view class="top-content-upload">
				<u-upload :custom-btn="true" :action="action" max-count="1" ref="upload" @on-success='uploadChange' index="onephoto"
				 upload-text="" @on-remove="removeOne" :file-list="fileList" :max-size="4 * 1024 * 1024" style="width: 100%;justify-content: center;">
					<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
						<u-icon name="plus" size="60" :color="$u.color['lightColor']"></u-icon>
						<view class="slot-tips">
							<view>请上传车辆照片</view>
						</view>
					</view>
				</u-upload>
			</view>
		</view>
		<view class="fixed-btn">
			<view class=" btn-inline">
				<u-button type="success" class="btn-agree" style="width: 100%;" @click="toSubmit">提交审核</u-button>
			</view>
		</view>
		<u-action-sheet :list="list" v-model="show" @click="actionSheetCallback"></u-action-sheet>
		<u-modal v-model="showTips" @confirm="tipsConfirm" confirm-text="我知道了">
			<view class="slot-content" style="padding: 10pt;font-size: 10pt;">
				信息发布成功
			</view>
		</u-modal>
		<u-popup v-model="showCar" mode="right" length="80%">
			<CarList :max='2' @onClick="carChange"></CarList>
		</u-popup>
		<auth></auth>
	</view>
</template>

<script>
	import {
		requiredRule
	} from '@/common/rule.js'
	import CarList from '@/components/carpoper.vue'
	import {
		action,
		publishObj
	} from '@/utils/constant.js'
	import auth from '@/components/auth.vue'
	export default {
		components: {
			auth,
			CarList
		},
		data() {
			return {
				publishObj: publishObj,
				selectCarInfo: '', //工作车辆title
				showCar: false,
				showSelect: false,
				backTextStyle: {
					'color': '#ffffff'
				},
				form: {
					title: '',
					carbrand: '',
					carmodel: '',
					workname: '',
					lowmonthprice: '',
					highmonthprice: '',
					peoplenumber: '',
					worktext: '',
					fivephoto: '',
				},
				action: action,
				fileList: [],

				list: [{
					value: '1',
					text: '网约车司机'
				}, {
					value: '2',
					text: '出租车司机'
				}],
				show: false,
				errorType: ['message'],
				showTips: false,
				editId: '',
			}
		},
		onLoad(option) {
			let editId = option.editId;
			if (editId) {
				this.editId = editId
			}
		},
		mounted() {
			if (this.editId) {
				this.editInit()
			}
		},
		methods: {
			carChange(obj) {
				if (obj.type === 1) {
					this.selectCarInfo = obj.carbrand;
					this.form.carbrand = obj.carbrand;
					this.form.carmodel = '';
				} else {
					this.selectCarInfo = obj.carbrand + '/' + obj.carmodel;
					this.form.carbrand = obj.carbrand;
					this.form.carmodel = obj.carmodel;
					this.showCar = false;
				}
			},
			editInit() {
				let id = this.editId;
				if (id) {
					this.$u.api.ComparyInviteEchoText({
						inviteid: id
					}).then(res => {
						if (res.code === 200) {
							let data = res.object;
							this.selectCarInfo = data.carbrand + "/" + data.carmodel;
							this.form = data;
							if (data.fivephoto) {
								this.fileList = [];
								this.fileList.push({
									url: this.form.fivephoto
								})
							}
						} else {
							this.$u.toast(res.msg);
						}
					}).catch(res => {
						this.$u.toast(res.msg)
					})
				}
			},

			actionCallback(index) {
				let val = index[0].label;
				this.form.carmodel = val;
			},
			uploadChange(data, index, lists, name) {
				this.form.fivephoto = data.object;
				this.$u.toast(data.msg);
			},
			removeOne(index, lists, name) {
				this.fileList.splice(index, 1)
				this.form.fivephoto = '';
			},
			saveForm() {
				let obj = this.form;
				this.$u.api.saveCompanyInvite(obj).then(res => {
					if (res.code === '200') {
						this.showTips = true
					} else {
						this.$u.toast(res.msg);
					}
				}).catch(res => {
					this.$u.toast(res.msg)
				})
			},
			saveFormEdit() {
				let saveobject = this.form
				this.$u.api.ComparyInviteUpdate(saveobject).then(res => {
					if (res.code === 200) {
						this.showTips = true
					} else {
						this.$u.toast(res.msg);
					}
				}).catch(res => {
					this.$u.toast(res.msg)
				})
			},
			clearStorage() {
				this.form = {
					title: '',
					carbrand: '',
					carmodel: '',
					workname: '',
					lowmonthprice: '',
					highmonthprice: '',
					peoplenumber: '',
					worktext: '',
					fivephoto: '',
				};
				this.fileList = []
			},
			tipsConfirm() {
				this.clearStorage()
				this.$u.route('/pages/company/myPublish/myPublish', {
					index: 1
				});
			},
			actionSheetCallback(index) {
				let value = this.list[index].text;
				this.form.workname = value
			},
			toSubmit() {
				if (this.form.title === '') {
					this.$u.toast('请输入招聘标题')
					return
				}
				if (this.form.workname === '') {
					this.$u.toast('请选择岗位名称')
					return
				}
				if (this.form.lowmonthprice === '') {
					this.$u.toast('请填写月薪最低值')
					return
				}
				if (this.form.highmonthprice === '') {
					this.$u.toast('请填写月薪最高值')
					return
				}
				let startPrice = Number(this.form.lowmonthprice);
				let endPrice = Number(this.form.highmonthprice);
				if (startPrice > endPrice) {
					this.$u.toast('月薪填写有误');
					return
				}
				if (this.form.peoplenumber === '') {
					this.$u.toast('请填写招聘人数')
					return
				}
				if (this.form.worktext === '') {
					this.$u.toast('请填写车辆描述')
					return
				}
				if (this.form.carmodel === '' || this.form.carbrand === "") {
					this.$u.toast('请选择工作车辆')
					return
				}
				if (this.form.fivephoto === '') {
					this.$u.toast('请上传图片')
					return
				}
				let id = this.editId;
				if (id) {
					this.saveFormEdit()
				} else {
					this.saveForm()
				}

			},
		}
	}
</script>

<style lang="scss">
	.scroll-container {
		height: 100%;
	}

	page {
		height: 100%;
	}

	/deep/ .u-border-bottom:after {
		border-bottom-width: 0;
	}

	.label_title {
		padding-top: 20rpx;
		color: #111111;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
	}

	.cell_group {
		border-bottom: 1px solid #DEDEDE;

		/deep/ .u-cell {
			padding: 13px 0px
		}
	}

	.view-content {
		// margin-top: 20pt;
		padding: 0 10pt;
	}

	.input_select {
		background: #FFFFFF;
		border-radius: 40rpx;
	}

	.input_textarea {
		background: #FFFFFF;
	}

	.fixed-btn {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 998;
	}

	.top-content-upload {
		border: 1px solid #F4F4F4;
		width: 100%;
		border-radius: 8px;
		background: #FFFFFF;
		position: relative;
		// height: 118pt;
	}

	.btn-inline {
		display: flex;
		justify-content: center;
		flex-direction: row;
		// width: 40%;
	}

	.btn-agree {
		width: 50%;
		background: linear-gradient(55deg, $bg-grad-AB, $bg-grad-DDC);
	}

	.slot-btn {
		width: 230rpx;
		height: 100pt;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #fff;
		border-radius: 10rpx;
	}

	.slot-tips {
		position: absolute;
		top: 62pt;
		font-size: 10pt;
		text-align: center;
		color: #666666;
	}
</style>
