window.onload = function () {
  mui.init();

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
      $('.J_city').html('<option value="b">城市</option>');
      $('.J_district').html('<option  value="b">区县</option>');
      console.log(data);
      obj = data.data.area_info.city;
      console.log(obj);
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
      console.log(data);
      obj = data.data.area_info.district;
      console.log(obj);
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

    $.post(getAddaddress(), {
      path: p1 + ',' + p2 + ',' + p3 + ',',
      username: 'outktv28lv2UjvPTeT1TvKRRx0tc',
      detail_address: '188号',
      to_user: name,
      post_num: postalcode,
      phone: phone
    }, function (data) {
      console.log(data);
    })



  })
}

