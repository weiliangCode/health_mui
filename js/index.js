mui.ready(function() {
  mui.init();

  document.querySelector(".J_fixedTopClrear").onclick = function () {
    document.querySelector(".J_fixedTop").style.display = "none";
  }

  //初始化数据
  mui.post(getUrl(), {
    username: '111',
    password: 'FFFF'
  }, function (data) {
      var goodsList = data.data.promotion;
      for(var i=0;i<goodsList.length; i++) {
        var str = '<li>';
            str += '<a href="' + goodsList[i].goods_url + '?id=' + goodsList[i].id + '">';
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
      for(var i=0;i<list.length; i++) {
        var str = '<li>';
            str += '<a href="' + list[i].goods_url + '?id=' + list[i].id + '">';
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