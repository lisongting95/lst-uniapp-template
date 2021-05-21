<template>
	<view>
		<!-- 自定义顶部导航 -->
		<u-navbar id="navBar" :background="{ background: mainTheme.uBgColor }" 
			:customBack="onBack" :borderBottom="false" :isBack="false">
		</u-navbar>

		<view class="f-xxxl pb80" style="padding: 100rpx 80rpx;">
			<view class="pb50">花伍供应商管理平台</view>
			<u-form :model="formData" ref="uForm">
				<view>
					<u-form-item prop="mobile" label-width="0">
						<u-input v-model="formData.mobile" placeholder="请输入手机号" type="number" :placeholderStyle="'color:' + mainTheme.uTipsColor"></u-input>
					</u-form-item>
				</view>

				<view v-if="formData.type == 'password'">
					<u-form-item prop="password" label-width="0">
						<u-input v-model="formData.password" type="password" placeholder="请输入密码" :placeholderStyle="'color:' + mainTheme.uTipsColor"></u-input>
					</u-form-item>
				</view>
			</u-form>
			
			<!-- #ifdef APP-PLUS -->
			<view class="f-xs pt30">
				<view class="flex" :class="{'joggle':joggle}">
					<checkbox-group @change="onCheckChange">
						<view class="flex" :style="{color:mainTheme.uTipsColor}">
							<checkbox value="agree" :checked="agreePrivacyPolicy" :color="mainTheme.uTypePrimary" style="transform:scale(0.8)" />
							勾选代表您已同意
						</view>
					</checkbox-group>
					<view :style="{color:mainTheme.uTypePrimary}" @click="goToPrivacyPolicy">《花伍隐私政策》</view>
				</view>
			</view>
			<!-- #endif -->
		
			
			<view class="ptb30">
				<u-button
					@click="onLogin"
					hoverClass="none"
					:hairLine="false"
					:loading="isLoading"
					:customStyle="{
						color: mainTheme.uCardColor,
						fontSize: '30rpx',
						border: 'none',
						backgroundColor: mainTheme.uTypePrimary
					}"
				>
					{{ formData.type == 'password' ? '登录' : '获取短信验证码' }}
				</u-button>
			</view>

			<!-- 切换登录方式 -->
			<view class="flex flex-row-between">
				<view v-show="formData.type == 'password'" class="f-xs" :style="{color:mainTheme.uTypePrimary}"
					@click="onChangeLoginTypeTo('sms')">
					短信验证码登录
				</view>
				<view v-show="formData.type == 'sms'" class="f-xs" :style="{color:mainTheme.uTypePrimary}"
					@click="onChangeLoginTypeTo('password')">
					密码登录
				</view>
				<view @click="goToRegistration" class="f-xs" :style="{color:mainTheme.uTypePrimary}">注册花伍商家</view>
			</view>
		</view>
		
		<!-- 微信登录 -->
		<view class="fxd w100 p80 flex flex-row-center" style="bottom: 0;">
			<!-- #ifdef APP-PLUS -->
				<!-- App微信登录 -->
				<view v-if="!isIOS" @click="onWxLogin">
					<u-icon class="p40" name="weixin-fill" 
						color="success" label-pos="bottom" 
						label="微信登录" size="90" label-size="23">
					</u-icon>
				</view>
			<!-- #endif -->

			<!--  #ifdef  MP-WEIXIN -->
				<!-- 小程序微信登录 -->
				<u-button v-if="!canUseProfile"
					openType="getUserInfo"
					:hairLine="false"
					:customStyle="{
						backgroundColor:mainTheme.uBgColor,
						height:'auto',
						border:'none'}"
					@getuserinfo="getUserInfo"
				>
					<u-icon class="plr40" name="weixin-fill"
						color="success" label-pos="bottom"
						label="微信登录" size="90" label-size="23">
					</u-icon>
				</u-button>
				<u-button v-if="canUseProfile"
					:hairLine="false"
					:customStyle="{
						backgroundColor:mainTheme.uBgColor,
						height:'auto',
						border:'none'}"
					@click="onClickWxLogin"
				>
					<u-icon class="plr40" name="weixin-fill"
						color="success" label-pos="bottom"
						label="微信登录" size="90" label-size="23">
					</u-icon>
				</u-button>
			<!--  #endif -->
			
		</view>
	</view>
</template>

