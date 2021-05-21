<template>
	<view>
		<!-- 自定义顶部导航 -->
		<u-navbar title="主页" titleSize="36" titleColor="#ffffff" backIconColor="#ffffff"
			:background="{ background: mainTheme.uTypePrimary }" 
			:borderBottom="false">
		</u-navbar>
		<view class="content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="text-area">
				<text class="title">{{title}}</text>
			</view>
			<u-button @click="changeTheme">改变主题</u-button>
			<view style="height: 10rpx;"></view>
			<u-button  @click="onClick" 
				:customStyle="{
					background:mainTheme.uTypePrimary,
					color:mainTheme.uWhite
				}"
			>
				vuex测试
			</u-button>
			<u-button  @click="goToLogin"
				:customStyle="{
					background:mainTheme.uTypePrimary,
					color:mainTheme.uWhite
				}"
			>
				跳转登录
			</u-button>
			<u-button  @click="getPagingData"
				:customStyle="{
					background:mainTheme.uTypePrimary,
					color:mainTheme.uWhite
				}"
			>
				获取分页
			</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				buttonName:'button',
				count:0
			}
		},
		onLoad() {
			this.buttonName = this.$u.config.version
			this.$u.toast('toast')
			console.log("store -->",this.$store.state.vuex_config)
		},
		methods: {
			changeTheme(){
				if(this.count%2==0){
					this.$store.commit('changeTheme',{theme:'theme2'})
				}else if(this.count%2==1){
					this.$store.commit('changeTheme',{theme:'theme1'})
				}
				this.count++
			},
			onClick(){
				this.$store.commit('commitCartNum',1111)
				console.log("cartNum -->",this.$store.state.cart.cartNum)
				console.log("getters -->",this.$store.getters.testGetterYo)
			},
			goToLogin(){
				// 路由跳转
				this.$Router.push({name:"login"})
			},
			async getPagingData(){
				let params = {
					state:'all',
					keyword:'',
					page_size:10,
				}
				await this.mixin_newPaging('product','getProPaging',params)
				await this.mixin_getListData()
				console.log('pagingData -->',this.mixin_listData)
			},
		},
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
