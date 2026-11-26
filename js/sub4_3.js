
$(function(){

    $(window).on('scroll', function(){

        const scrollTop = $(window).scrollTop();
        const windowHeight = $(window).height();

        $('.process ol li').each(function(){

            const itemTop = $(this).offset().top;

            // 요소가 화면의 75% 지점에 도달하면
            if(scrollTop + windowHeight * 0.75 >= itemTop){

                $(this).find('strong').addClass('active');

            }

        });

    }).trigger('scroll');

});
