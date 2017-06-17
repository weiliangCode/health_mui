window.onload = function () {
  mui.init();
  var opendid = localStorage.getItem('openid');
  if (!opendid) {
    location.href = '../index.html'
  }

  var orderNo = location.search;
  orderNo = orderNo.split("=")[1];

  //点击了商品星星评分
  $('.J_goods').on('tap','span',function() {
      var index = $(this).index();
      for(var i = 0; i < 5; i++) {
        $('.J_goods span').eq(i).removeClass('active');
      }
      for(var i = 0; i <= index; i++) {
        $('.J_goods span').eq(i).addClass('active');
      }
      switch(index) {
          case 0: {$('.J_grade').html('非常差')}break;
          case 1: {$('.J_grade').html('差')}break;
          case 2: {$('.J_grade').html('一般')}break;
          case 3: {$('.J_grade').html('好')}break;
          case 4: {$('.J_grade').html('非常好')}break;
      }
  })

  //描述获得焦点
  $('.J_gradeInfo').on('focus',function() {
    var text = $(this).html();
    console.log(text);
    if(text == '宝贝满足你的期待吗？说说它的优点和美中不足的地方吧') {
        $(this).html('').css('color','#000');
    }
  })

  //描述失去吧焦点
  $('.J_gradeInfo').on('blur',function() {
    
  })

  //点击了物流评分
  $('.J_shop1').on('tap','span',function() {
      console.log(11);
      var index = $(this).index();
      console.log(index);
      for(var i = 0; i < 5; i++) {
        $('.J_shop1 span').eq(i).removeClass('active');
      }
      for(var i = 0; i <= index; i++) {
        $('.J_shop1 span').eq(i).addClass('active');
      }
  })

  //点击了商品星星评分
  $('.J_shop2').on('tap','span',function() {
      var index = $(this).index();
      for(var i = 0; i < 5; i++) {
        $('.J_shop2 span').eq(i).removeClass('active');
      }
      for(var i = 0; i <= index; i++) {
        $('.J_shop2 span').eq(i).addClass('active');
      }
  })

}