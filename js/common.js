//모든 페이지 공통 js




//(2)샌드위치메뉴 열고 닫기 처리코드
var op = false;  //네비가 열려있으면(true) , 닫혀있으면(false)

$(".menu_ham").click(function(e) { //메뉴버튼 클릭시
    e.preventDefault();
    
    var documentHeight =  $(document).height(); //전체 페이지의 높이
    $("#gnb").css('height',documentHeight); //네비의 높이를 전체 전체 페이지의 높이로...

  if(op==false){  //메뉴가 닫혀있는 상태에서 클릭했냐??
    $('#headerArea .modal').show();
    $("#gnb").animate({right:0,opacity:1}, 'fast');  //네비가 우측에서 날라온다
    $('#headerArea').addClass('mn_open');  //닫기버튼 모양
    op=true;  //상태->열림!
  }else{  //true -> 메뉴가 열려있는 상태에서 클릭했냐??
    $('#headerArea .modal').hide();
    $("#gnb").animate({right:'-100%',opacity:0}, 'fast'); //네비를 우측으로 보낸다(메뉴닫기)
    $('#headerArea').removeClass('mn_open'); //열기버튼 모양
    op=false;//상태->닫기!
  }

});
   
//2depth 메뉴 교대로 열기 처리 
var onoff=[false,false,false,false]; //가정법 false(서브닫힘) , true(열림)
var arrcount=onoff.length;  // 배열의 개수 4
//console.log(arrcount);

$('#gnb .depth1 h3 a').click(function(e){  //1depth메뉴를 클릭하면
  e.preventDefault();
    
  var ind=$(this).parents('.depth1').index();  // 0~3
  //var ind=$(this).index('#gnb .depth1 h3 a');
    
  //console.log(ind);
    
    if(onoff[ind]==false){  //각각의 1depth메뉴의 서브가 닫혀있냐??
    //$('#gnb .depth1 ul').hide();
    $(this).parents('.depth1').find('ul').slideDown('slow'); //자신의 서브를 열어라
    $(this).parents('.depth1').siblings('li').find('ul').slideUp('fast'); //자신을 제외한 모든 서브를 닫아라

      for(var i=0; i<arrcount; i++) onoff[i]=false; //모든 배열값을 false
      onoff[ind]=true;  //자신의 대한 배열만 true로 변경
        
      $('.depth1 span').text('+');   // 모든 메뉴가 닫혀있다 (+)
      $(this).find('span').text('-');   //자신만 메뉴가 열려있다 (-)
        
    }else{ //true -> 각각의 1depth메뉴의 서브가 열려있냐??
      $(this).parents('.depth1').find('ul').slideUp('fast'); //지 서브를 닫아라~~
      onoff[ind]=false;  // true->false 
        
      $('.depth1 span').text('+');     // 모든 메뉴가 닫혀있다 (+)
    }

    if($(this).hasClass('active')){
    // 이미 열려 있는 메뉴를 다시 클릭하면
    $(this).removeClass('active');
    }else{
        // 다른 메뉴의 active 제거
        $('.depth1 h3 a').removeClass('active');
        // 클릭한 메뉴에 active 추가
        $(this).addClass('active');
    }
}); 


//(3)헤더영역 배경색상 스크롤 처리 + top메뉴 나타나기
var vh = $('.visual').height();  //비주얼의 높이
var hh = $('#headerArea').height(); //헤더의 높이

  $(window).on('scroll',function(){//스크롤의 거리가 발생하면
    var scroll = $(window).scrollTop();  //스크롤의 거리

      if(scroll>vh-hh){ //스크롤이 비주얼 보다 아래로 내려올 때
           $('#headerArea').css('background','rgba(34,34,34,1)').css('box-shadow','1px 1px 10px 1px rgba(0,0,0,.3)');
          $('#footerArea .top_move').fadeIn('fast');
      }else{
           $('#headerArea').css('background','rgba(0,0,0,0)').css('box-shadow','none');
          $('#footerArea .top_move').fadeOut('fast');
      } 
  });

  //top버튼 클릭 시 상단으로 부드럽게 이동
  $('.top_move').click(function(e){
      e.preventDefault();
      //상단으로 스르륵 이동합니다.
      $("html,body").stop().animate({"scrollTop":0},700); //스크롤을 부드럽게 목표지점까지 이동시키는 코드
});

//(4) footer 영역 family 사이트 선택 메뉴 열고 닫기
  const family = document.querySelector('.family');
  const familyBtn = family.querySelector('.arrow');

  familyBtn.addEventListener('click', function (e) {
    e.preventDefault(); // href="#" 때문에 페이지 맨 위로 튀는 것 방지
    family.classList.toggle('on');
  });

// (5) careers에 왔을 때 색상 변경
// const $careers = $('.careers');
// const $menu = $('.menu_ham');

// function changeMenuColor() {

//     if (!$careers.length || !$menu.length) return;

//     const careersRect = $careers[0].getBoundingClientRect();
//     const menuRect = $menu[0].getBoundingClientRect();

//     const menuY = menuRect.top + menuRect.height / 2;

//     const isCareers =
//         careersRect.top <= menuY &&
//         careersRect.bottom >= menuY;

//     $menu.toggleClass('color_change', isCareers);
// }

// // 스크롤할 때 실행
// $(window).on('scroll resize', changeMenuColor);

// // 페이지 처음 로딩 시에도 실행
// changeMenuColor();


