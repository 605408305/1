<template>
	<div id="tmpl">
        <!--实现新闻详情-->
	   <div class="title">
		   <h4 v-text="info.title"></h4>
		   <p>{{ info.add_time | datefmt('YYYY-MM-DD') }}  {{info.click}}次浏览</p>
	   </div>
		<div id="content" v-html="info.content" ></div>
        <!--实现评论组件的集成-->
        <!--实现评论组件-->
        <comment :id = "id"></comment>
	</div>
</template>
<script>
    import common from '../../kits/common.js';
	//导入评论组件 comment.vue
    import comment from '../subcom/comment.vue';

	export default{
        components:{
            comment  // 注册评论组件
        },
        data(){
            return {
                id: 0,  // 传入的id值
                info: {

                }
            }
        },
        created()
            {
	// 获取url传入的id参数值赋值给data中的id属性
                this.id = this.$route.params.id;
	// 请求服务器获取到这个id对应的详情数据对象
            this.getinfo();
            },
        methods:{
            getinfo(){
	// 定义url
                var url = common.apidomain + '/api/getnew/'+this.id;
	// 发出ajax请求获取数据
                this.$http.get(url).then(function(res){
                    var body = res.body;
                    if(body.status != 0){
                        alert(body.message);
                        return;
                    }
	// 赋值
                    this.info = body.message[0];
                });
            }
        }
    }
</script>

<style scoped>
	.title h4{
		color: #0094ff;
	}
	.title p{
		color:rgba(0,0,0,0.5);
	}
	.title,#content{
		padding: 5px;
	}
</style>