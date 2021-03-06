window.onload = function () {
  mui.init();
  var urldata = location.search;

  //获得省份
  $.post(getSite(), {
  }, function (data) {
    console.log(data);
    obj = data.data.area_info.province;
    for (var index in obj) {
      var item = obj[index];
      $('.J_province').append('<option value="' + item.area_id + '">' + item.area_name + '</option>')
    }
  })


  //获得城市
  $('.J_province').on('change', function () {
    var p1 = $(this).val();
    console.log(p1);
    $.post(getSite(), {
      path: p1 + ','
    }, function (data) {
      $('.J_city').html('<option value="城市">城市</option>');
      $('.J_district').html('<option  value="区县">区县</option>');
      obj = data.data.area_info.city;
      for (var index in obj) {
        var item = obj[index];
        $('.J_city').append('<option value="' + item.area_id + '">' + item.area_name + '</option>')
      }
    })
  })


  //获得地区
  $('.J_city').on('change', function () {
    var p1 = $('.J_province').val();
    var p2 = $(this).val();
    $.post(getSite(), {
      path: p1 + ',' + p2 + ','
    }, function (data) {
      $('.J_district').html('<option  value="区县">区县</option>');
      obj = data.data.area_info.district;
      for (var index in obj) {
        var item = obj[index];
        $('.J_district').append('<option value="' + item.area_id + '">' + item.area_name + '</option>')
      }
    })
  })

  //添加收贷地址
  $('.J_submit').on('tap', function () {
    var p1 = $('.J_province').val(),
      p2 = $('.J_city').val(),
      p3 = $('.J_district').val(),
      name = $('.J_name').val(),
      phone = $('.J_phone').val(),
      addInfo = $('.J_addInfo').val(),
      postalcode = $('.J_postalcode').val();

    if (!name) {
      $('.J_prompt').css('display', 'block');
      $('.J_message').html('收货人不能为空!');
      return;
    }
    if (!phone) {
      $('.J_prompt').css('display', 'block');
      $('.J_message').html('联系方式不能为空!');
      return;
    }
    if (p3 == '区县') {
      $('.J_prompt').css('display', 'block');
      $('.J_message').html('请选择收货地址!');
      return;
    }
    if (!addInfo) {
      $('.J_prompt').css('display', 'block');
      $('.J_message').html('请输入详情地址!');
      return;
    }
    if (!postalcode) {
      postalcode = '000000'
    }


    var opendid = localStorage.getItem('openid');
    if (!opendid) {
      location.href = '../index.html'
    }

    $.post(getAddaddress(), {
      path: p1 + ',' + p2 + ',' + p3 + ',',
      username: opendid,
      detail_address: '188号',
      to_user: name,
      post_num: postalcode,
      phone: phone
    }, function (data) {
      console.log(data);
      location.href = '../html/obligationOrder.html' + urldata;
    })



  })

  //取消
  $('.J_cancel').on('tap', function () {
    window.history.go(-1)
  })

  //关闭提示框
  $('.J_promptBtn').on('tap', function () {
    $('.J_prompt').css('display', 'none');
  })
}

