var dev = "false",
  devUrl = "http://localhost/health_mui/serve/",
  // devUrl = "http://shinehua.duapp.com/serve/",
  url = "http://demo.lmqde.com/api/";


//商品列表
function getGoodslist() {
  if (dev === "true")
    return devUrl + 'goods/goodslist.php';
  else
    return url + 'goods/goodslist'
}

//商品详情
function getGoodsInfo() {
  if (dev === "true")
    return devUrl + 'goods/goodsinfo.php';
  else
    return url + 'goods/goodsinfo'
}

//添加收藏
function getGoodsCollection() {
  if (dev === "true")
    return devUrl + 'goods/collection.php';
  else
    return url + 'goods/collection'
}
//取消收藏
function cancelCollection() {
  if (dev === "true")
    return devUrl + 'goods/collection.php';
  else
    return url + 'goods/collection/cancel'
}

//添加关注
function getGoodsNotice() {
  if (dev === "true")
    return devUrl + 'goods/notice.php';
  else
    return url + 'goods/notice'
}

//取消关注
function cancelNotice() {
  if (dev === "true")
    return devUrl + 'goods/notice.php';
  else
    return url + 'goods/notice/cancel'
}

//当前用户关注的商品列表
function getUserNotice() {
  if (dev === "true")
    return devUrl + 'user/notice.php';
  else
    return url + 'user/notice'
}

//当前用户收藏的商品列表
function getUserCollection() {
  if (dev === "true")
    return devUrl + 'user/collection.php';
  else
    return url + 'user/collection'
}

//获得会员信息
function getUsercenter() {
  if (dev === "true")
    return devUrl + 'user/usercenter.php';
  else
    return url + 'user/usercenter'
}

//用户绑定手机
function getUserbind() {
  if (dev === "true")
    return devUrl + 'user/bind.php';
  else
    return url + 'user/bind'
}



//获得订单详情
function getOrder() {
  if (dev === "true")
    return devUrl + 'order/orderlist.php';
  else
    return url + 'order/status/orderlist'
}

//购物车的增删改查
function getShoppingcart() {
  if (dev === "true")
    return devUrl + 'shoppingcart.php';
  else
    return url + 'shoppingcart'
}
 

//获得地址
function getSite() {
  if (dev === "true")
    return devUrl + '';
  else
    return url + 'area/areainfo'
}


//获得openID
function getOpenId() {
  if (dev === "true")
    return devUrl + '';
  else
    return url + 'wechat/useropenid'

}


//添加收货地址
function getAddaddress() {
  if (dev === "true")
    return devUrl + '';
  else
    return url + 'user/addaddress'
}

//获得地址
function getAddress() {
  if (dev === "true")
    return devUrl + '';
  else
    return url + 'user/addresslist'
}

//生成订单
function generateOrder() {
  if (dev === "true")
    return devUrl + '';
  else
    return url + 'shoppingflow/createorder'
}

//取消订单
function cancelOrder() {
  if (dev === "true")
    return devUrl + '';
  else
    return url + 'order/cancel'
}



//查询订单
function queryOrder() {
  if (dev === "true")
    return devUrl + '';
  else
    return url + 'order/query'
}
