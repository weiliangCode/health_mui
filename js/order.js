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
    mui.post(getOrder(), {
        status:stateId,
        username: 'outktv28lv2UjvPTeT1TvKRRx0tc'
    }, function (data) {
        var obj = JSON.parse(data);
        obj = obj.data.all_order_list;

        if(obj.length < 1) {
            $('.J_noOrder').css('display','block');
            return;
        } 
        $('.J_noOrder').css('display','none');
        console.log(obj);
    })
}