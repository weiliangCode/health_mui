mui.ready(function() {
  mui.init();

  //获得会员信息
  var opendid = localStorage.getItem('openid');
    if(!opendid) {
       location.href ='../index.html'
    }
  $.post(getUsercenter(), {
    username: opendid
  }, function (data) {
    if(data) {
      // var obj = JSON.parse(data);
      var obj = data;
      obj = obj.data.order_status_count;
      $('.J_beforePay').html(obj.before_pay);
      $('.J_beforeShipping').html(obj.before_shipping);
      $('.J_hadComplete').html(obj.had_complete);
      $('.J_hadDeliver').html(obj.had_deliver);

    }

  })


})