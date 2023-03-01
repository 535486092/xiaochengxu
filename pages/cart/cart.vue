<template>
	<view class="cart-container" v-if="cart.length !== 0">
		<!-- 收货地址 -->
		<my-address></my-address>
		<!-- 购物车 -->
		<view class="cart-top">
			<uni-icons type="shop-filled" size="20"></uni-icons>
			<text class="cart-top-text">购物车</text>
		</view>
		<!-- 商品列表区域 -->
		<uni-swipe-action>
			<block v-for="(item, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="onClick(item.goods_id)">
					<my-goods :goods="item" :show-radio="true" @radio-change="radioChangeHandler" :show-num="true"
						@numChange='numchange'></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		<!-- 结算区域 -->
		<my-settle></my-settle>
	</view>
	<!-- 空白购物车区域 -->
	<view class="empty-cart" v-else>
		<image src="/static/cart_empty@2x.png" class="empty-img"></image>
		<text class="tip-text">空空如也~</text>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		computed: {
			// 将 m_cart 模块中的 cart 数组映射到当前页面中使用
			...mapState('m_cart', ['cart']),
		},
		methods: {
			radioChangeHandler(e) {
				this.updateGoodsState(e)
			},
			...mapMutations('m_cart', ['updateGoodsState', 'updateShop', 'delgoodsId']),
			numchange(e) {
				this.updateShop(e)
			},
			//右滑删除商品
			onClick(id) {
				this.delgoodsId(id)
			}
		},
		watch: {
			total(newTotal) {
				this.setBadge()
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 50px;
	}

	.cart-top {
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-top-text {
			margin-left: 10px;
		}
	}

	.empty-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 150px;

		.empty-img {
			width: 90px;
			height: 90px;
		}

		.tip-text {
			font-size: 12px;
			color: gray;
			margin-top: 15px;
		}
	}
</style>
