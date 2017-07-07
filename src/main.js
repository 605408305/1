// 导入vue核心包
import Vue from 'vue';
// 导入App.vue的vue对象
import App from './App.vue';
// 将vue-router集成到这个项目中来
import vueRouter from 'vue-router';
// 将vueRouter对象绑定到Vue对象上
Vue.use(vueRouter);

// 导入路由规则对应的组件对象
import home from './components/Home.vue';
import shopcar from './components/shopcar/car.vue';
import newslist from './components/news/newslist.vue';
import newsinfo from './components/news/newsinfo.vue';
import photolist from './components/photo/photolist.vue';
import photoinfo from './components/photo/photoinfo.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import goodsdesc from './components/goods/goodsdesc.vue';
import goodscomment from './components/goods/goodscomment.vue';
import car from './components/shopcar/car.vue';
import setting from './components/install/setting.vue';
import msg from './components/message/msg.vue';
import login from './components/account/login.vue';
import userinfo from './components/account/userinfo.vue';

// 导入获取cookie的方法
import {getCookie} from './kits/cookie.js';

// 定义路由规则
var router1 = new vueRouter({
	linkActiveClass:'mui-active',  //改变路由激活时的class名称
	routes:[
		{path:'/',redirect:'/home'},// 设置当服务器启动的时候默认进入 /home中
		{path:'/home',component:home},   //首页
		{path:'/shopcar',component:shopcar},  // 购物车
		{path:'/news/newslist',component:newslist}, //新闻资讯列表页面
		{path:'/news/newsinfo/:id',component:newsinfo},  // 新闻资讯详情页面
		{path:'/photo/photolist',component:photolist},
		{path:'/photo/photoinfo/:id',component:photoinfo},
		{path:'/goods/goodslist',component:goodslist},
		{path:'/goods/goodsinfo/:id',component:goodsinfo},
		{path:'/goods/goodsdesc/:id',component:goodsdesc},
		{path:'/goods/goodscomment/:id',component:goodscomment},
		{path:'/shopcar/car',component:car},
        {path:'/message/msg',component:msg},
        {path:'/login',component:login},
        {
            path: '/userinfo',
            component: userinfo,
            meta: {
                requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
            },
            beforeEnter: (to, from, next) => {
                if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
                    if (getCookie('session')) {  // 通过cookie获取当前的token是否存在
                        next();
                    }
                    else {
                        next({
                            path: '/login',
                            query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        })
                    }
                }
                else {
                    next();
                }
            }
        }
	]
});

// 导入状态管理vuex
import Vuex from 'vuex';
// 绑定到Vue上
Vue.use(Vuex);

var store = new Vuex.Store({
    // state类似vue实例中的data 用来存放数据
    state: {
        // 可以设置一些需要全局使用的数据
        username: 'zxx'
    },
    // mutations类似vue实例中的methods
    mutations: {
        // 用来处理数据 比喻数据删除更新等操作
        update(state, name) {
            state.username = name;
        }
    }
})

// 注册mint-ui
// 导入mint-ui的css文件
import 'mint-ui/lib/style.min.css';
// 导入mint-ui组件对象
import mintui from 'mint-ui';
// 在Vue中全局使用mintui
Vue.use(mintui);
// 注册mui的css样式
import '../statics/mui/css/mui.css';
// 导入一个当前系统的全局基本样式
import '../statics/css/site.css';
// 将vue-resource在vue中绑定
import vueResource from 'vue-resource';
Vue.use(vueResource);
// 使用momentjs日期格式化类库实现日的格式化功能
import moment from 'moment';
Vue.filter('datefmt',function(input,fmtstring){
	return moment(input).format(fmtstring);
});
// 使用图片预览组件
import VuePreview from 'vue-preview';
Vue.use(VuePreview);
// 利用Vue对象进行解析渲染
new Vue({
	el:'#app',
	router:router1,
    // 使用vuex
    store,
	render:c=>c(App)
});