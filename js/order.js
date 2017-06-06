window.onload = function () {
    mui.init();

    var titleArr = ['全部订单', '待付款的订单', '待发货的订单', '已发货的订单', '已完成的订单'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);

    var stateList = document.querySelector(".J_topState").getElementsByTagName("li");
    stateList[stateId].className = "active";

    document.querySelector("title").innerHTML = titleArr[stateId];

    //点击“去逛逛” 按钮
    document.querySelector('.J_gotoIndex').onclick = function() {
        location.href = "../index.html";
    }

    //获得订单信息
    if(stateId > 0 && stateId < 5) {
        mui.post(getOrder(), {
            status:stateId -1,
            username: 'outktv28lv2UjvPTeT1TvKRRx0tc'
        }, function (data) {
            var obj = JSON.parse(data);
            obj = obj.data.all_order_list;

            if(obj.length < 1) {
                $('.J_noOrder').css('display','block');
                $('.J_goods').css('display','none');
                return;
            } 
            $('.J_noOrder').css('display','none');
            $('.J_goods').css('display','block');
            
            for(var i=0; i<obj.length; i++) {
                var str = '<li>';
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
                console.log(11111)
            }
        })

    }


}