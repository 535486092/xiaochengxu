<template>
	<view>
		<view class="search-box">
			<uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchList.length!==0">
			<view class="sugg-item" v-for="(item, i) in searchList" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history" v-else>
			<view class="history-top">
				<text>搜索历史</text>
				<uni-icons type="trash-filled" size="16" @click="del"></uni-icons>
			</view>
			<view class="history-bottom">
				<uni-tag :text="item" v-for="(item, i) in historySearch" :key="i" @click="gotoGoodslist(item)">
				</uni-tag>
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
				searchList: [], //列表数据
				historySearch: [] //搜索历史
			};
		},
		onLoad() {
			this.historySearch = JSON.parse(uni.getStorageSync('kw') || '[]')
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
				//调用方法
				this.getSearch()
			},
			gotoDetail(goods_id) {
				uni.navigateTo({
					// 指定详情页面的 URL 地址，并传递 goods_id 参数
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
				})
			},
			//定义搜索值存的方法
			getSearch() {
				//将最近搜索的数据排列在最前面
				this.historySearch.unshift(this.kw)
				//解决搜索重复问题
				const set = new Set(this.historySearch)
				//转换成数组并赋值
				this.historySearch = Array.from(set)
				//将搜索的值做持久化存储处理
				uni.setStorageSync('kw', JSON.stringify(this.historySearch));
			},
			//点击删除历史搜索记录
			del() {
				// 清空 data 中保存的搜索历史
				this.historySearch = []
				// 清空本地存储中记录的搜索历史
				uni.setStorageSync('kw', '[]')
			},
			//点击历史记录跳转到商品列表页
			gotoGoodslist(item) {
				uni.navigateTo({
					url: `/subpkg/goods_list/goods_list?qurey=` + item
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

	.history-top {
		display: flex;
		justify-content: space-between;
		padding: 5px 15px;
		border-bottom: 1px solid #efefef;
	}

	.history-bottom {
		padding: 5px 15px;
	}
</style>
