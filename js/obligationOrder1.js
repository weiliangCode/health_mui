window.onload = function () {
  mui.init();

  //全局变量
  var orderId = location.search.split("=")[1];
  var username = sessionStorage.getItem("opendid") ? sessionStorage.getItem("opendid") : 'outktv28lv2UjvPTeT1TvKRRx0tc';
  var goods = {
    username: '',
    g_ids: '',
    address_id: ''
  };

  //初始化
  if (orderId.length == '13') {
    var obj = sessionStorage.getItem(orderId);
    goods = obj ? JSON.parse(obj) : '';
  } else {
    $.post(queryOrder(), {
      order_no: orderId
    }, function (data) {
      console.log(data);

    })
  }


  $.post(getAddress(), {
    username: username
  }, function (data) {
    var obj = data.data.default_address;
    var str = '';
    if (obj) {
      str = '<div class="site">';
      str += '<div class="left">';
      str += '<p>' + obj.to_user + '，' + obj.phone + '</p>';
      str += '<p>' + obj.pathstr + '</p>';
      str += '<p>' + obj.detail_address + '</p>';
      str += '</div>';
      str += '<div class="right">';
      str += '<button class="J_alterBtn">修改</button>';
      str += '</div>';
      str += '</div>';
    } else {
      str += '<div class="address J_addSite">';
      str += ' <button>添加收货地址</button>';
      str += '</div>';
    }
    $('.J_ems').append($(str));
  })

  //提交订单
  $('.J_submit').on('click', function () {
    $.post(queryOrder(), {
      username: opendid,
      g_ids:'981,',
      address_id: address_id
    }, function (data) {
      console.log(data)
    })

    // location.href = '../html/verifyOrder.html'
  })

  //修改地址
  $('.J_ems').on('click', '.J_alterBtn', function () {
    location.href = '../html/deliver_address.html'
  })

  //添加地址
  $('.J_ems').on('click', '.J_addSite', function () {
    location.href = '../html/address.html'
  })





}