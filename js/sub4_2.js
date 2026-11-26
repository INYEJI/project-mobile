$('.benefits_tap .tab').click(function(e){

    e.preventDefault();

    var category = $(this).attr('data-category');

    // 탭 active 처리
    $('.benefits_tap .tab').removeClass('active');
    $(this).addClass('active');

    // 전체보기
    if(category == 'all'){
        $('.contlist > li').show();
    }else{
        // 일단 모든 카드 숨기기
        $('.contlist > li').hide();

        // 선택한 카테고리만 보이기
        $('.contlist > li[data-category="' + category + '"]').show();
    }

});