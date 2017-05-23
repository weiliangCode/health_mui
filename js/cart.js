window.onload = function () {
    mui.init();

    var titleArr = ['购物车', '购物记录'];
    var stateId = location.search;
    stateId = parseInt(stateId.split("=")[1]);

    var stateList = document.querySelector(".J_topState").getElementsByTagName("li");
    stateList[stateId].className = "active";

    document.querySelector("title").innerHTML = titleArr[stateId];

}