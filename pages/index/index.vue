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
			<u-button  @click="updateVersion"
				:customStyle="{
					background:mainTheme.uTypePrimary,
					color:mainTheme.uWhite
				}"
			>
				检查更新
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
			updateVersion() {
				console.log('检查更新')
				//小程序更新
				// #ifdef MP-WEIXIN
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate(function(res) {
					console.log('check', res)
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function(res2) {
							uni.showModal({
								title: '更新提示',
								content: '发现新版本，是否重启应用?',
								cancelColor: '#eeeeee',
								confirmColor: '#FF0000',
								success(res2) {
									if (res2.confirm) {
										// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
										updateManager.applyUpdate()
									}
								}
							})
						})
					}
				})
			
				updateManager.onUpdateFailed(function(res) {
					// 新的版本下载失败
					uni.showModal({
						title: '提示',
						content: '检查到有新版本，但下载失败，请检查网络设置',
						success(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})
				})
				// #endif
			
				//APP更新
				// #ifdef APP-PLUS
				console.log('APP更新')
				let _this = this
				plus.runtime.getProperty(plus.runtime.appid, async function(widgetInfo) {
					console.log('APP更新配置项', widgetInfo)
					//获取平台 安卓 OR IOS
					let platform = uni.getSystemInfoSync().platform
					let [updateErr,updateRes] = await _this.$u.to(_this.$u.m.update.getUpdateInfo({
						app_version:widgetInfo.version,
						app_platform:platform
					}))
					console.log('updateRes -->',updateRes)
					console.log('updateErr -->',updateErr)
					//热更新
					if(updateRes.update&&updateRes.wgt_url){
						uni.showModal({
							title: '更新提示',
							content: '发现新版本，是否更新?',
							cancelColor: '#eeeeee',
							confirmColor: '#FF0000',
							success(res2) {
								if (res2.confirm) {
									uni.showLoading({
									    title: '版本更新中'
									})
									uni.downloadFile({
										url: updateRes.wgt_url,
										success: (downloadResult) => {
											console.log('downloadResult -->',downloadResult)
											if (downloadResult.statusCode === 200) {
												plus.runtime.install(downloadResult.tempFilePath, {
													force: false
												}, function() {
													uni.hideLoading()
													plus.runtime.restart()
												}, function(e) {
													console.log('install err -->',e)
													uni.hideLoading()
													uni.showToast({
														title: '下载资源包失败',
														icon: 'none',
														duration: 2000
													})
												})
											}
										}
									})
								}
							}
						})
						//若进了热更，return掉，不再进下面的整包更新了
						return
					}
					
					//整包更新
					if(updateRes.update && updateRes.pkg_url){
						uni.showModal({
							title: '更新提示',
							content: '发现新版本，是否更新?',
							cancelColor: '#eeeeee',
							confirmColor: '#FF0000',
							success(res2) {
								if (res2.confirm) {
									plus.runtime.openURL(updateRes.pkg_url)
								}
							}
						})
					} 
				})
				// #endif
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
