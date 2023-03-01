<template>
	<view>
		<!-- 使用自定义的搜索组件 -->
		<my-search bgcolor='#d81e06'></my-search>
		<view class="all">
			<!-- 左侧标题栏 -->
			<!-- 一级目录 -->
			<scroll-view class="left-title" scroll-y :style="{height:wh+'px'}">
				<view class="left-title-item" :class="{'active':active === i}" v-for="(item,i) in cateList" :key="i"
					@click="activeChanged(i)">
					{{item.cat_name}}
				</view>
			</scroll-view>
			<!-- 右侧内容栏 -->
			<scroll-view class="right-content" scroll-y :style="{height:wh+'px'}">
				<view class="right-content-one" v-for="(item,i) in cateList1" :key="i">
					<!-- 二级目录 -->
					<view class="right-content-two">
						/{{item.cat_name}}/
					</view>
					<!-- 三级目录 -->
					<view class="right-content-three">
						<navigator :url="'/subpkg/goods_list/goods_list?cat_id='+item1.cat_id"
							class="right-content-three-item" v-for="(item1,i1) in item.children" :key="i1">
							<image :src="item1.cat_icon"></image>
							<text>{{item1.cat_name}}</text>
						</navigator>
					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import badgeMix from '@/mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				cateList: [], //分类列表数据
				wh: '', //可视区域的高度
				active: 0, // 当前选中项的索引，默认让第一项被选中
				cateList1: [] //二级分类数据
			};
		},
		onLoad() {
			this.getcateList()
			//获取可视窗口的高度
			const getWindowInfo = uni.getWindowInfo()
			this.wh = getWindowInfo.windowHeight - 50
		},
		methods: {
			//请求分类列表数据
			async getcateList() {
				const {
					data
				} = await uni.$http.get('/categories')
				if (data.meta.status !== 200) return uni.$showMsg()
				this.cateList = data.message
				this.cateList1 = this.cateList[this.active].children
			},
			activeChanged(i) {
				this.active = i
				this.cateList1 = this.cateList[i].children
			},
		}
	}
</script>

<style lang="scss">
	.all {
		display: flex;

		.left-title {
			width: 90px;
			;

			.left-title-item {
				font-size: 10px;
				text-align: center;
				padding: 20px 10px;
				background-color: #f7f7f7;

				// 激活项的样式
				&.active {
					background-color: #ffffff;
					position: relative;

					// 渲染激活项左侧的红色指示边线
					&::before {
						content: ' ';
						display: block;
						width: 3px;
						height: 30px;
						background-color: #c00000;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.right-content {
			flex: 1;
			background-color: #ffffff;

			.right-content-two {
				font-size: 12px;
				font-weight: bold;
				text-align: center;
				padding: 15px 0;
			}

			.right-content-three {
				display: flex;
				flex-wrap: wrap;

				.right-content-three-item {
					width: 33.33%;
					margin-bottom: 10px;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 60px;
						height: 60px;
					}

					text {
						font-size: 12px
					}
				}
			}
		}
	}
</style>
