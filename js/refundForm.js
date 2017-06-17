window.onload = function () {
  mui.init();

  var orderNo = location.search;
  orderNo = orderNo.split("=")[1];

  console.log(orderNo);

  //点击提交按钮
  $('.J_submit').on('tap',function() {
      console.log(111);
       location.href ="orderInfo.html?orderNo=" + orderNo;
  })

}