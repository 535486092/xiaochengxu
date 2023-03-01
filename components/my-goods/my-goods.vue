<template>
	<view>
		<view class="goods-list">
			<view class="goods-list-left">
				<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"></radio>
				<image :src="goods.goods_small_logo || Image" mode=""></image>
			</view>
			<view class="goods-list-right">
				<view class="goods-list-right-top">
					{{goods.goods_name}}
				</view>
				<view class="goods-info-box">
					<text class="goods-list-right-bottom">￥{{goods.goods_price | tofixed}}</text>
					<!-- 商品数量 -->
					<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="changeValue">
					</uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations,
	} from 'vuex'
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
			},
			// 是否展示图片左侧的 radio
			showRadio: {
				type: Boolean,
				// 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
				default: false,
			},
			// 是否展示价格右侧的 NumberBox 组件
			showNum: {
				type: Boolean,
				default: false,
			},
		},
		filters: {
			// 把数字处理为带两位小数点的数字
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		},
		methods: {
			radioClickHandler() {
				// 通过 this.$emit() 触发外界通过 @ 绑定的 radio-change 事件，
				// 同时把商品的 Id 和 勾选状态 作为参数传递给 radio-change 事件处理函数
				this.$emit('radio-change', {
					// 商品的 Id
					goods_id: this.goods.goods_id,
					// 商品最新的勾选状态
					goods_state: !this.goods.goods_state
				})
			},
			changeValue(e) {
				this.$emit('num-change', {
					// 商品的 Id
					goods_id: this.goods.goods_id,
					goods_count: e,
					goods_state: this.goods.goods_state
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list {
		display: flex;

		padding: 10px;

		.goods-list-left {
			display: flex;
			justify-content: space-between;
			align-items: center;

			image {
				width: 100px;
				height: 100px;
			}
		}

		.goods-list-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			padding: 10px;

			.goods-list-right-top {
				font-size: 12px;
			}

			.goods-info-box {
				display: flex;
				align-items: center;
				justify-content: space-between;
			}

			.goods-list-right-bottom {
				color: red;
				font-size: 15px
			}
		}
	}
</style>
