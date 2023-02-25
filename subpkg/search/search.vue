<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list">
			<view class="sugg-item" v-for="(item, i) in searchList" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 延时器的 timerId
				timer: null,
				// 搜索关键词
				kw: '',
				searchList: [] //列表数据
			};
		},
		methods: {
			input(val) {
				// 清除 timer 对应的延时器
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					// 如果 1000 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
					if (val.length === 0) {
						return this.searchList = []
					}
					this.kw = val
					this.getsearchList()
				}, 500)
			},
			async getsearchList() {
				const {
					data
				} = await uni.$http.get('/goods/qsearch', {
					query: this.kw
				})
				if (data.meta.status !== 200) return uni.$showMsg()
				this.searchList = data.message
			},
			gotoDetail(goods_id) {
				uni.navigateTo({
					// 指定详情页面的 URL 地址，并传递 goods_id 参数
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			}
		}

	}
</script>

<style lang="scss">
	.sugg-list {
		padding: 0 5px;

		.sugg-item {
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				// 文字不允许换行（单行文本）
				white-space: nowrap;
				// 溢出部分隐藏
				overflow: hidden;
				// 文本溢出后，使用 ... 代替
				text-overflow: ellipsis;
				margin-right: 3px;
			}
		}
	}
</style>
