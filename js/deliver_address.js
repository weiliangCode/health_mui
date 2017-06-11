mui.ready(function () {
    mui.init();

    //初始化
    var opendid = sessionStorage.getItem(opendid) ? sessionStorage.getItem(opendid) : 'outktv28lv2UjvPTeT1TvKRRx0tc';
    $.post(getAddress(), {
        username: opendid
    }, function (data) {
        console.log(data);
        var obj = data.data.default_address;
        if (obj) {
            var str = '<li class="mui-table-view-cell J_item" data="'+ obj.id + '">';
            str += '<p>';
            str += '<span class="left">' + obj.to_user + '</span>';
            str += '<span class="right">' + obj.phone + '</span>';
            str += '</p>';
            str += '<p><span class="default">[默认地址]</span>' + obj.pathstr + obj.detail_address + '</p>';
            str += '</li>';
            $('.J_list').append($(str));
        }
        var other = data.data.other_address;
        for (var index in other) {
           var item = other[index];
           var str = '<li class="mui-table-view-cell J_item" data="' + item.id+ '">';
            str += '<p>';
            str += '<span class="left">' + item.to_user + '</span>';
            str += '<span class="right">' + item.phone + '</span>';
            str += '</p>';
            str += '<p>' + item.pathstr + item.detail_address + '</p>';
            str += '</li>';
            $('.J_list').append($(str));
        }

    })

    //选择地址
    $('.J_list').on('tap', '.J_item', function(){
        var index = $(this).attr('data');
        console.log(index);
        location.href = '../html/obligationOrder.html'
    })

})