<script>
import rules from './rules/login' // 页面表单的验证规则
export default {
	onLoad() {
		if(this.$u.os()=='ios'){
			this.isIOS = true
		}
		
		//兼容getUserProfile
		if(uni.getUserProfile){
			console.log('has getUserProfile')
			this.canUseProfile = true
		}else{
			console.log('no getUserProfile')
			this.canUseProfile = false
		}
		
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	data() {
		return {
			formData: {
				mobile: '',
				password: '',
				code: '',
				type: 'password'
			},
			rules: rules, //表单验证规则
			agreePrivacyPolicy:false,//同意隐私政策
			joggle:false,//控制抖动
			isLoading: false ,//按钮loading图标
			isIOS:false,//ios系统
			canUseProfile:true,//能否使用uni.getUserProfile
			//微信登录数据
			userInfo:{},
		}
	},
	methods: {
		async onLogin() {
			this.$store.dispatch('login',{
				mobile:'18669010827',
				password:'fyc1990',
				type:'password'
			})
			// //密码登录
			// this.$refs.uForm.validate(async valid => {
			// 	if (valid) {
			// 		//如果表单验证通过
					
			// 		// #ifdef APP-PLUS
			// 		//检查是否勾选隐私政策
			// 		if(!this.agreePrivacyPolicy){
			// 			this.$u.toast('请勾选页面协议')
			// 			this.joggle = true
			// 			setTimeout(()=>{
			// 				this.joggle = false
			// 			},700)
			// 			return
			// 		}
			// 		// #endif
					
			// 		//密码登录
			// 		if (this.formData.type == 'password') {
			// 			this.isLoading = true
			// 			await this.$u.to(this.$u.m.login.login(this.formData))
			// 			this.isLoading = false
			// 			if (this.$u.state.vuex_token) {
			// 				this.$Router.replaceAll({ name: this.$Route.query.redirect })
			// 			}
			// 		}
					
			// 		//验证码登录
			// 		if (this.formData.type == 'sms') {
			// 			let [err,res] = await this.$u.to(this.$u.m.smsCode.requestSmsCode({ type: 1, mobile: this.formData.mobile }))
			// 			this.$Router.push({ name: 'code-login', params: {
			// 					mobile: this.formData.mobile,
			// 					redirect: this.$Route.query.redirect,
			// 					ttl:res?res.ttl:60,
			// 					userInfo:this.userInfo
			// 				}})
			// 		}
			// 	}
			// });
		},
		
		//切换登录方式
		//所有与动作相关的方法，都以on开头。开发规范有写
		onChangeLoginTypeTo(type) {
			this.formData.type = type;
		},
		
		
		// #ifdef  MP-WEIXIN
		getUserInfo(info){
			uni.showLoading({
				title:'正在登录中'
			})
			console.log('用户信息',info)
			if(info.detail.errMsg =='getUserInfo:ok'){
				// //赋值
				this.userInfo.nice_name = info.detail.userInfo.nickName
				this.userInfo.avatar = info.detail.userInfo.avatarUrl
				this.onWxMpLogin()
			}else{
				console.log('用户拒绝授权')
				uni.hideLoading()
			}
		},
		onClickWxLogin(){
			uni.showLoading({
				title:'正在登录中'
			})
			
			uni.getUserProfile({
				desc:'获取头像和昵称',// 这个参数是必须的  
				success:res=>{  
					console.log('profile res -->',res)
					this.userInfo.nice_name = res.userInfo.nickName //昵称
					this.userInfo.avatar = res.userInfo.avatarUrl
					this.onWxMpLogin()
				},  
				fail:err=>{  
					console.log('profile err -->',err)
					uni.hideLoading()
				}  
			})
			
		},
		//小程序微信登录
		onWxMpLogin(){
			let _this = this
			uni.login({
				provider: 'weixin',
				success: async function(res) {
					//微信小程序登录
					console.log("微信登录res -->",res)
					if (res.code) {
						//这里应该检测下 有没有绑定手机号
						let [err, hua5res] = await _this.$u.to(_this.$u.m.login.WXMpLogin({
							xcx_code:res.code,
							nice_name:_this.userInfo.nice_name,
							avatar:_this.userInfo.avatar
						}))
						//返回错误
						if(err){
							_this.formData.type = 'sms'
						}
						//登录成功跳转
						if (_this.$u.state.vuex_token) {
							uni.hideLoading()
							_this.$Router.replaceAll({ name: _this.$Route.query.redirect })
						}
					} else {
						uni.hideLoading()
						console.log('获取code失败',res)
					}
				},
				fail:function(){
					uni.hideLoading()
				}
			})
		},
		// #endif
		
		
		// #ifdef APP-PLUS
		// 手机APP微信登录
		onWxLogin(){
			uni.showLoading({
				title:'正在登录中'
			})
			let _this = this
			uni.login({
				provider: 'weixin',
				success: function(res) {
					//APP 微信登录
					console.log('APP 微信登录',res)
					uni.getUserInfo({
						async success(infoRes) {
							console.log('用户信息',infoRes)
							_this.userInfo.nice_name = infoRes.userInfo.nickName
							_this.userInfo.avatar = infoRes.userInfo.avatarUrl
							// _this.userInfo.openid = infoRes.userInfo.openId //app微信登录不要openid
							_this.userInfo.unionid = infoRes.userInfo.unionId
							let [err, hua5res] = await _this.$u.to(_this.$u.m.login.appWXLogin({
								// openid:_this.userInfo.openid,
								unionid:_this.userInfo.unionid,
								nice_name:_this.userInfo.nice_name ,
								avatar:_this.userInfo.avatar,
							}))
							// 返回错误
							if(err){
								_this.formData.type = 'sms'
							}
							// 成功跳转
							if(_this.$u.state.vuex_token){
								uni.hideLoading()
								_this.$Router.replaceAll({ name: _this.$Route.query.redirect })
							}
					    },
						fail() {
							 console.log("获取用户信息失败")
							 uni.hideLoading()
						}
					})							
				},
				fail: function() {
					uni.hideLoading()
				}
			})
		},
		// #endif
		
		
		// 跳转到注册页
		goToRegistration(){
			this.$Router.push({ name: 'registration', params: {}})
		},
		
		// 跳转到隐私政策
		goToPrivacyPolicy(){
			this.$Router.push({name:'privacy-policy'})
		},
		// 勾选隐私政策切换
		onCheckChange(e){
			if(e.detail.value.includes('agree')){
				this.agreePrivacyPolicy = true
			}else{
				this.agreePrivacyPolicy = false
			}
			console.log('agreePrivacyPolicy -->',this.agreePrivacyPolicy)
		}
	},
	computed: {
		token() {
			return this.$store.getters.getToken 
		}
	},
	watch: {
		token(newValue, oldValue) {
			console.log("new Value -->",newValue)
			console.log("old Value -->",oldValue)
			this.$Router.back(1)
		}
	},
};
</script>

<style lang="scss" scoped>

</style>
