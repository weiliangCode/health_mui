window.onload = function () {
    mui.init();

    var titleArr = ['我的关注', '我的收藏'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);
    document.querySelector("title").innerHTML = titleArr[stateId];


    //初始化数据
    if(stateId === 0) {
        mui.post(getUserNotice(), {
            username: username
        }, function (data) {
            var obj = data.data.notice_list;
            for(var index in obj) {
                var item = obj[index];
                var str = '<li>';
                str += '<div class="content">';
                str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
                str += '<div class="list_m">';
                str += '<h3>健康无忧体检套餐</h3>';
                str += '<p>￥498</p>';
                str += '</div>';
                str += '<div class="list_r">';
                str += '12小时前';
                str += '</div>';
                str += '<p>取消关注</p>';
                str += '</li>';
                $('.J_goodsList').append($(str));
            }
        }, 'json'
        );
    } else {
         mui.post(getUserCollection(), {
            username: username
        }, function (data) {
             var obj = data.data.collection_list;
             console.log(obj);
            for(var index in obj) {
                var item = obj[index];
                var str = '<li>';
                str += '<div class="content">';
                str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
                str += '<div class="list_m">';
                str += '<h3>健康无忧体检套餐</h3>';
                str += '<p>￥498</p>';
                str += '</div>';
                str += '<div class="list_r">';
                str += '12小时前';
                str += '</div>';
                str += '<p>取消收藏</p>';
                str += '</li>';
                $('.J_goodsList').append($(str));
            }
        }, 'json'
        );
    }
}