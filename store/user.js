export default {
	namespaced: true,
	state() {
		return {
			//收货地址
			addres: JSON.parse(uni.getStorageSync('addres') || null),
		}
	},
	mutations: {
		//数据持久化存储
		setStorgeAddres(state) {
			uni.setStorageSync('addres', JSON.stringify(state.addres))
		},
		//接受收货地址并存储到本地缓存
		setAddres(state, res) {
			state.addres = res
			this.commit('user/setStorgeAddres')
		}
	},
	getters: {
		deliveryAddress(state) {
			if (!state.addres) return ''
			return state.addres.provinceName + state.addres.cityName + state.addres.countyName + state.addres
				.detailInfo
		}
	}
}
