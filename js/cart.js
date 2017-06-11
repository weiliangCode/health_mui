window.onload = function () {

  //初始化数据
  mui.init();
  var titleArr = ['购物车', '购物记录'];
  var stateId = location.search;
  stateId = parseInt(stateId.split("=")[1]);
  var stateList = document.querySelector(".J_topState").getElementsByTagName("li");
  stateList[stateId].className = "active";
  document.querySelector("title").innerHTML = titleArr[stateId];
  // if (stateId == '0') {
  //   cartData();
  // } else {
  //   recordData();
  // }


  //获得购物车数据
  function cartData() {
    var opendid = sessionStorage.getItem(opendid) ? sessionStorage.getItem(opendid) : 'outktv28lv2UjvPTeT1TvKRRx0tc';
    mui.post(getShoppingcart(), {
      operate: 'list',
      username: opendid

    }, function (data) {
      var obj = data.data.shopping_cart;
      console.log(obj);
      if (obj) {
        $('.J_goods').css('display', 'block');
      }
      for (var index in obj) {
        var item = obj[index];
        var str = '<li class="item">';
        str += '<button class="radio"><img src="../images/cart/radio_true.png" alt=""></button>';
        str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
        str += '<div class="list_m">';
        str += '<h3>健康无忧体检套餐</h3>';
        str += '</div>';
        str += '<div class="list_r">';
        str += '<p class="price">￥498</p>';
        str += '<p>× <span>1</span></p>';
        str += '</div>';
        str += '</li>';
        $('.J_goodsList').append($(str));
      }
    })
  }

  //获得购物记录数据
  function recordData() {
    var opendid = sessionStorage.getItem(opendid) ? sessionStorage.getItem(opendid) : 'outktv28lv2UjvPTeT1TvKRRx0tc';
    mui.post(getOrder(), {
      status: '*',
      username: opendid

    }, function (data) {
      console.log(data);
      var obj = data.data.all_order_list;
      if (obj) {
        $('.J_goods').css('display', 'block');
      }
      for (var index in obj) {
        var item = obj[index];
        var str = '<li>';
        str += '<button class="radio"><img src="../images/cart/radio_true.png" alt=""></button>';
        str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
        str += '<div class="list_m">';
        str += '<h3>健康无忧体检套餐</h3>';
        str += '</div>';
        str += '<div class="list_r">';
        str += '<p class="price">￥498</p>';
        str += '<p>× <span>1</span></p>';
        str += '</div>';
        str += '</li>';
        $('.J_goodsList').append($(str));
      }
    })
  }




  //删除购物车商品
  function delgoods() {
    var opendid = sessionStorage.getItem(opendid) ? sessionStorage.getItem(opendid) : 'outktv28lv2UjvPTeT1TvKRRx0tc';
    mui.post(getShoppingcart(), {
      g_id: '981',
      operate: 'del',
      username: opendid

    }, function (data) {
      console.log(data);
    })
  }

  //   delgoods();


  //编辑购物车商品
  function editGoods() {
    var opendid = sessionStorage.getItem(opendid) ? sessionStorage.getItem(opendid) : 'outktv28lv2UjvPTeT1TvKRRx0tc';
    mui.post(getShoppingcart(), {
      g_id: '941',
      num: '50',
      operate: 'edit',
      username: opendid

    }, function (data) {
      console.log(data);
    })
  }

  // editGoods();
}