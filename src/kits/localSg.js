// 负责操作localStorage的帮助文件

// 定义常量key,将来操作的localStorage中的数据都以这个key来作为标识
export const KEY = 'goodsdata';
export var valueObj = {goodsid:0,count:0};
// 实现数据的增加
export function setItem(value){
    //获取json格式
    var jsonString =  localStorage.getItem(KEY);
    jsonString = jsonString || '[]';
    var arr =   JSON.parse(jsonString);
    arr.push(value);
    // 将arr 转换成json字符串保存起来
    localStorage.setItem(KEY,JSON.stringify(arr));
}
// 获取数据
export function getItem(){
   var jsonString =  localStorage.getItem(KEY);
//    将json格式字符串转换成 js对象
    jsonString = jsonString || '[]';
    return JSON.parse(jsonString);
}
// 移除数据 goodsid:商品id
export function remoteItem(goodsid){
    var arr = getItem();
// 查找arr中的goodsid和传入的参数goodsid一致的数据全部移除
    for(var i= arr.length -1;i>=0 ; i--){
        if(arr[i].goodsid == goodsid){
            arr.splice(i,1);
        }
    }
// 将最新的arr保存回localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));

}
// 将localStorage中的数据全部整合成一个对象的形式
export function getgoodsObject(){
//   获取数组
    var arr  = getItem();
// 将arr数组中的goodid相同的多个对象合并成同一个对象
    var resObj ={};
    for(var i = 0 ; i<arr.length; i++){
        var item = arr[i];
        if(!resObj[item.goodsid]){
// 如果没有当前商品的数据，则添加一个数据
            resObj[item.goodsid] = item.count;
        }else{
// 已经有当前商品的数据了，则将cont追加
            var count = resObj[item.goodsid];
            resObj[item.goodsid] = count + item.count;
        }
    }
    return resObj;
}
export function updateData(obj){
    var arr  = getItem();
    var count = 1;
    if(obj.type =='add'){
        //加
        arr.push({goodsid:obj.goodsid,count:count});
    }else{
        //减
        for(var i =0 ;i < arr.length ; i++){
            if(arr[i].goodsid == obj.goodsid){
                if(arr[i].count > 1){
                    arr[i].count = arr[i].count -1;
                    break;
                }else{
                    //删除此对象
                    arr.splice(i,1);
                    break;
                }
            }
        }
    }
// 将最新的arr保存回localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));
}

