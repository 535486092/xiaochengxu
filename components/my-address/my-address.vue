<template>
	<view>
		<!-- 选择收货地址的盒子 -->
		<view class="address-top" v-if="!addres">
			<button type='primary' class="address-top-button" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 渲染收货信息的盒子 -->
		<view class="address-bottom" v-else @click="chooseAddress">
			<view class="address-bottom-top">
				<text>收货人：{{addres.userName}}</text>
				<text>电话：{{addres.telNumber}}></text>
			</view>
			<view class="address-bottom-bottom">
				收货地址：{{deliveryAddress}}
			</view>
		</view>
		<image src="../../static/cart_border@2x.png" mode="" class="address-iamge"></image>
	</view>
</template>

<script>
	import {
		mapMutations,
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {
				// 收货地址
				// address: null,
			};
		},
		computed: {
			...mapState('user', ['addres']),
			...mapGetters('user', ['deliveryAddress'])
		},
		methods: {
			...mapMutations('user', ['setAddres']),
			chooseAddress() {
				uni.chooseAddress({
					success: (res) => {
						this.setAddres(res)
					},
					fail: (err) => {
						this.setAddres(null)
						uni.showMsg('获取地址失败')
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.address-top {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;

		.address-top-button {
			width: 130px;
			font-size: 10px;
			line-height: 30px;
		}
	}

	.address-iamge {
		width: 100%;
		height: 5px;
	}

	.address-bottom {
		width: 100%;
		height: 100px;
		font-size: 12px;


		.address-bottom-top {
			line-height: 50px;
			display: flex;
			justify-content: space-between;
			padding: 0 10px;
		}

		.address-bottom-bottom {
			line-height: 50px;
			padding: 0 10px;
		}
	}
</style>
