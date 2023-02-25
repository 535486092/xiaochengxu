<template>
	<view class="my-search" :style="{'background-color': bgcolor}">
		<!-- 使用 view 组件模拟 input 输入框的样式 -->
		<view class="my-search-one">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		data() {
			return {

			};
		},
		props: {
			bgcolor: {
				type: String,
				default: '#Cd81e06'
			}

		}
	}
</script>

<style lang="scss">
	.my-search {
		// background-color: #d81e06;
		height: 50px;
		padding: 0 10px;
		display: flex;
		align-items: center;
	}

	.my-search-one {
		height: 36px;
		background-color: #ffffff;
		border-radius: 15px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.placeholder {
			font-size: 15px;
			margin-left: 5px;
		}
	}
</style>
