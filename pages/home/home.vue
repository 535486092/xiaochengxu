<template>
	<view>
		<view class="search">
			<my-search bgcolor='#d81e06' @click.native='gotoSearch'></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_id/goods_id?good_id='+item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator> class="swiper-item">
			</swiper-item>
		</swiper>
		<!-- 分类列表 -->
		<view class="catitems">
			<view class="catitems-item" v-for="(item,i) in catitemsList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" mode="" class="catitems-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<!-- 楼层 item 项 -->
			<view class="floor-item" v-for="(item, i) in floordataList" :key="i">
				<!-- 楼层标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 楼层图片 -->
				<view class="floor-list-image">
					<!-- 左边大图 -->
					<navigator class="floor-left" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width: item.product_list[0].image_width + 'rpx'}"></image>
					</navigator>
					<!-- 右边4个小图 -->
					<view class="floor-right">
						<navigator class="right-image" v-for="(item1, i1) in item.product_list" :key="i1" v-if="i1!==0"
							:url="item1.url">
							<image :src="item1.image_src" mode="widthFix" :style="{width: item1.image_width + 'rpx'}">
							</image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [], //轮播图数据
				catitemsList: [], //分类选项数据
				floordataList: [] //首页楼层数据
			};
		},
		onLoad() {
			this.getswiperList()
			this.getCatitems()
			this.getFloordata()
		},
		methods: {
			//封装获取轮播图接口
			async getswiperList() {
				const {
					data
				} = await uni.$http.get('/home/swiperdata')
				if (data.meta.status !== 200) return uni.$showMsg()
				this.swiperList = data.message
			},
			//封装分类选项列表接口
			async getCatitems() {
				const {
					data
				} = await uni.$http.get('/home/catitems')
				if (data.meta.status !== 200) return uni.$showMsg()
				this.catitemsList = data.message
			},
			//点击分类的时候跳转对应的tabbar
			navClickHandler(item) {
				if (item.name == '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			//封装楼层接口
			async getFloordata() {
				const {
					data
				} = await uni.$http.get('/home/floordata')
				if (data.meta.status !== 200) return uni.$showMsg()
				// 通过双层 forEach 循环，处理 URL 地址
				data.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floordataList = data.message
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.catitems {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.catitems-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.floor-right {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-list-image {
		display: flex;
		padding-left: 10rpx;
	}

	.search {
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
