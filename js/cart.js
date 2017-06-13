window.onload = function () {
  var goods = {};

  //初始化数据
  mui.init();
  var titleArr = ['购物车', '购物记录'];
  var stateId = location.search;
  stateId = parseInt(stateId.split("=")[1]);
  var stateList = document.querySelector(".J_topState").getElementsByTagName("li");
  stateList[stateId].className = "active";
  document.querySelector("title").innerHTML = titleArr[stateId];
  if (stateId == '0') {
    cartData();
  } else {
    recordData();
  }


  //刷新购物车列表数据
  function cartData() {
    $('.J_orderid').css('display', 'block');
    $('.J_sumPrice').css('display', 'block');
    $('.J_edit_bottom').css('display', 'none');
    var opendid = localStorage.getItem('openid');
    if(!opendid) {
       location.href ='../index.html'
    }
    mui.post(getShoppingcart(), {
      operate: 'list',
      username: opendid
    }, function (data) {
      $('.J_goodsList').html('');
      var obj = data.data.shopping_cart;
      if (obj) {
        $('.J_goods').css('display', 'block');
      }
      for (var index in obj) {
        var item = obj[index];
        goods[item.goods_id] = item;
        console.log(item);
        var str = '<li class="item" data="' + item.goods_id + '">';
        str += '<button class="radio J_radio" data="true"><img src="../images/cart/radio_true.png" alt=""></button>';
        str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
        str += '<div class="list_m">';
        str += '<h3>' + item.goods_name + '</h3>';
        str += '</div>';
        str += '<div class="list_r">';
        str += ' <p class="price">￥<span class="J_price">' + item.goods_price + '</span></p>';
        str += '<p>× <span class="J_num">' + item.cart_num + '</span></p>';
        str += '</div>';
        str += '</li>';
        $('.J_goodsList').append($(str));
      }
      total();
      $('.J_loading').css('display','none');
    })
  }

  //刷新编辑状态列表数据
  function edit() {
    $('.J_orderid').css('display', 'block');
    $('.J_sumPrice').css('display', 'none');
    $('.J_edit_bottom').css('display', 'block');
    var opendid = localStorage.getItem('openid');
    if(!opendid) {
       location.href ='../index.html'
    }
    mui.post(getShoppingcart(), {
      operate: 'list',
      username: opendid

    }, function (data) {
      var obj = data.data.shopping_cart;
      $('.J_goodsList').html('')
      if (obj) {
        $('.J_goods').css('display', 'block');
      }
      for (var index in obj) {
        var item = obj[index];
        var str = '<li class="item" data="' + item.goods_id + '">';
        str += '<button class="radio J_radio" data="edit"><img src="../images/cart/delete.png" alt=""></button>';
        str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
        str += '<div class="list_m">';
        str += '<h3>' + item.goods_name + '</h3>';
        str += '</div>';
        str += '<div class="list_r">';
        str += '<p class="price">￥' + item.goods_price + '</p>';
        str += '<p class="edit J_editInput">';
        str += '<input type="button" class="J_sub" value="-">';
        str += '<input type="text" class="J_val" value="' + item.cart_num + '">';
        str += '<input type="button" class="J_add" value="+">';
        str += '</p>';
        str += '</div>';
        str += '</li>';
        $('.J_goodsList').append($(str));
      }
      $('.J_loading').css('display','none');
    })
  }

  //刷新购物记录数据列表数据
  function recordData() {
    $('.J_orderid').css('display', 'none');
    $('.J_sumPrice').css('display', 'none');
    $('.J_edit_bottom').css('display', 'none');
    var opendid = localStorage.getItem('openid');
    if(!opendid) {
       location.href ='../index.html'
    }
    mui.post(getOrder(), {
      status: '*',
      username: opendid

    }, function (data) {
      $('.J_goodsList').html('');
      var obj = data.data.all_order_list;
      if (obj) {
        $('.J_goods').css('display', 'block');
      }
      for (var index in obj) {
        var item = obj[index];
        var str = '<li class="item_record">';
        str += '<p class="orderid">';
        str += '订单号：';
        str += '<span>' + item.order_no + '</span>';
        str += '</p>';
        str += ' <div class="item">';
        str += ' <div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
        str += '<div class="list_m">';
        str += '<h3>' + item.order_desc + '</h3>';
        str += '</div>';
        str += '<div class="list_r">';
        str += '<p class="price">￥498</p>';
        str += '<p>× <span>1</span></p>';
        str += '</div>';
        str += '</div>';
        str += '<p class="price_record">';
        str += '总价：￥';
        str += '<span>' + item.amount + '</span>';
        if (item.status == '0') {
          str += '<button class="J_buyBtn" data="' + item.order_no + '">付款</button>';
        } else {
          str += '<span class="right">已付款</span>';
        }
        str += '</p>';
        str += '</li>';
        $('.J_goodsList').append($(str));
      }
      $('.J_loading').css('display','none');
    })
  }

  //点击了付款
  $('.J_goodsList').on('tap', '.J_buyBtn', function () {
    var order_no = $(this).attr('data');
    // console.log(order_no);
    location.href = "obligationOrder.html?order_no=" + order_no;
  })

  //购物车结算
  $('.J_sumPrice').on('tap', '.J_buyBtn', function() {
     var listArr = $('.J_goodsList li');
    var totalNum = 0;
    var g_ids = '';
    var newGoods = [];
    console.log(goods);
    for(var i=0; i<listArr.length; i++) {
      if(listArr.eq(i).find('.J_radio').attr('data') == 'true') {
        var gId = listArr.eq(i).attr('data');
        g_ids += gId + ',';
        newGoods.push(goods[gId]);
      }
    }
     var opendid = localStorage.getItem('openid');
      if(!opendid) {
        location.href ='../index.html'
      }
      $.post(getAddress(), {
        username: opendid
      }, function (data) {
        var obj = data.data.default_address;
        var url = '';
        var address_id = '';
        if(obj) {
          url = '../html/obligationOrder.html';
          address_id = obj.id
        } else {
          url = '../html/address.html';
        }
         var date = new Date();
          var orderId = date.getTime();
          var obj = {
            username:opendid,
            g_ids: g_ids,
            address_id:address_id,
            goods: newGoods
          }
          localStorage.setItem(orderId,JSON.stringify(obj));
          location.href = url + '?orderId=' + orderId;
      })
  })

  //点击了商品单选框
  $('.J_goodsList').on('tap', '.J_radio', function () {
    if ($(this).attr('data') == 'edit') {
      var g_id = $(this).parent().attr('data');
      delgoods(g_id);
      edit();
    } else if ($(this).attr('data') == 'true') {
      $(this).find('img').attr('src', '../images/cart/radio_false.png');
      $(this).attr('data', 'false')
      total();
    } else {
      $(this).find('img').attr('src', '../images/cart/radio_true.png')
      $(this).attr('data', 'true');
      total();
    }
  })

  //点击了编辑/完成按钮
  $('.J_edit').on('tap', function () {
    $('.J_loading').css('display','block');
    if ($(this).attr('data') == 'edit') {
      $(this).html('完成');
      $(this).attr('data', 'fulfill');
      edit();
    } else {
      $(this).html('编辑');
      $(this).attr('data', 'edit');
 
      var listArr = $('.J_goodsList li');
      var t1 = listArr.length;
      var t2 = 0;
      for(var i=0; i<listArr.length; i++) {
        var g_id = listArr.eq(i).attr('data');
        var num = parseInt(listArr.eq(i).find('.J_val').val());
        editGoods(g_id,num,function() {
          t2++;
          if(t2 == t1) {
            cartData();
          }
        });
      }
      
    }
  })

  //编辑输入框
  $('.J_goodsList').on('tap', '.J_sub',function () {
    var num = parseInt($(this).siblings('.J_val').val());
    if (num > 1) {
      num--;
    }
    $(this).siblings('.J_val').val(num)

  })
  
  $('.J_goodsList').on('blur', '.J_val',function () {
    var num = parseInt($(this).val());
    num = num > 1 && num < 100 ? num : 1;
    $(this).val(num)

  })

  $('.J_goodsList').on('tap', '.J_add',function () {
    var num = parseInt($(this).siblings('.J_val').val());
    if (num < 100) {
      num++;
    }
    $(this).siblings('.J_val').val(num)
  })

  //计算总价
  function total(){
    var listArr = $('.J_goodsList li');
    var totalNum = 0;
    for(var i=0; i<listArr.length; i++) {
      if(listArr.eq(i).find('.J_radio').attr('data') == 'true') {
        var price = parseFloat(listArr.eq(i).find('.J_price').html());
        var num = parseInt(listArr.eq(i).find('.J_num').html());
        totalNum += (price * num);
      }
    }
    $('.J_total').html(totalNum);
  }

  //删除购物车商品
  function delgoods(g_id) {
    var opendid = localStorage.getItem('openid');
    if(!opendid) {
       location.href ='../index.html'
    }
    mui.post(getShoppingcart(), {
      g_id: g_id,
      operate: 'del',
      username: opendid
    }, function (data) {
      console.log(data);
    })
  }

  //编辑购物车商品
  function editGoods(g_id,num,callback) {
    var opendid = localStorage.getItem('openid');
    if(!opendid) {
       location.href ='../index.html'
    }
    mui.post(getShoppingcart(), {
      g_id: g_id,
      num: num,
      operate: 'edit',
      username: opendid

    }, function (data) {
      callback();
    })
  }
}