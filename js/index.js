mui.ready(function () {
  mui.init();

  document.querySelector(".J_fixedTopClrear").onclick = function () {
    document.querySelector(".J_fixedTop").style.display = "none";
  }

  //延时5秒关闭J_fixedTop
  setTimeout(function () {
    $('.J_fixedTop').css('display', 'none');
  }, 5000)

  //获取url中的参数
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
  }

  var code = getUrlParam('code');//拿这个code 请求的话要用这个获取openid
  //获得openID
  mui.post(getOpenId(), {
    code: code
  }, function (data) {
    localStorage.setItem('openid',data.data.openid);
    var userInfo = data.data.userInfo;
    var userName = userInfo.nickname;
    var userImg = userInfo.headimgurl;
    $('.J_userName').html(userName);
    $('.J_userImg').css('background','url(' + userImg + ')')
  })

  //测试账号
  // localStorage.setItem('openid','opSdF1VNR03IayTp9tlH7-DJ8c8M');

  //初始化数据
  mui.post(getGoodslist(), {
  }, function (data) {
    console.log(data);
    var goodsList = data.data.promotion;
    for (var i = 0; i < goodsList.length; i++) {
      var str = '<li>';
      str += '<a href="html/goodsInfo.html?id=' + goodsList[i].id + '">';
      str += '<img src="images/index/goods001.jpg" alt="">';
      str += '<h3>' + goodsList[i].name + '</h3>';
      str += '<p>';
      str += '<span>￥' + goodsList[i].price + '</span>';
      str += '<button class="fr">订购</button>';
      str += '</p>';
      str += '</a>';
      str += '</li>';
      $('.J_goodsList').append($(str));
    }
    var list = data.data.normal_goods;
    for (var i = 0; i < list.length; i++) {
      var str = '<li>';
      str += '<a href="html/goodsInfo.html?id=' + list[i].id + '">';
      str += '<div class="fl list_L">';
      str += '	<img src="images/index/goods005.png" alt="">';
      str += '</div>';
      str += '<div class="fl list_R">';
      str += '<h3>' + list[i].name + '</h3>';
      str += '<p>￥' + list[i].price + '</p>';
      str += '<button>订购</button>';
      str += '</div>';
      str += '</a>';
      str += '</li>';
      $('.J_list').append($(str));
    }

  }, 'json'
  );

})   
