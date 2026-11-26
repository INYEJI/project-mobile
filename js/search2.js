// ========================================
// brand-search.js
// 브랜드별 상품 목록 / 카테고리 / 검색 / 페이지네이션
// ========================================


// ==============================
// 1. 기본 설정
// ==============================

let brandCurrentPage = 1;
const mobileQuery = window.matchMedia('(max-width: 767px)');
// 모바일 12개 / PC 36개
let brandItemsPerPage = mobileQuery.matches ? 12 : 36;

let brandProducts = [];        // 현재 브랜드의 전체 상품
let currentBrandData = [];     // 현재 화면에 보여줄 상품

const currentBrand = $('body').data('brand');



// ==============================
// 2. 브랜드별 카테고리 설정
// ==============================

const BRAND_CATEGORY_MAP = {

    // 아토팜
    AT: {
        43: 'BABY',
        48: 'LIFE',
        51: 'KIDS',
        89: 'MATERNITY',
        216: 'MOM'
    },

    // 제로이드
    ZR: {
        307: 'INTENSIVE',
        308: 'SOOTHING',
        309: 'PIMPROVE',
        310: 'ROOTHEAL',
        311: 'DERMANEWAL',
        312: 'SUNCARE',
        313: 'MD',
        347: 'SURGIANGELPLUS'
    },

    // 리얼베리어
    RB: {
        43: 'EXTREME',
        44: 'HYALAQUA',
        45: 'BRIGHTENING',
        46: 'TROUBLE',
        47: 'FIRMING',
        48: 'CLEANSING',
        49: 'SUNCARE',
        50: 'MASK'
    },

    // 더마비
    DB: {
        daily: 'DAILY',
        repair: 'REPAIR',
        ac: 'AC'
    }

};



// ==============================
// 3. 현재 브랜드 상품 불러오기
// product-data.js 사용
// ==============================

loadBrandProducts(currentBrand)
    .then(function(data) {

        brandProducts = data;

        console.log('현재 브랜드:', currentBrand);
        console.log('현재 브랜드 상품:', brandProducts);


        // 최초에는 전체 상품
        currentBrandData = brandProducts;

        brandCurrentPage = 1;


        // 상품 출력
        brandDataPrint(
            currentBrandData,
            brandCurrentPage
        );


        // 페이지네이션
        createBrandPagination(
            currentBrandData
        );

    });



// ==============================
// 4. 상품 출력
// ==============================

function brandDataPrint(arr, page) {

    // 전체 상품 개수
    $('.total_count').text(arr.length);


    // ------------------------------
    // 현재 페이지 상품 자르기
    // ------------------------------

    const start =
        (page - 1) * brandItemsPerPage;

    const end =
        start + brandItemsPerPage;

    const pageData =
        arr.slice(start, end);


    // ------------------------------
    // 상품 없음
    // ------------------------------

    if (arr.length === 0) {

        $('.product_list').html(
            '<p class="no_result">검색 결과가 없습니다.</p>'
        );

        return;
    }


    // ------------------------------
    // 상품 HTML 생성
    // ------------------------------

    let txt = '<ul>';


    pageData.forEach(function(product) {

        const name =
            product.name || '';

        const image =
            product.image || '';

        const productUrl =
            product.productUrl || '#';


        // 카테고리 코드 → 화면용 이름
        const category =
            BRAND_CATEGORY_MAP[currentBrand]
            ?.[product.category] || '';


        txt += '<li>';

        txt += '<a href="' + productUrl + '">';


        txt += '<img ';
        txt += 'src="' + image + '" ';
        txt += 'alt="' + name + '">';


        txt += '<span>';
        txt += category;
        txt += '</span>';


        txt += '<strong>';
        txt += name;
        txt += '</strong>';


        txt += '</a>';

        txt += '</li>';

    });


    txt += '</ul>';


    $('.product_list').html(txt);

}



// ==============================
// 5. 페이지네이션 생성
// ==============================

// 현재 페이지를 가운데 두고 max개 번호만 만들기
// 예) 전체 12페이지, 현재 7, max 5 → [5, 6, 7, 8, 9]
function getPageRange(current, total, max) {

    let start = Math.max(1, current - Math.floor(max / 2));
    let end   = Math.min(total, start + max - 1);

    // 끝 페이지 근처에서도 개수 유지
    start = Math.max(1, end - max + 1);

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
}


