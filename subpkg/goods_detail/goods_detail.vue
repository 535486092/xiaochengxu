<template>
	<view v-if='goodsInfo.goods_name' class="goods-detail-container">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, i) in goodsInfo.pics" :key="i">
				<image :src="item.pics_big" @click.native="preview(i)"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">￥{{goodsInfo.goods_price}}</view>
			<!-- 信息主体区域 -->
			<view class="goods-info-body">
				<!-- 商品名称 -->
				<view class="goods-name">{{goodsInfo.goods_name}}</view>
				<!-- 收藏 -->
				<view class="favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">快递：免运费 -- {{cart.length}}</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<view class="goods-info-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				// 商品详情对象
				goodsInfo: {},
				//商品id
				goods_id: '',
				options: [{
					icon: 'headphones',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			// 获取商品 Id
			this.goods_id = options.goods_id
			// 调用请求商品详情数据的方法
			this.getGoodsDetail()
		},
		methods: {
			// 定义请求商品详情数据的方法
			async getGoodsDetail() {
				const {
					data
				} = await uni.$http.get('/goods/detail', {
					goods_id: this.goods_id
				})
				if (data.meta.status !== 200) return uni.$showMsg()
				// 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
				data.message.goods_introduce = data.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')
				// 为 data 中的数据赋值
				this.goodsInfo = data.message
			},
			// 实现轮播图的预览效果
			preview(i) {
				// 调用 uni.previewImage() 方法预览图片
				uni.previewImage({
					// 预览时，默认显示图片的索引
					current: i,
					// 所有图片 url 地址的数组
					urls: this.goodsInfo.pics.map(item => item.pics_big)
				})
			},
			//点击购物车跳转到购物车页面
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			...mapMutations('m_cart', ['addCart']),
			//右侧按钮的点击事件
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goodsInfo.goods_id, // 商品的Id
						goods_name: this.goodsInfo.goods_name, // 商品的名称
						goods_price: this.goodsInfo.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goodsInfo.goods_small_logo, // 商品的图片
						goods_state: true // 商品的勾选状态
					}
					//调用cart的addCart方法
					this.addCart(goods)
				}
			}
		},
		computed: {
			// 调用 mapState 方法，把 cart 模块中的 cart 数组映射到当前页面中，作为计算属性来使用
			// ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['total'])
		},
		//通过侦听器的方法监听total的状态
		watch: {
			total: {
				handler(newTotal) {
					this.options[1].info = newTotal
				},
				immediate: true
			}
		}
	}
</script>

<style lang="scss">
	.goods-detail-container {
		// 给页面外层的容器，添加 50px 的内padding，
		// 防止页面内容被底部的商品导航组件遮盖
		padding-bottom: 50px;
	}

	swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	// 商品信息区域的样式
	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;

			.goods-name {
				font-size: 13px;
				padding-right: 10px;
			}

			// 收藏区域
			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		// 运费
		.yf {
			margin: 10px 0;
			font-size: 12px;
			color: gray;
		}
	}

	.goods-info-nav {
		// 为商品导航组件添加固定定位
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>
