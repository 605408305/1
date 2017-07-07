<template>
	<div id="tmpl">
		<!--实现新闻资讯列表样式-->
		<ul class="mui-table-view">
			<li v-for="item in list" class="mui-table-view-cell mui-media">
				<router-link v-bind="{to:'/news/newsinfo/'+item.id}" >
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						{{item.title}}
						<p class='mui-ellipsis' v-text="item.zhaiyao"></p>
						<div class="ft">
							<span>发表时间:{{item.add_time | datefmt('YYYY-MM-DD HH:mm:ss')}}</span>
							<span class="click">点击数：{{item.click}}</span>
						</div>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
import { Toast } from 'mint-ui';
import common from '../../kits/common.js';

	export default{
		data(){
			return {
				list:[] //新闻列表功能
			}
		},
		created(){
			this.getnewslist();
		},
		methods:{
		// 获取api中的新闻资讯数据
			getnewslist(){
				// 确定url
				var url = common.apidomain+'/api/getnewslist';

				// 利用$http.get方法请求到数据
				this.$http.get(url).then(function(res){
					// 获取到响应报文体数据
						var body = res.body;
					// 判断响应报文体中的状态值
					if(body.status != 0){
						Toast(body.message);
						return;
					}
					// 将正常的message数据赋值给this.list
					this.list = body.message;
				});
			}
		}
	}
</script>
<style scoped>
 	.mui-table-view img{
 		height:80px;
 		width:80px;
 	}
 	.mui-table-view .mui-media-object{
	 	max-width: 80px;
	 	line-height: 80px;
 	}
	.ft{
		margin-top: 1.5em;
		font-size: 14px;
		color:#0094ff;
	}
 	.ft .click{
	 	margin-left: 15px;
 	}
</style>