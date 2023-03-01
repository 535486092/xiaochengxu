<template>
	<view>
		<block v-for="(item,i) in goodsList" :key="i">
			<my-goods :goods='item' @click.native="gotoDetail(item.goods_id)"></my-goods>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '', //查询关键词
					cid: '', //分类id
					pagenum: 1, //需要第几页数据
					pagesize: 10 //需要每页数据条数
				},
				// 商品列表的数据
				goodsList: [],
				// 总数量，用来实现分页
				total: 0,
				// 是否正在请求数据
				isloading: false
			};
		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 对象中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cat_id || ''
			// 调用获取商品列表数据的方法
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cd) {
				// ** 打开节流阀
				this.isloading = true
				const {
					data
				} = await uni.$http.get('/goods/search', this.queryObj)
				// ** 关闭节流阀
				this.isloading = false
				typeof cd === 'function' && cd()
				if (data.meta.status !== 200) return uni.$showMsg()
				//拼接数据
				this.goodsList = [...this.goodsList, ...data.message.goods]
				// this.goodsList = data.message.goods
				this.total = data.message.total
			},
			// 点击跳转到商品详情页面
			gotoDetail(id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + id
				})
			}
		},
		//上拉触底触发事件
		onReachBottom() {
			// 判断是否还有下一页数据
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
			// 判断是否正在请求其它数据，如果是，则不发起额外的请求
			if (this.isloading) return
			//让页码自增
			this.queryObj.pagenum += 1
			//重新获取数据
			this.getGoodsList()
		},
		// 下拉刷新的事件
		onPullDownRefresh() {
			// 1. 重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			// 2. 重新发起请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style lang="scss">

</style>
