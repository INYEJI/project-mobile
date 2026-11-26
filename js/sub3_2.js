
$(function() {

    $('#content .sec').on('click', function() {

        const $card = $(this);
        const $icon = $card.find('h4 span');

        // 이미 열려 있는 카드를 클릭한 경우
        if ($card.hasClass('active')) {
            $card.removeClass('active');
            $card.children('.desc')
                 .stop(true, true)
                 .slideUp(400);
            $icon.text('keyboard_arrow_down');     
            return;
        }

        // 다른 카드 닫기
        $('#content .sec').removeClass('active');
        $('#content .sec .desc')
            .stop(true, true)
            .slideUp(400);
        $('#content .sec h4 span')
            .text('keyboard_arrow_down');

        // 선택한 카드 열기
        $card.addClass('active');
        $card.children('.desc')
             .stop(true, true)
             .slideDown(400);
        $icon.text('keyboard_arrow_up');

    });

});

 var swiper = new Swiper('.mySwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
        },
      });