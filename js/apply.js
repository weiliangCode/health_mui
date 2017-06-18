window.onload = function () {
    mui.init();

    //点击“返回” 按钮
    document.querySelector('.J_backBtn').onclick = function() {
        window.history.go(-1);
    }

    $('.J_submit').on('tap',function(){
        var storeName = $('.J_storeName').val();
        var phone = $('.J_phone').val();
        var qq = $('.J_qq').val();
        // var agreement = $('.J_agreement')[0].checked;

        if(!storeName) {
            $('.J_message').html('店铺名不能为空！');
            $('.J_prompt').css('display','block');
            return;
        }
        if(!phone) {
            $('.J_message').html('联系方式不能为空!');
            $('.J_prompt').css('display','block');
            return;
        }
        if(!qq) {
            $('.J_message').html('QQ不能为空!');
            $('.J_prompt').css('display','block');
            return;
        }
        // if(!agreement) {
        //     $('.J_message').html('请阅读代言协议!');
        //     $('.J_prompt').css('display','block');
        //     return;
        // }

        $('.J_state li').eq(0).removeClass('active');
        $('.J_state li').eq(1).addClass('active');
        $('.J_finish').css('display','block');
    })

    $('.J_promptBtn').on('tap',function(){
        $('.J_prompt').css('display','none');
        
    })

}