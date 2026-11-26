// ========================================
// 상품 데이터 불러오기
// product-data.js
// ========================================


// 1. 현재 페이지 기준 data 폴더 경로
const DATA_PATH = document.body.dataset.path;


// 2. 브랜드별 JSON 파일
const PRODUCT_FILES = {
    AT: DATA_PATH + 'at_products.json',
    ZR: DATA_PATH + 'zr_products.json',
    RB: DATA_PATH + 'rb_products.json',
    DB: DATA_PATH + 'db_products.json'
};

const BRAND_NAME = {
    AT: '아토팜 atopalm',
    RB: '리얼베리어 real barrier',
    ZR: '제로이드 zeroid',
    DB: '더마비 derma b'
};


// ========================================
// 3. 특정 브랜드 상품 불러오기
// ========================================

async function loadBrandProducts(brand) {

    const file = PRODUCT_FILES[brand];

    // 존재하지 않는 브랜드 코드 방지
    if (!file) {
        console.error('존재하지 않는 브랜드입니다:', brand);
        return [];
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error('상품 데이터를 불러오지 못했습니다.');
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(
            brand + ' 상품 데이터 로딩 실패:',
            error
        );

        return [];
    }
}


// ========================================
// 4. 전체 브랜드 상품 불러오기
// ========================================

async function loadAllProducts() {

    try {

        const brands = Object.keys(PRODUCT_FILES);

        const productLists = await Promise.all(
            brands.map(function(brand) {
                return loadBrandProducts(brand);
            })
        );

        // [[AT상품], [ZR상품], ...]
        // ↓
        // [AT상품, ZR상품, RB상품, DB상품]
        return productLists.flat();

    } catch (error) {

        console.error('전체 상품 데이터 로딩 실패:', error);

        return [];
    }
}