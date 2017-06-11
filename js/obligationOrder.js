window.onload = function () {
  mui.init();

  //初始化
   var opendid = sessionStorage.getItem(opendid) ? sessionStorage.getItem(opendid) : 'outktv28lv2UjvPTeT1TvKRRx0tc';
    $.post(getAddress(), {
      username: opendid
    }, function (data) {
     var obj = data.data.default_address;
     var str = '';
      if(obj) {
        str = '<div class="site">';
        str += '<div class="left">';
        str += '<p>张三，13430519800</p>';
        str += '<p>广东省 深圳市 南山区</p>';
        str += '<p>188号</p>';
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

  $('.J_submit').on('click', function() {
    location.href = '../html/verifyOrder.html'
  })

  //修改地址
  $('.J_ems').on('click','.J_alterBtn', function() {
    location.href = '../html/address.html'
  })

  //添加地址
  $('.J_ems').on('click','.J_addSite',function() {
    location.href = '../html/address.html'
  })

  


  
}