window.onload = function () {
  mui.init();

  // document.querySelector(".J_fixedTopClrear").onclick = function(){
  //   document.querySelector(".J_fixedTop").style.display = "none";
  // }

  var goodsId = location.search;
    goodsId = goodsId.split("=")[1];

    //初始化数据
  mui.post(getGoodsInfo(), {
    g_id: goodsId
  }, function (data) {
      console.log(data);
      var obj = data.data.goods_info;
      $('.J_title').html(obj.goods_name);
      $('.J_price').html(obj.goods_price);
      $('.J_goodsNum').html(obj.goods_num);
      $(".J_collection").html("关注(" + obj.collection_num + "）");
      $(".J_notice").html("收藏（" + obj.notice_num + "）");
      
    }, 'json'
  );



  mui(".J_fixedTop").on('tap', '.J_fixedTopClrear', function () {
    mui(".J_fixedTop")[0].style.display = "none";
  })


  //点击“我要分销” 按钮
  document.querySelector('.J_applyBtn').onclick = function () {
    location.href = "apply.html";
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


  //立即购买
  mui('.J_buyBtn').on('tap', ".l", function () {
    mui('.J_buy')[0].style.display = 'block';
    mui('.J_mask')[0].style.display = 'block';
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





}