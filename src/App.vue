<template>
	<div>
		<!--利用mint-ui中的header组件实现整个系统的头部 -->
		<mt-header fixed title="Vue商城系统" id="headbar"></mt-header>
			<!--统一的返回按钮-->
		<div v-if="isshow" id="back">
			<a href="javascript:void(0)" @click="backto">返回</a>
		</div>
		<!--<router-view>进行占位 -->
		<router-view></router-view>
		<!-- 利用mui中的tabbar组件实现系统的底部 -->
		<nav class="mui-bar mui-bar-tab" id="footerbar">
			<router-link class="mui-tab-item " to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/message/msg">
				<span class="mui-icon mui-icon-email"></span>
				<span class="mui-tab-label">信息</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shopcar/car">
				<span class="mui-icon mui-icon-contact">
					<span id="badge" class="mui-badge">0</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/userinfo">
				<span class="mui-icon mui-icon-gear"></span>
				<span class="mui-tab-label">设置</span>
			</router-link>
		</nav>
	</div>
</template>
<script>
	import {vm,COUNTSTR} from './kits/vm.js';
	vm.$on(COUNTSTR,function(count){
	//将count值追加到购物车中
		var badgeobj = document.querySelector('#badge');
		badgeobj.innerText = parseInt(badgeobj.innerText) + count;
	});
	export default{
		data(){
			return {
				isshow : false
			}
		},
		watch:{
			'$route':function(newroute,oldroute){
				if(newroute.path.toLowerCase() == '/home'){
					this.isshow = false;
				}else{
					this.isshow = true;
				}
			}
		},
		methods:{
			backto(){
				this.$router.go(-1);
			}
		},
		created(){
		}
	}
</script>

<style scoped>
	#headbar {
		background-color: #000;
		color: #fff;
	}
	#footerbar {
		background-color: #000;
	}
	#back {
		width: 60px;
		position: absolute;
		top:10px;
		left:10px;
		z-index: 999;
	}
	#back a {
		color: #fff;
		font-size: 14px;
	}
</style>