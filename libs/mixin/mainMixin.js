export default {
	// 主题计算混入
	computed: {
		mainTheme(){
			return this.$store.getters.getTheme
		}
	}
}