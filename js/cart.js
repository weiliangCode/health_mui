window.onload = function () {
    mui.init();

    var titleArr = ['购物车', '购物记录'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);

    var stateList = document.querySelector(".J_topState").getElementsByTagName("li");
    stateList[stateId].className = "active";

    document.querySelector("title").innerHTML = titleArr[stateId];


 //初始化数据
  function dataInit() {
    mui.post(getShoppingcart(), {
      operate: 'list',
      username: 'outktv28lv2UjvPTeT1TvKRRx0tc'

    }, function (data) {
        var obj = data.data.shopping_cart;

        console.log(obj);
        for(var index in obj) {
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
  dataInit();

  //删除购物车商品
  function delgoods() {
    mui.post(getShoppingcart(), {
      g_id:'981',
      operate: 'del',
      username: 'outktv28lv2UjvPTeT1TvKRRx0tc'

    }, function (data) {
        console.log(data);
    })
  }

//   delgoods();


  //编辑购物车商品
  function editGoods() {
    mui.post(getShoppingcart(), {
      g_id:'941',
      num:'50',
      operate: 'edit',
      username: 'outktv28lv2UjvPTeT1TvKRRx0tc'

    }, function (data) {
        console.log(data);
    })
  }
  
    // editGoods();
}