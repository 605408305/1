<template>
	<div id="tmpl">
		<div class="row" v-for="(item,index) in datalist">
			<mt-switch class="switch" v-model="value[index]"></mt-switch>
			<img class="img" :src="item.thumb_path" alt="商品图片" >
			<div class="inforight">
				<h4 v-text="item.title"></h4>
				<div class="bottom">
					<ul>
						<li>￥{{item.sell_price}}</li>
						<li><carinputnumber :initCount="item.cou" :goodsid="item.id" v-on:cardataobj="getiInputNumber"></carinputnumber></li>
						<li><a href="javascript:void(0)" @click="delrow(item.id,index)">删除</a></li>
					</ul>
				</div>
			</div>
		</div>
		<div id="total">
			<div class="desc">
				<ul>
					<li>总计（不含运费）</li>
					<li>已勾选商品{{totalcount}}件,总价:￥{{totalAmount}}元</li>
				</ul>
			</div>
			<div id="button">
				<mt-button  type="danger" size="small">去结算</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
	import {getgoodsObject,updateData,remoteItem} from '../../kits/localSg.js';
	import common from '../../kits/common.js';
	import { Toast } from 'mint-ui';
	import carinputnumber from '../subcom/carinputNumber.vue';

	export default{
		components:{
			carinputnumber
		},
		computed:{
//				定义计算总件数的属性
			totalcount(){
				var trueArr =  this.value.filter(function(item){return item;});
//				计算出当前选中的商品的总价格
				var amount = 0;
				this.value.forEach((item,index) =>{
//					判断当前item如果为true的话，则这个商品的总价格是要计算的
					if(item){
						var count = this.datalist[index].cou;
						var price = this.datalist[index].sell_price;
						var itemamount =   count * price;
						amount += itemamount;
					}
				});
				this.totalAmount = amount;
				return trueArr.length;
			}
		},
		data(){
			return {
				totalAmount:0, //总价格
				value:[],
				datalist:[]
			}
		},
		created(){
//			调用方法获取购物车列表数据
			this.getdatalist();
		},
		methods:{
//			删除一行数据
			delrow(goodsid,index){
				console.log(goodsid,index);
//			将this.value数组中的index这个位置的值移除
				this.value.splice(index,1);
//			将this.datalist中的index这个位置的值移除
				this.datalist.splice(index,1);
//			将localStroage中的goodsid对应的所有值移除
				remoteItem(goodsid);
			},
//			获取数量组件中返回的内容
			getiInputNumber(resObj){
//			更新localStorage中的数据
				updateData(resObj);
//			更新 this.datalist中的当前数量
				for(var i = 0;i <this.datalist.length ; i++){
					if(this.datalist[i].id == resObj.goodsid){
						if(resObj.type =='add'){
							this.datalist[i].cou = this.datalist[i].cou + 1;
						}else{
							this.datalist[i].cou = this.datalist[i].cou - 1;
						}
						break;
					}
				}
			},
			getdatalist(){
//				从localstorage中获取到所有的商品id值
				var obj = getgoodsObject();
//				将id值按照 api的参数格式提交给api
				var idstring = '';
				for(var key in obj){
					idstring+= key + ',';
				}
				idstring = idstring.substring(0,idstring.length-1);
//				ajax请求这个api获取到完整的商品数据信息赋值给this.datalist
				var url  = common.apidomain + '/api/goods/getshopcarlist/'+idstring;
				this.$http.get(url).then(function(res){
					//状态值的判断
					if(res.body.status != 0 ){
						Toast(res.body.message);
						return;
					}
//				将locaStorage中的所有的商品对应的count的值赋值给message中每个对象的cou
					res.body.message.forEach((item)=>{
						item.cou = obj[item.id];
//				为了解决一个bug所以必须在此处初始化values数组全部为false
						this.value.push(false);
					});
					this.datalist = res.body.message;
				});
			}
		}
	}
</script>
<style scoped>
	.row{
		border-bottom: 1px solid rgba(0,0,0,0.3);
		height: 102px;
		display: flex;
		padding: 5px;
	}
	.switch{
		flex:0 0 52px;
	}
	.img{
		margin-left: 5px;
		height: 75px;
		width: 75px;
		flex: 0 0 85px;
	}
	.inforight{
		margin-left: 5px;
		flex:1;
	}
	.inforight ul{
		padding-left: 0px;
	}
	.inforight li{
		list-style: none;
		display: inline-block;
	}
	.inforight h4{
		color: #0094ff;
		font-size: 14px;
	}
	.bottom li:first-child{
		color:red;
		margin-right: 5px;
	}
	.bottom li:last-child{
		margin-left: 5px;
	}
	#total{
		height: 100px;
		background-color: rgba(0,0,0,0.1);
		display: flex;
		padding: 5px;
	}
	#total ul {
	 	padding-left: 0px;
	}
	#total li{
		list-style: none;
		font-size: 14px;
	}
	#button{
		flex:0 0 60px;
		margin: 30px 0 0 0 ;
	}
	.desc{

		flex:1;
	}
	#tmpl{
		margin-top:40px;
	}
</style>