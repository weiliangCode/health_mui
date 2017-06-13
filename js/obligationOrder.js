window.onload = function () {
  mui.init();

  //全局变量
  // ?orderId=1497335005251&address=7
  var loca = location.search.split("&");
  var locaArr = loca[0].split("=");
  var orderId = locaArr[1];
  var username = sessionStorage.getItem("opendid") ? sessionStorage.getItem("opendid") : 'outktv28lv2UjvPTeT1TvKRRx0tc';
  var goods = {
    username: '',
    g_ids: '',
    address_id: ''
  };
  var goodsNum = 0;

  //初始化
  if (locaArr[0] == '?orderId' || locaArr[0] == '?goodsOrderId') {
    var obj = localStorage.getItem(orderId);
    var stor = obj ? JSON.parse(obj) : '';
    goods = {
      username: stor.username,
      g_ids: stor.g_ids,
      address_id: stor.address_id
    }
    if(stor.num) {
      goodsNum = stor.num;
    }
    console.log(stor);
    goodsDisply(stor.goods);

    $.post(getAddress(), {
      username: username
    }, function (data) {
      var obj = data.data.default_address;
      var objArr = data.data.other_address;

      if (loca.length == "2") {
        var addrArr = loca[1].split("=");
        goods.address_id = addrArr[1];
        for (var index in objArr) {
          var item = objArr[index];
          if (item.id == addrArr[1]) {
            obj = item;
            break;
          }
        }
      }
      initAddres('true', obj);
    })

  } else {
    $.post(queryOrder(), {
      order_no: orderId
    }, function (data) {
      console.log(data);

      var address = data.data.address
      initAddres('false', address);

      var goodsInfo = data.data.orderInfo;
      goodsDisply(goodsInfo);
    })
  }

  //初始化商品显示
  function goodsDisply(goodsArr) {
    for (var index in goodsArr) {
      var item = goodsArr[index];

      var str = '<li>';
      str += '<p class="title">';
      str += '店铺:';
      str += '<span>Jim大健康</span>';
      str += '</p>';
      str += '<div class="item">';
      str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
      str += '<div class="list_m">';
      str += '<h3>' + item.goods_name + '</h3>';
      str += '</div>';
      str += '<div class="list_r">';
      if(item.price) {
          str += '<p class="price">￥' + item.price + '</p>';
        } else {
          str += '<p class="price">￥' + item.goods_price + '</p>';
      }

      if(goodsNum != '0') {
        str += '<p>× <span>' + goodsNum + '</span></p>';
      } else if(item.price) {
        str += '<p>× <span>' + item.num + '</span></p>';
      } else {
        str += '<p>× <span>' + item.cart_num + '</span></p>';
      }
    
      str += '</div>';
      str += '</div>';
      str += '</li>';
      $('.J_goodsList').append($(str));
    }

  }


  //初始化地址显示
  function initAddres(floag, obj) {
    var str = '';
    if (obj) {
      str = '<div class="site">';
      str += '<div class="left">';
      str += '<p>' + obj.to_user + '，' + obj.phone + '</p>';
      str += '<p>' + obj.pathstr + '</p>';
      str += '<p>' + obj.detail_address + '</p>';
      str += '</div>';
      str += '<div class="right">';
      if (floag == 'true') {
        str += '<button class="J_alterBtn">修改</button>';
      }
      str += '</div>';
      str += '</div>';
    } else {
      str += '<div class="address J_addSite">';
      str += ' <button>添加收货地址</button>';
      str += '</div>';
    }
    $('.J_ems').append($(str));
  }


  //提交订单
  $('.J_submit').on('click', function () {
    localStorage.removeItem(orderId);
    if(locaArr[0] == '?orderId') {
      $.post(generateOrder(), {
        username: goods.username,
        g_ids: goods.g_ids,
        address_id: goods.address_id
      }, function (data) {
        console.log(data)
        location.href = '../html/verifyOrder.html'
      })
    } else {
       $.post(generateOrder(), {
        username: goods.username,
        g_id: goods.g_ids,
        num: goodsNum,
        address_id: goods.address_id
      }, function (data) {
        console.log(data);
      })
    }

  })

  //修改地址
  $('.J_ems').on('click', '.J_alterBtn', function () {
    location.href = '../html/deliver_address.html?orderId=' + orderId
  })

  //添加地址
  $('.J_ems').on('click', '.J_addSite', function () {
    location.href = '../html/address.html'
  })





}