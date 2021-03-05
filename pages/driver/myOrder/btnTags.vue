<template>
	<div>
		<button @click="add">添加</button>
		<div v-for="(item,index) in list" :key="index">
			{{item}} <button @click="del(index)">删除</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: ['车外观照片', '车外观前方45°照片', '车辆内部中控仪表盘照片', '车辆后备箱照片']
			}
		},
		methods: {
			add() {
				let str = '12345678';


			},
			del(index) {
				


			}
		}
	}
</script>

</script>
