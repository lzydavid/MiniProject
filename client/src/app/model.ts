export interface Restaurant {
    name:string
    address:string
    rating:number
    photoRef:string
    placeId:string
}

export interface PlaceDetails {
    placeId:string
    name:string
    address:string
    openNow:boolean
    website:string
    priceLevel:number
    opening_hours:string[]
    reviews:review[]
}

export interface review {
    author:string
    rating:number
    description:string
    time:string
}

export interface UserAccount {
    id:string
    email:string
    password:string
    firstName:string
    lastName:string
}

export interface UserLogin {
    email:string
    password:string
}

export interface RegisterResult {
    status:boolean
    message:string
}

export const restaurants:Restaurant[] = [
    {name:'Toast Box',address:'3155 Commonwealth Avenue West, #01-01/02, The Clementi Mall, Singapore 129588',rating:3.7,photoRef:'AZose0l753mRuFbB6R5v6EsN8-L464U42Wnu8_xwD2VWYzfYNDk8g_k494Mc09xhsgvMk4yp3bbN95fYR1GB7W-Oceb2GN3ujGcLkMQVa2RoecsRC7mAMVHUEsNXxva6jqswnqkOLstur9Ic9l4ADeXQq-4QVNNOgv7QjmxG-EwBUEiKKExC',placeId:'ChIJCbIiMY4a2jERCO2HiGa0ax8'},

    {name:'W39 Bistro & Bakery',address:'39 Jln Mas Puteh, Singapore 128637',rating:2,photoRef:'AZose0k3ynI3I32SN6ssu6bdBHLinsHEYWFqRb9qGNl9HYp4QB1v5nznLP-1yHH5px7C4DoICjZzRZJ7WT8vhwc19zgz40_yKAbaW68-3bRrI2Db_20QcsaDEVJgizBsUZGzXTn4R5-kgzVaX-YHznsdjGkRAhASi5eOjQUha5VQY458V0Vz',placeId:'ChIJ6ad6tpIa2jERYXVn6uL9OjM'},

    {name:'Benches Cafe',address:'93A Clementi Rd, Singapore 12978',rating:5,photoRef:'AZose0kzKaNZ0Hp8MfDkdEi9R4-jTWbs3Bz8KcWqyqcAXvt_875l43BOGbRrA_VejRALezuxW0gBRb4NDfnZVljXgNx7_5AoByDsv0nF-_yZWQyHBpse2HUBwunU6xKNMFHor0cZqNH1Wchys46zF5VgQ5fi3lrs5rcLxQFNLiNFyF7FEf8Y',placeId:'ChIJ_8M8XRob2jERNlp5OHUVWRQ'},

    {name:'Jovis Cafe - The Dining Place',address:'104 Faber Dr, Singapore 129412',rating:4.5,photoRef:'AZose0mcpUN868RrDW5IeUSoAeAA8swvE8H2S1err2YhFTEORDjRiuEGZ-B7oeLFr4IXD_P93TUZgGlgzzDxzL8xpEbGNtDYGmOaf-nYprnRx0dwZZtOwo7exM1dKeWpCd9EzCdHPUCoWq2GpDI-FvTSIAuuRlW66BOeGNZFcHtuNiWsCgLs',placeId:'ChIJz86GbZka2jERAFWm-I-74wU'},

    {name:'Kith Café West Coast',address:'123 West Coast Crescent Located within Seahill, #01-17 Oasia Residence, Singapore 126779',rating:4.1,photoRef:'AZose0kx94J5OfneE4mlBdUvATTmC_ekNQnrr9EKRQtWv61RyOzconz1Jca8dh41k-BZLdrJVwAxi0UGdXRA352M9URVubzaXGLUwysSctkb5fo-ckZab4HKoDWG7MFR2rAwxfE6lmmC5rLYh9C2_TdMvHxjzlyISSdaKDA4wzR2VjToJiHM',placeId:'ChIJdz5RedEb2jERkoqLbZBzxyM'},
    
    // {name:'Koi Café',address:'3155 Commonwealth Ave W, Singapore 129588',rating:4.2,photoRef:'AZose0nb2PrGDzyfIdfB1S1oRQljk4Lq1akKij-DllU2G-gxGMnPOkFLfoBGrwnF74CEDnx2lqh6ywO1AL7epzJeNwxa-dfu2U1zGQsRPnpNHDwhpfQDSieGLVrm9vmDF-xEWxXNAZnbWdr64PkeXC2ggVqQuJgBATEIMx0NItilbaad9ihv',placeId:'ChIJy0ddPY4a2jERHKGSJfENs0g'},
    
    // {name:'Dawn\'s Gelateria and Cafe',address:'106 Clementi Street 12, #01-38, Singapore 120106',rating:4.5,photoRef:'AZose0nRJF75S3Xl1pYapH6ANVCLDT5M_uvrnjqNbTJnJHQ_AQ3NLCe6txojhgB3K7Dz3UoezWNTAu0INDMhLy0JsyDlbPJde6uuU0Qw2vpOYKdCiZ0gNGo_Xu8_0TxDgE6thdwdCIexoRA-M6bSpjeRaSh8K8gC3mhjlVfZfpfA4en0schv',placeId:'ChIJaTxxRRQb2jEROz8Gf-c0kUE'},

    // {name:'Polar Beurre Cafe',address:'721 Clementi West Street 2, #01-134, Singapore 120721',rating:4.7,photoRef:'AZose0lWXS_-rdao-4YiisKY5Xc4PzgaHAAFlLimb-jq-nOTIfVPJsBSf8F8GHDDR2elbA6j9ETNo_AwbUUz59SAAiXK1QV1XXCrjFq3gqu7YXPHEHcTiNaivvn1Uc5s43kZxvyTQMY4mO5r_q9OE9iVADvfVyxbJw10GIWg5MwmeHkTPzX7',placeId:'ChIJaTxxRRQb2jEROz8Gf-c0kUE'},

    // {name:'KopiWU @ 420A Clementi',address:'420A Clementi Ave 1, Singapore 121420',rating:3.6,photoRef:'AZose0kLmpK3Y3EfAR1X6m-dZ4-ENTvrDOU8cjbyWFR-1Hw3OMIMAV-LkHPGVPMqEf-vspGmopt9zLimAOsiHL9oIj71Wd1PFClNr1UibrTcazMjSuSr6zHnA187fuqzwO-yt8o_XYdLhWncINR6EuJK-sOrgQGSfs1aPPU0g1EaKE4s8uz_',placeId:'ChIJgc_phYwa2jERkFscJXgrR0k'},

    // {name:'Bistro8@Clementi',address:'442 Clementi Ave 3, Singapore 120442',rating:3.8,photoRef:'AZose0mZf1Mpem5enWlncsp2HRhCAoi_fMruZ69tM3z4w-CMBz-PUUGkQBvzyh_Pj-1Iw56c0gfr--id3143oF2mx891bFIWtSAxpxJ17tDkIiNxrHxvPBQeOnz_HA3kajFBkeHgU9WiWrJcZrcAMOit9dDKfzR0pcXQwdEvGCvuPMJAO7o7',placeId:'ChIJBZNQ8I0a2jER0F97SNZ_DSo'},

    // {name:'Biggby Coffee',address:'3155 Commonwealth Ave W, #04-23/24, Singapore 129588',rating:3.8,photoRef:'AZose0mwKZ_nRy3urSvv10l_HZbXHxH2mCCRD8p-4QDQxRyEFzePzWMFbc6ekf6CqGk37UzijJOQMmnB11c3eNbzeE80mG3S8Z5uDLXNlE46rVEQuVb1XJQg8WSG2UJMLDR2I1LobBlxQrCuPk2X93NV9i7uxtyhmJVocIyjwoIRFAm9gmmi',placeId:'ChIJzcTFtDMb2jERVpWWznA2KOM'}

  ]

