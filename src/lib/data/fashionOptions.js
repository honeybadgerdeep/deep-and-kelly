var Culture = {
    Western: 'Western Formal',
    Indian: 'Indian'
};

export var ColorsToAvoid = {
    [Culture.Western]: [
        { color: 'White', cssColor: '#FFFFFF' },
        { color: 'Ivory', cssColor: '#FFFFF0' },
        { color: 'Cream', cssColor: '#FFFDD0' },
        { color: 'Red', cssColor: '#FF0000' },
        { color: 'Sage', cssColor: '#9C9B7A' }
    ],
    [Culture.Indian]: [
        { color: 'Red', cssColor: '#FF0000' },
        { color: 'White', cssColor: '#FFFFFF' },
        { color: 'Yellow', cssColor: '#FFFF00' },
    ]
}

export var CultureDay = {
    [Culture.Western]: 'Saturday',
    [Culture.Indian]: 'Sunday'
}

var Gender = {
    Male: 'Men',
    Female: 'Women'
};

export var fashionOptions = {
    [Culture.Western]: {
        [Gender.Male]: {
            options: [
                {
                    description: 'Suit',
                    image: 'https://images.menswearhouse.com/is/image/TMW/MWTSP22_WED_PSL_FML_1917_MAIN?$TUXPDPZOOM$'
                },
                {
                    description: 'Button Up Jacket',
                    image: 'https://cdn.lookastic.com/looks/blazer-long-sleeve-shirt-chinos-large-65783.webp'
                }                
            ],
            checkOutToBuy: [
                {
                    link: 'https://www2.hm.com/en_us/men.html',
                    name: 'H&M'
                },
                {
                    link: 'https://www.express.com/mens-clothing?ICID=M_HEADER_MENSCLOTHING',
                    name: 'Express'
                },
                {
                    link: 'https://www.menswearhouse.com/?utm_source=google&utm_medium=paidsearch&utm_campaign=TMW_Retail_SEM_Brand_Generic_All_USD_English_Google_Exact&ogmap=SEM|BRN|GOOG||c|||TMW_Retail_SEM_Brand_Generic_All_USD_English_Google_Exact||mens%20warehouse%27|125931056|6972482576&gad_source=1&gclid=Cj0KCQjwr9m3BhDHARIsANut04byP3ydJQr9UtMgv4atbv9xczAoQlvyY452dIp533nKkKQlf0caRE0aAqTPEALw_wcB',
                    name: "Men's Wear House"
                },
                {
                    link: 'https://bananarepublicfactory.gapfactory.com/browse/men/shop-all-mens-clothing?cid=1145413&mlink=39812,30016305,FLYOUT_MEN',
                    name: 'Banana Republic'
                }
            ]
        },
        [Gender.Female]: {
            options: [
                {
                    description: 'Dress<br/>(Midi or Maxi Length)',
                    image: 'https://i.etsystatic.com/25925166/r/il/cb0669/4993483226/il_794xN.4993483226_hjqk.jpg'
                },
                {
                    description: 'Jumpsuit',
                    image: 'https://www.lulus.com/images/product/xlarge/8076421_1637576.jpg'
                }
            ],
            checkOutToBuy: [
                {
                    link: 'https://www.express.com/womens-clothing?ICID=W_HEADER_WOMENSCLOTHING',
                    name: 'Express'
                },
                {
                    link: 'https://francescas.com/?utm_source=google&utm_medium=cpc&tw_source=google&tw_adid=651968545880&tw_campaign=19851744435&gad_source=1&gclid=Cj0KCQjwr9m3BhDHARIsANut04YGTV2Plwc6oqJwDohwkr_Lz_-HbsbmfzW-Rly2-gHPuaRDxPrTEJYaAl6wEALw_wcB',
                    name: 'Francesca'
                },
                {
                    link: 'https://www.windsorstore.com/collections/occasions-wedding-guest-dresses',
                    name: 'Windsor'
                },
                {
                    link: 'https://www.lulus.com/categories/2042_2106/wedding-guest.html?subsite=bridal',
                    name: "Lulu's"
                }
            ]
        }
    },
    [Culture.Indian]: {
        [Gender.Male]: {
            options: [
                {
                    description: 'Jodhpuri Suit',
                    image: 'https://img.perniaspopupshop.com/catalog/product/a/b/ABKA122314_4.jpeg?impolicy=detailimageprod'
                },
                {
                    description: 'Kurta Pajama',
                    image: 'https://i.etsystatic.com/19536903/r/il/fa6c57/3219450896/il_1140xN.3219450896_t9p2.jpg'
                }                    
            ],
            checkOutToBuy: [
                {
                    link: 'https://www.utsavfashion.com/men',
                    name: 'Utsav Fashion'
                },
                {
                    link: 'https://www.etsy.com/search?q=indian%20menswear&ref=auto-1&as_prefix=indian%20menswear',
                    name: 'Etsy'
                },
                {
                    link: 'https://www.kalkifashion.com/ethnic/see-all-men-s-wear.html?gad_source=1&gclid=Cj0KCQjwr9m3BhDHARIsANut04Yy1onq78fXPhvMa6CSMDVIKRVCqV_HNYjgDPL_FNZmmPKgajE8KSAaArhcEALw_wcB',
                    name: 'Kalki'
                },
                {
                    link: 'https://www.manyavar.com/en-us/men/wedding-attendee?page=1',
                    name: 'Manyavar'
                }
            ]
        },
        [Gender.Female]: {
            options: [
                {
                    description: 'Saree',
                    image: 'https://us.anitadongre.com/dw/image/v2/BGCX_PRD/on/demandware.static/-/Sites-masterCatalog_AD_India/default/dw318d9c26/images/hires/F24/Women/F24R44_Blue_1.jpg?sw=1300&sh=1950&sm=fit'
                },
                {
                    description: 'Lehenga',
                    image: 'https://images.cbazaar.com/images/Deep-Green-Velvet-Embroidered-Sequins-A-Line-Lehenga-With-Dupatta-GHSDECB1008-u.jpg'
                }
            ],
            checkOutToBuy: [
                {
                    link: 'https://www.etsy.com/search?q=indian+saree+or+lehenga&ref=search_bar',
                    name: 'Etsy'
                },
                {
                    link: 'https://www.utsavfashion.com/',
                    name: 'Utsav Fashion'
                },
                {
                    link: 'https://www.kalkifashion.com/',
                    name: 'Kalki'
                },
                {
                    link: 'http://Saree.com',
                    name: 'Saree.com'
                }
            ]
        }
    },
};