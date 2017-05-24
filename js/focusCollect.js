window.onload = function () {
    mui.init();

    var titleArr = ['我的关注', '我的收藏'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);
    document.querySelector("title").innerHTML = titleArr[stateId];

}