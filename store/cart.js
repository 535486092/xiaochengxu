export default {
	// 为当前模块开启命名空间
	namespaced: true,
	state() {
		return {
			// 购物车的数组，用来存储购物车中每个商品的信息对象
			// 每个商品的信息对象，都包含如下 6 个属性：
			// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
			cart: JSON.parse(uni.getStorageSync('cart') || '[]')
		}
	},
	// 模块的 mutations 方法
	mutations: {
		addCart(state, goods) {
			//根据提交的商品id查询购物车是否有这件商品
			const finditem = state.cart.find(item => item.goods_id === goods.goods_id)
			if (finditem) {
				// 如果购物车中有这件商品，则只更新数量即可
				finditem.goods_count++
			} else {
				// 如果购物车中没有这件商品，则直接 push
				state.cart.push(goods)
			}
			// 通过 commit 方法，调用 m_cart 命名空间下的 setcart 方法
			this.commit('m_cart/setcart')
		},
		//将数据持久化存储
		setcart(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		//更新选中状态
		updateGoodsState(state, goods) {
			const finditem = state.cart.find(item => item.goods_id === goods.goods_id)
			if (finditem) {
				// 更新对应商品的勾选状态
				finditem.goods_state = goods.goods_state
				// 通过 commit 方法，调用 m_cart 命名空间下的 setcart 方法
				this.commit('m_cart/setcart')
			}
		},
		//更新商品修改数量
		updateShop(state, goods) {
			const finditem = state.cart.find(item => item.goods_id === goods.goods_id)
			if (finditem) {
				finditem.goods_count = goods.goods_count
				// 通过 commit 方法，调用 m_cart 命名空间下的 setcart 方法
				this.commit('m_cart/setcart')
			}
		},
		//根据商品id删除商品
		delgoodsId(state, goods) {
			const index = state.cart.findIndex(item => item.goods_id === goods)
			state.cart.splice(index, 1)
			this.commit('m_cart/setcart')
		},
		// 更新所有商品的勾选状态
		updateCheckdeAll(state, goods) {
			// 循环更新购物车中每件商品的勾选状态
			state.cart.forEach(item => item.goods_state = goods)
			// 持久化存储到本地
			this.commit('m_cart/setcart')
		}
	},

	// 模块的 getters 属性
	getters: {
		//统计购物车的商品总数量
		total(state) {
			return state.cart.reduce((sum, goods) => sum += goods.goods_count, 0)
		},
		//勾选商品的数量
		checkedCount(state) {
			return state.cart.reduce((sum, goods) => {
				if (goods.goods_state) {
					return sum += goods.goods_count
				}
				return sum
			}, 0)
		},
		//勾选商品的价格
		checkedNum(state) {
			return state.cart.reduce((sum, goods) => {
				if (goods.goods_state) {
					return sum += goods.goods_price * goods.goods_count
				}
				return sum
			}, 0).toFixed(2)
		}
	},
}
