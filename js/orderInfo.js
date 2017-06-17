window.onload = function () {
  mui.init();
  var opendid = localStorage.getItem('openid');
  if (!opendid) {
    location.href = '../index.html'
  }

  var orderNo = location.search;
  orderNo = orderNo.split("=")[1];

  //点击评价按钮
  $('.J_estimate').on('tap',function() {
      location.href ="estimate.html?orderNo=" + orderNo;
  })

  //点击了申请售后
  $('.J_refund').on('tap',function() {
      location.href ="refundForm.html?orderNo=" + orderNo;
  })

}