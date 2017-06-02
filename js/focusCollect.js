window.onload = function () {
    mui.init();

    sessionStorage.setItem(username,'outktv28lv2UjvPTeT1TvKRRx0tc');
    var username = sessionStorage.getItem(username);   

    var titleArr = ['我的关注', '我的收藏'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);
    document.querySelector("title").innerHTML = titleArr[stateId];


    //初始化数据
    if(stateId === 0) {
        mui.post(getUserNotice(), {
            username: username
        }, function (data) {
            console.log(data);

        }, 'json'
        );
    } else {
         mui.post(getUserCollection(), {
            username: username
        }, function (data) {
            console.log(data);

        }, 'json'
        );
    }
}