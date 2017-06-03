var dev = "true",
  devUrl = "http://localhost/health_mui/saver/",
  // devUrl = "http://shinehua.duapp.com/saver/",
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

//添加关注
function getGoodsNotice() {
  if (dev === "true")
    return devUrl + 'goods/notice.php';
  else
    return url + 'goods/notice'
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

