window.onload = function () {
  mui.init();

  $('.J_submit').on('click', function() {
    location.href = '../html/verifyOrder.html'
  })


  $('.J_alterBtn').on('click', function() {
    location.href = '../html/address.html'
  })

  $('.J_addSite').on('click',function() {
    location.href = '../html/address.html'
  })
}