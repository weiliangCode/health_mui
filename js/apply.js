window.onload = function () {
    mui.init();

    //点击“返回” 按钮
    document.querySelector('.J_backBtn').onclick = function() {
        window.history.go(-1);
    }

}