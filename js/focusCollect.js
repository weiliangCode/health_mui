window.onload = function () {
    mui.init();

    var titleArr = ['我的关注', '我的收藏'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);
    document.querySelector("title").innerHTML = titleArr[stateId];
    var opendid = localStorage.getItem('openid');
    if (!opendid) {
        location.href = '../index.html'
    }
    initDisplay();


    //刷新页面显示
    function initDisplay() {
        //初始化数据
        if (stateId === 0) {
            $.post(getUserNotice(), {
                username: opendid
            }, function (data) {
                var obj = data.data.notice_list;
                console.log(obj);
                creationData(obj, 'true');
            }, 'json'
            );
        } else {
            $.post(getUserCollection(), {
                username: opendid
            }, function (data) {
                var obj = data.data.collection_list;
                creationData(obj, 'false');
            }, 'json'
            );
        }
    }


    //创建数据
    function creationData(obj, floag) {
        $('.J_goodsList').html('');
        for (var index in obj) {
            var item = obj[index];
            item = item.goodsInfo;
            var str = '<li>';
            str += '<div class="content">';
            str += '<div class="list_l"><img src="../images/index/goods001.jpg" alt=""></div>';
            str += '<div class="list_m">';
            str += '<h3>' + item.goods_name + '</h3>';
            str += '<p>￥' + item.goods_price + '</p>';
            str += '</div>';
            str += '<div class="list_r">';
            str += '12小时前';
            str += '</div>';
            str += '</div>';
            str += '<p class="J_cancel" data="' + item.goods_id + '">';
            if (floag == 'true') {
                str += '取消关注';
            } else {
                str += '取消收藏';
            }
            str += '</p>';
            str += '</li>';
            $('.J_goodsList').append($(str));
        }
    }

    //取消按钮
    $('.J_goodsList').on('tap', '.J_cancel', function () {
        var g_id = $(this).attr('data');
        console.log($(this));
        console.log(g_id);
        if (stateId === 0) {
            $.post(cancelNotice(), {
                username: opendid,
                g_id: g_id
            }, function (data) {
                initDisplay();
            }, 'json'
            );
        } else {
            $.post(cancelCollection(), {
                username: opendid,
                g_id,g_id
            }, function (data) {
                initDisplay();
            }, 'json'
            );
        }
    })
}