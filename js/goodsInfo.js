window.onload = function () {
  mui.init();
  var opendid = localStorage.getItem('openid');
  if (!opendid) {
    location.href = '../index.html'
  }

  var goodsInfo = {};  // document.querySelector(".J_fixedTopClrear").onclick = function(){
  //   document.querySelector(".J_fixedTop").style.display = "none";
  // }

  var goodsId = location.search;
  goodsId = goodsId.split("=")[1];

  //延时5秒关闭J_fixedTop
  setTimeout(function () {
    $('.J_fixedTop').css('display', 'none');
  }, 5000)

  //初始化数据
  function dataInit() {
    mui.post(getGoodsInfo(), {
      g_id: goodsId
    }, function (data) {
      var obj = data.data.goods_info;
      goodsInfo = obj;
      $('.J_title').html(obj.goods_name);
      $('.J_price').html(obj.goods_price);
      $('.J_goodsNum').html(obj.goods_num);
      $(".J_notice").html("关注 （" + obj.notice_num + "）");
      $(".J_collection").html("收藏（" + obj.collection_num + "）");
      $('.J_loading').css('display', 'none');
    }, 'json'
    );
  }

  dataInit();
  isGoods();

  //设置头像
  $('.J_userImg').attr('src', localStorage.getItem('headimgurl'));
  $('.J_userName').html(localStorage.getItem('userName'));


  mui(".J_fixedTop").on('tap', '.J_fixedTopClrear', function () {
    mui(".J_fixedTop")[0].style.display = "none";
  })


  //点击“我要分销” 按钮
  document.querySelector('.J_applyBtn').onclick = function () {
    location.href = "prompt.html";
  }

  //点击“进入店铺” 按钮
  document.querySelector('.J_gotoIndex').onclick = function () {
    location.href = "../index.html";
  }

  //切换图片详情和评价
  mui(".J_info").on('tap', 'button', function () {
    var num = this.getAttribute("data");
    if (num === '0') {
      mui(".J_info button")[0].className = 'l active';
      mui(".J_info button")[1].className = 'r';
      mui(".J_imgInfo")[0].style.display = 'block';
      mui(".J_rate")[0].style.display = 'none';
    } else {
      mui(".J_info button")[0].className = 'l';
      mui(".J_info button")[1].className = 'r active';
      mui(".J_imgInfo")[0].style.display = 'none';
      mui(".J_rate")[0].style.display = 'block';
    }
  })

  //评价切换
  mui('.J_rate').on('tap', 'span', function () {
    mui('.J_rate span')[0].className = '';
    mui('.J_rate span')[1].className = '';
    mui('.J_rate span')[2].className = '';

    var num = this.getAttribute("data");
    if (num === '0') {
      mui('.J_rate span')[0].className = "active"
    } else if (num === '1') {
      mui('.J_rate span')[1].className = "active"
    } else {
      mui('.J_rate span')[2].className = "active"
    }
  })


  //标志购买或加入购物车状态
  var flog = true;
  //立即购买
  mui('.J_buyBtn').on('tap', ".l", function () {
    mui('.J_buy')[0].style.display = 'block';
    mui('.J_mask')[0].style.display = 'block';
    // mui('.J_butNet')[0].style.display = 'block';
    // mui('.J_cartNer')[0].style.display = 'none';
    flog = true;
  })

  //加入购物车
  mui('.J_buyBtn').on('tap', ".r", function () {
    mui('.J_buy')[0].style.display = 'block';
    mui('.J_mask')[0].style.display = 'block';
    // mui('.J_butNet')[0].style.display = 'none';
    // mui('.J_cartNer')[0].style.display = 'block';
    flog = false;
  })

  //点击下一步
  mui('.J_buy').on('tap', '.J_butNet', function () {
    mui('.J_buy')[0].style.display = 'none';
    mui('.J_mask')[0].style.display = 'none';

    var num = $('.J_buyInput input').eq(1).val();

    //生成订单
    if (flog) {
      $.post(getAddress(), {
        username: opendid
      }, function (data) {
        var obj = data.data.default_address;
        var url = '';
        var address_id = '';
        if (obj) {
          url = '../html/obligationOrder.html';
          address_id = obj.id;
        } else {
          url = '../html/address.html';
        }
        var date = new Date();
        var orderId = date.getTime();
        var goodArr = [];
        goodArr.push(goodsInfo);
        var obj = {
          username: opendid,
          g_ids: goodsInfo.goods_id,
          address_id: address_id,
          num: num,
          goods: goodArr
        }
        localStorage.setItem(orderId, JSON.stringify(obj));
        location.href = url + '?goodsOrderId=' + orderId;
      })

    } else {
      //加入购物车
      $.post(getShoppingcart(), {
        g_id: goodsId,
        num: num,
        operate: 'add',
        username: opendid
      }, function (data) {
        console.log(data);
        $('.J_cartIcon').css('display', 'block');
      })
    }

  })

  //点击遮罩层
  document.querySelector('.J_mask').addEventListener("tap", function () {
    mui('.J_buy')[0].style.display = 'none';
    mui('.J_mask')[0].style.display = 'none';
  })

  //点击关闭购买弹框
  document.querySelector('.J_clrearBuy').addEventListener("tap", function () {
    mui('.J_buy')[0].style.display = 'none';
    mui('.J_mask')[0].style.display = 'none';
  })


  //关注按钮
  $('.J_notice').on('tap', function () {
    mui.post(getGoodsNotice(), {
      g_id: goodsId,
      username: opendid,
    }, function (data) {
      dataInit();
    })
  })

  //收藏按钮
  $('.J_collection').on('tap', function () {
    mui.post(getGoodsCollection(), {
      g_id: goodsId,
      username: opendid,
    }, function (data) {
      dataInit();
    })
  })

  //购买输入框
  $('.J_buyInput input').eq(0).on('tap', function () {
    var num = parseInt($('.J_buyInput input').eq(1).val());
    if (num > 1) {
      num--;
    }
    $('.J_buyInput input').eq(1).val(num)

  })
  $('.J_buyInput input').eq(1).on('blur', function () {
    var num = parseInt($('.J_buyInput input').eq(1).val());
    num = num > 1 && num < 100 ? num : 1;
    $('.J_buyInput input').eq(1).val(num)
  })

  $('.J_buyInput input').eq(2).on('tap', function () {
    var num = parseInt($('.J_buyInput input').eq(1).val());
    if (num < 100) {
      num++;
    }
    $('.J_buyInput input').eq(1).val(num)
  })


  //判断购物车是否有商品
  function isGoods() {
    $.post(getShoppingcart(), {
      operate: 'list',
      username: opendid
    }, function (data) {
      console.log(data.data.shopping_cart);
      for(var index in data.data.shopping_cart) {
        console.log(111);
        $('.J_cartIcon').css('display', 'block');
        break;
      }
    })
  }


}