function createBrandPagination(arr) {

    const totalPage = Math.ceil(arr.length / brandItemsPerPage);

    // 1페이지 이하면 페이지네이션 숨김
    if (totalPage <= 1) {
        $('.pagination').empty();
        return;
    }

    // 보여줄 번호 개수: 모바일 5개 / PC 10개
    const maxButtons = mobileQuery.matches ? 5 : 10;
    const pages = getPageRange(brandCurrentPage, totalPage, maxButtons);

    let txt = '';


    // ------------------------------
    // 이전 버튼
    // ------------------------------

    txt += '<button type="button" class="page_btn arrow"';
    txt += ' aria-label="이전 페이지"';
    txt += ' data-page="' + (brandCurrentPage - 1) + '"';
    if (brandCurrentPage === 1) txt += ' disabled';
    txt += '>';
    txt += '<span class="material-symbols-outlined" aria-hidden="true">chevron_left</span>';
    txt += '</button>';


    // ------------------------------
    // 페이지 번호
    // ------------------------------

    pages.forEach(function (i) {

        const isActive = (i === brandCurrentPage);

        txt += '<button type="button"';
        txt += ' class="page_btn' + (isActive ? ' active' : '') + '"';
        if (isActive) txt += ' aria-current="page"';
        txt += ' data-page="' + i + '">';
        txt += i;
        txt += '</button>';

    });


    // ------------------------------
    // 다음 버튼
    // ------------------------------

    txt += '<button type="button" class="page_btn arrow"';
    txt += ' aria-label="다음 페이지"';
    txt += ' data-page="' + (brandCurrentPage + 1) + '"';
    if (brandCurrentPage === totalPage) txt += ' disabled';
    txt += '>';
    txt += '<span class="material-symbols-outlined" aria-hidden="true">chevron_right</span>';
    txt += '</button>';


    $('.pagination').html(txt);
}


// ==============================
// 6. 페이지 번호 클릭
// ==============================

$(document).on('click', '.pagination .page_btn', function () {

    const page = Number($(this).data('page'));

    // 현재 페이지를 다시 누르면 무시
    if (page === brandCurrentPage) return;

    brandCurrentPage = page;

    brandDataPrint(currentBrandData, brandCurrentPage);
    createBrandPagination(currentBrandData);

    // 목록 맨 위로 이동
    document.getElementById('brand_product')
        .scrollIntoView({ behavior: 'smooth', block: 'start' });
});


// ==============================
// 7. 카테고리 탭
// ==============================

$(document).on(
    'click',
    '.cate_tab .tab',
    function(e) {

        // a 태그 # 이동 방지
        e.preventDefault();


        // 선택한 카테고리
        const category =
            String(
                $(this).data('category')
            );


        // ------------------------------
        // active 변경
        // ------------------------------

        $('.cate_tab .tab')
            .removeClass('active');

        $(this)
            .addClass('active');


        // 카테고리 변경 시 1페이지
        brandCurrentPage = 1;


        // ------------------------------
        // ALL
        // ------------------------------

        if (category === 'ALL') {

            currentBrandData =
                brandProducts;

        }


        // ------------------------------
        // 특정 카테고리
        // ------------------------------

        else {

            currentBrandData =
                brandProducts.filter(
                    function(product) {

                        return String(
                            product.category
                        ) === category;

                    }
                );

        }


        // 상품 출력
        brandDataPrint(
            currentBrandData,
            brandCurrentPage
        );


        // 페이지네이션
        createBrandPagination(
            currentBrandData
        );

    }
);



// ==============================
// 8. 브랜드 페이지 상품 검색
// ==============================

$(document).on(
    'submit',
    '#brand_search_form',
    function(e) {

        e.preventDefault();


        // 검색어
        const keyword =
            $(this)
                .find('.brand_search_input')
                .val()
                .trim()
                .toLowerCase();


        // 검색하면 1페이지
        brandCurrentPage = 1;


        // ------------------------------
        // 빈 검색어
        // 전체 상품으로 복귀
        // ------------------------------

        if (keyword === '') {

            currentBrandData =
                brandProducts;


            brandDataPrint(
                currentBrandData,
                brandCurrentPage
            );


            createBrandPagination(
                currentBrandData
            );


            return;
        }


        // ------------------------------
        // 상품 검색
        // 상품명 + 카테고리
        // ------------------------------

        currentBrandData =
            brandProducts.filter(
                function(product) {

                    const name =
                        (product.name || '')
                            .toLowerCase();


                    const category =
                        (
                            BRAND_CATEGORY_MAP[currentBrand]
                            ?.[product.category] || ''
                        )
                        .toLowerCase();


                    return (
                        name.includes(keyword) ||
                        category.includes(keyword)
                    );

                }
            );


        // 검색 결과 출력
        brandDataPrint(
            currentBrandData,
            brandCurrentPage
        );


        // 검색 결과 페이지네이션
        createBrandPagination(
            currentBrandData
        );

    }
);

// ==============================
// 9. 화면 폭 변경 대응 (모바일 ↔ PC)
// ==============================

mobileQuery.addEventListener('change', function (e) {

    // 상품 데이터를 아직 못 불러왔으면 무시
    if (brandProducts.length === 0) return;

    // 지금 보던 첫 상품의 순번 (0부터)
    const firstIndex = (brandCurrentPage - 1) * brandItemsPerPage;

    // 개수 변경
    brandItemsPerPage = e.matches ? 12 : 36;

    // 보던 상품이 들어있는 페이지로 이동
    brandCurrentPage = Math.floor(firstIndex / brandItemsPerPage) + 1;

    brandDataPrint(currentBrandData, brandCurrentPage);
    createBrandPagination(currentBrandData);
});