
//(1)스플래시 스크린 처리코드
window.addEventListener('DOMContentLoaded', () => {
  const splash = document.getElementById('splash-screen');

  // 방문 기록('splashVisited')이 없는 '첫 방문자'일 때만 실행합니다.
  if (!sessionStorage.getItem('splashVisited')) {
    
    // 1. 숨겨져 있던 스플래시 스크린을 화면에 표시합니다.
    splash.classList.add('active');

    // 2. 1초(1000ms) 후에 페이드 아웃 애니메이션을 실행합니다.
    setTimeout(() => {
      splash.classList.add('fade-out');
      // 3. 다음 방문 시에는 뜨지 않도록 세션에 기록을 저장합니다.
      sessionStorage.setItem('splashVisited', 'true');
    }, 1000);
  }
  // 이미 방문한 사용자는 아무런 클래스도 추가되지 않으므로 
  // CSS의 기본값인 display: none 상태가 유지되어 깜빡이지 않습니다.
});


// (1) 메인 비주얼 스크롤 인터랙션
$(function () {

    const $progress = $('.visual .slide_progress');
    const $progressBar = $('.visual .progress_bar');

    const $text1 = $('.visual .text1');
    const $text2 = $('.visual .text2');

    const $heroScroll = $('.visual .hero_scroll');
    const $hero = $('.visual .main_hero');
    const $heroTrack = $('.visual .hero_track');
    const $heroImages = $heroTrack.find('img');

    if (
        !$progress.length ||
        !$heroScroll.length ||
        !$heroImages.length
    ) return;

    // ==============================
    // 1. 애니메이션 변수
    // ==============================

    let currentY = 0;
    let targetY = 0;

    // 이미지가 스크롤을 따라오는 속도
    const smooth = 0.08;

    let animationId = null;
    let ticking = false;

    // ==============================
    // 2. 진행률 제한 함수
    // ==============================

    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }

    // ==============================
    // 3. 스크롤 계산
    // ==============================

    function visualScroll() {

        const windowHeight = window.innerHeight;
        const scrollTop = $(window).scrollTop();

        // ------------------------------
        // 3-1. 진행바 채우기
        // ------------------------------

        const barTop = $progress.offset().top;
        const barHeight = $progress.outerHeight();

        const barStart =
            barTop - windowHeight * 0.8;

        const barDistance =
            barHeight + windowHeight * 0.3;

        let barProgress =
            (scrollTop - barStart) / barDistance;

        barProgress = clamp(barProgress, 0, 1);

        $progressBar.css(
            'height',
            barProgress * 100 + '%'
        );

        // ------------------------------
        // 3-2. 이미지 스크롤 진행률
        // ------------------------------

        const heroTop = $heroScroll.offset().top;
        const heroHeight = $heroScroll.outerHeight();

        const stickyTop = parseFloat(
            getComputedStyle($hero[0]).top
        ) || 0;

        const stickyDistance = Math.max(
            1,
            heroHeight - $hero.outerHeight() - stickyTop
        );

        const currentScroll =
            scrollTop - heroTop + stickyTop;

        let progress =
            currentScroll / stickyDistance;

        progress = clamp(progress, 0, 1);

        // ------------------------------
        // 3-3. 이미지 이동 거리
        // ------------------------------

        const imageHeight =
            $heroImages.eq(0).outerHeight();

        const maxMove =
            imageHeight * ($heroImages.length - 1);

        targetY = progress * maxMove;

        // ------------------------------
        // 3-4. 이미지 등장
        // ------------------------------

        const heroRect =
            $hero[0].getBoundingClientRect();

        if (
            heroRect.top < windowHeight * 0.9 &&
            heroRect.bottom > 0
        ) {
            $hero.addClass('show');
        } else {
            $hero.removeClass('show');
        }

        startAnimation();
    }

    // ==============================
    // 4. 이미지 부드러운 이동
    // ==============================

    function animateHero() {

        currentY +=
            (targetY - currentY) * smooth;

        if (Math.abs(targetY - currentY) < 0.1) {
            currentY = targetY;
        }

        $heroTrack.css(
            'transform',
            'translate3d(0, -' + currentY + 'px, 0)'
        );

        if (currentY !== targetY) {

            animationId =
                requestAnimationFrame(animateHero);

        } else {

            animationId = null;

        }
    }

    function startAnimation() {

        if (animationId === null) {

            animationId =
                requestAnimationFrame(animateHero);

        }
    }

    // ==============================
    // 5. 텍스트 등장
    // ==============================

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add('show');

                }

            });

        },
        {
            threshold: 0.3
        }
    );

    observer.observe($text1[0]);
    observer.observe($text2[0]);

    // ==============================
    // 6. 스크롤 이벤트
    // ==============================

    $(window).on('scroll resize', function () {

        if (!ticking) {

            ticking = true;

            requestAnimationFrame(function () {

                visualScroll();

                ticking = false;

            });

        }

    });

    // ==============================
    // 7. 최초 실행
    // ==============================

    visualScroll();

});



// (2) BRAND 스크롤 인터랙션
$(function () {

    const $scroll = $('.brand_scroll');
    const $images = $('.brand_images img');

    const imageCount = $images.length;

    if (!$scroll.length || !imageCount) return;

    let ticking = false;

    function updateBrandScroll() {

        const scrollTop = $(window).scrollTop();
        const sectionTop = $scroll.offset().top;

        const sectionHeight = $scroll.outerHeight();
        const windowHeight = window.innerHeight;

        const scrollDistance = Math.max(
            1,
            sectionHeight - windowHeight
        );

        // 전체 스크롤 진행률 (0 ~ 1)
        const progress = Math.max(
            0,
            Math.min(
                1,
                (scrollTop - sectionTop) / scrollDistance
            )
        );

        // 4장이라면 0 ~ 3까지 연속적으로 변화
        const imageProgress = progress * (imageCount - 1);

        const currentIndex = Math.min(
            imageCount - 1,
            Math.floor(imageProgress)
        );

        const fadeProgress = imageProgress - currentIndex;

        // 이전 이미지들을 초기화
        $images.css({
            opacity: 0,
            zIndex: 0
        });

        // 현재 이미지
        $images.eq(currentIndex).css({
            opacity: 1,
            zIndex: 1
        });

        // 다음 이미지가 서서히 나타남
        if (currentIndex < imageCount - 1) {
            $images.eq(currentIndex + 1).css({
                opacity: fadeProgress,
                zIndex: 2
            });
        }
    }

    function onScroll() {

        if (!ticking) {

            requestAnimationFrame(function () {
                updateBrandScroll();
                ticking = false;
            });

            ticking = true;
        }
    }

    updateBrandScroll();

    $(window).on('scroll resize', onScroll);

});



// careers 아코디언 메뉴
$(function () {
  $(".career_btn").click(function () {
    const $li = $(this).closest("li");
    // 다른 FAQ 닫기
    $li
      .siblings()
      .removeClass("active")
      .find(".career_open")
      .stop()
      .slideUp(400);
    $li.siblings().find(".career_btn").attr("aria-expanded", "false");
    // 현재 FAQ 열기/닫기
    $li.toggleClass("active");
    $(this).attr("aria-expanded", $li.hasClass("active"));
    $li.find(".career_open").stop().slideToggle(400);
  });
});
