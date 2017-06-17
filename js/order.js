window.onload = function () {

    //初始化
    mui.init();
    var titleArr = ['全部订单', '待付款的订单', '待发货的订单', '已发货的订单', '已完成的订单'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);

    var stateList = document.querySelector(".J_topState").getElementsByTagName("li");
    stateList[stateId].className = "active";
    document.querySelector("title").innerHTML = titleArr[stateId];
    var opendid = localStorage.getItem('openid');
    if(!opendid) {
       location.href ='../index.html'
    }
    initDisplay();


    //初始化页面显示
    function initDisplay() {
        var tempStateId = parseInt(stateId) > 0 ? stateId - 1 : '*';
        $.post(getOrder(), {
            status: tempStateId,
            username: opendid
        }, function (data) {
            $('.J_loading').css('display', 'none');
            var obj = data.data.all_order_list;
            console.log(obj);
            // $('.J_goodsList').html('');
            if (obj.length < 1) {
                $('.J_noOrder').css('display', 'block');
                $('.J_goods').css('display', 'none');
                return;
            }
            $('.J_noOrder').css('display', 'none');
            $('.J_goods').css('display', 'block');
            CreateShopGoogsList(obj);
        })
    }
    
    //创建购买商品列表
    function CreateShopGoogsList(obj) {
        $('.J_goodsList').html('');
        for (var index in obj) {
            var item  = obj[index];
            var orderInfo = item.orderInfo;
            var str = '<li class="allOrder J_order">';
            str += '<p class="orderid">';
            str += '订单号：';
            str += '<span class="J_orderNo">' + item.order_no+ '</span>';
            if(item.status == '0') {
                str += '<a href="javascript:;" class="J_cancel" data="' + item.order_no + '">取消</a>';
            }
            str += '</p>';
            for(var i in orderInfo) {
                var goods = orderInfo[i];
                str += '<div class="item">';
                str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
                str += '<div class="list_m">';
                str += '<h3>' + goods.goods_name+ '</h3>';
                str += '</div>';
                str += '<div class="list_r">';
                str += '<p class="price">￥' + goods.price+ '</p>';
                str += '<p>× <span>' +goods.num+ '</span></p>';
                str += '</div>';
                str += '</div>';
            }
            str += '<p class="sumPrice">';
            str += '总价：￥';
            str += '<span>' + item.amount + '</span>';
            if(item.status == '0') {
                str += '<button class="J_buyBtn" data="'+item.order_no +'">付款</button>';
            } else {
                str += '<span class="right">已付款</span>';    
            }
            str += '</p>';
            str += '</li>';            
            $('.J_goodsList').append($(str));
        }
    }

    //点击“去逛逛” 按钮
    document.querySelector('.J_gotoIndex').onclick = function () {
        location.href = "../index.html";
    }

    //点击过付款
    $('.J_goodsList').on('tap','.J_buyBtn',function(){
        var order_no = $(this).attr('data');
        location.href = "obligationOrder.html?order_no=" + order_no;
        
    })

    //取消订单
    $('.J_goodsList').on('tap','.J_cancel',function(){
        var order_no = $(this).attr('data');
        $.post(cancelOrder(), {
            order_no: order_no
        }, function (data) {
            initDisplay();
        })

    })


    //点击了订单列表
    $('.J_goodsList').on('tap','.J_orderNo',function() {
        var orderNo = $(this).html();
        location.href = "orderInfo.html?order_no=" + orderNo;
    })

}