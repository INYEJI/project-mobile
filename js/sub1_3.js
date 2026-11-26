 window.onload = function() {
    var container = document.getElementById('map1');
    var options = {
        center: new kakao.maps.LatLng(36.4143194, 127.4124078),
        level: 2
    };

    var map = new kakao.maps.Map(container, options);
    
    var mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
    
    var markerPosition  = new kakao.maps.LatLng(36.4143194, 127.4124078); 
    var marker = new kakao.maps.Marker({
        position: markerPosition,
    });

    marker.setMap(map);
    
    var overlay = new kakao.maps.CustomOverlay({
        map: map,
        position: marker.getPosition()       
    });
     
    //두번째 맵
     
    var container2 = document.getElementById('map2');
    var options2 = {
        center: new kakao.maps.LatLng(37.516098, 127.0369231),
        level: 2
    };

    var map2 = new kakao.maps.Map(container2, options2);
    
    var mapTypeControl2 = new kakao.maps.MapTypeControl();
    map2.addControl(mapTypeControl2, kakao.maps.ControlPosition.TOPRIGHT);

    var zoomControl2 = new kakao.maps.ZoomControl();
    map2.addControl(zoomControl2, kakao.maps.ControlPosition.RIGHT);
    
    var markerPosition2  = new kakao.maps.LatLng(37.516098, 127.0369231); 
    var marker2 = new kakao.maps.Marker({
        position: markerPosition2
    });

    marker2.setMap(map2);
    
    var overlay2 = new kakao.maps.CustomOverlay({
        map: map2,
        position: marker2.getPosition()       
    }); 
}

// 초기 설정
// $('.map_content').hide();
// $('.map_content').eq(0).show();
$('.tabs li a').eq(0).addClass('active');

function map2_hide(){
    $('.map_content:eq(1)').hide();
}
setTimeout(map2_hide , 1000);

// 탭 클릭
$('.tabs li a').click(function(e){

    e.preventDefault();

    var index = $(this).parent().index();

    // 탭
    $('.tabs li a').removeClass('active');
    $(this).addClass('active');

    // 내용
    $('.map_content').hide();
    $('.map_content').eq(index).show();

});