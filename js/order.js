window.onload = function () {
    mui.init();

    var titleArr = ['全部订单', '待付款的订单', '待发货的订单', '已发货的订单', '已完成的订单'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);

    var stateList = document.querySelector(".J_topState").getElementsByTagName("li");
    stateList[stateId].className = "active";

    document.querySelector("title").innerHTML = titleArr[stateId];

    //点击“去逛逛” 按钮
    document.querySelector('.J_gotoIndex').onclick = function () {
        location.href = "../index.html";
    }

    //获得订单信息
    stateId = parseInt(stateId) > 0 ? stateId - 1 : '*';
    var opendid = sessionStorage.getItem(opendid) ? sessionStorage.getItem(opendid) : 'outktv28lv2UjvPTeT1TvKRRx0tc';
    $.post(getOrder(), {
        status: stateId,
        username: opendid
    }, function (data) {
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
        $('.J_loading').css('display', 'none');
    })

    //创建普通商品列表
    function CreateGoogsList(obj) {
        for (var i = 0; i < obj.length; i++) {
            var str = '<li class="item">';
            str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>'
            str += '<div class="list_m">'
            str += '<h3>健康无忧体检套餐</h3>'
            str += '</div>'
            str += '<div class="list_r">'
            str += '<p class="price">￥498</p>'
            str += '<p>× <span>1</span></p>'
            str += '</div>'
            str += '</li>'
            $('.J_goodsList').append($(str));
        }
    }

    //创建购买商品列表
    function CreateShopGoogsList(obj) {
        for (var index in obj) {
            var item  = obj[index];
            var str = '<li class="allOrder">';
            str += '<p class="orderid">';
            str += '订单号：';
            str += '<span>' + item.order_no+ '</span>';
            if(item.status == '0') {
                str += '<a href="javascript:;">取消</a>';
            }
            str += '</p>';
            str += '<div class="item">';
            str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
            str += '<div class="list_m">';
            str += '<h3>健康无忧体检套餐</h3>';
            str += '</div>';
            str += '<div class="list_r">';
            str += '<p class="price">￥498</p>';
            str += '<p>× <span>1</span></p>';
            str += '</div>';
            str += '</div>';
            str += '<p class="sumPrice">';
            str += '总价：￥';
            str += '<span>2222.00</span>';
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


    //点击过付款
    $('.J_goodsList').on('tap','.J_buyBtn',function(){
        var order_no = $(this).attr('data');
        // console.log(order_no);
        location.href = "obligationOrder.html?order_no=" + order_no;
        
    })


}