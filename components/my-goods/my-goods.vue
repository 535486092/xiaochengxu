<template>
	<view>
		<view class="goods-list">
			<view class="goods-list-left">
				<image :src="goods.goods_big_logo || Image" mode=""></image>
			</view>
			<view class="goods-list-right">
				<view class="goods-list-right-top">
					{{goods.goods_name}}
				</view>
				<text class="goods-list-right-bottom">￥{{goods.goods_price | tofixed}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods",
		data() {
			return {
				Image: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
			};
		},
		props: {
			goods: {
				type: Object,
				default: () => ({})
			}
		},
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},

	}
</script>

<style lang="scss">
	.goods-list {
		display: flex;
		padding: 10px;

		.goods-list-left {


			image {
				width: 100px;
				height: 100px;
			}
		}

		.goods-list-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding: 10px;

			.goods-list-right-top {
				font-size: 12px;
			}

			.goods-list-right-bottom {
				color: red;
				font-size: 15px
			}
		}
	}
</style>
