export interface Restaurant {
    name:string
    address:string
    rating:number
    priceLevel:number
    photoRef:string
    placeId:string
}

export interface PlaceDetails {
    placeId:string
    name:string
    address:string
    openNow:boolean
    delivery:boolean
    dineIn:boolean
    takeout:boolean
    reservable:boolean
    website:string
    phoneNo:string
    priceLevel:number
    numOfUserRating:number
    rating:number
    wheelChairAccessible:boolean
    servesBreakfast:boolean
    servesBrunch:boolean
    servesLunch:boolean
    servesDinner:boolean
    servesBeer:boolean
    servesWine:boolean
    servesVegetarianFood:boolean
    opening_hours:string[]
    reviews:review[]
}

export interface review {
    author:string
    rating:number
    description:string
    time:string
    profileUrl:string
}

export interface UserAccount {
    id:string
    email:string
    password:string
    firstName:string
    lastName:string
}

export interface UserCredentials {
    email:string
    password:string
}

export interface RegisterResult {
    status:boolean
    message:string
}

export interface Collection{
    colId:string
    collectionName:string
    restaurants:Restaurant[]
}

export interface Region {
    name: string;
    options: Option[];
}
export interface Option {
    name: string;
}

export const Region: Region[] = [
    {
      name: 'West',
      options: [
        { name: 'Bukit Batok' },
        { name: 'Bukit Panjang' },
        { name: 'Boon Lay' },
        { name: 'Pioneer' },
        { name: 'Choa Chu Kang'},
        { name: 'Clementi' },
        { name: 'Jurong East' },
        { name: 'Jurong West' },
        { name: 'Tengah' },
        { name: 'Tuas' },
        { name: 'Pioneer' },
        { name: 'Pasir Laba'},
        { name: 'Teban Gardens'},
        { name: 'West Coast'}
      ]
    },
    {
      name: 'East',
      options: [
        { name: 'Bedok' },
        { name: 'Changi' },
        { name: 'Changi Bay' },
        { name: 'Paya Lebar' },
        { name: 'Pasir Ris' },
        { name: 'Tampines' }
      ]
    },
    {
      name: 'North',
      options: [
        { name: 'Lim Chu Kang' },
        { name: 'Mandai' },
        { name: 'Sembawang' },
        { name: 'Simpang' },
        { name: 'Sungei Kadut' },
        { name: 'Woodlands' },
        { name: 'Yishun' }
      ]
    },
    {
      name: 'North-East',
      options: [
        { name: 'Ang Mo Kio' },
        { name: 'Hougang' },
        { name: 'Punggol' },
        { name: 'Seletar' },
        { name: 'Sengkang ' },
        { name: 'Serangoon' }
      ]
    },
    {
      name: 'Central',
      options: [
        { name: 'Bishan' },
        { name: 'Bukit Merah' },
        { name: 'Geylang' },
        { name: 'Kallang' },
        { name: 'Marine Parade' },
        { name: 'Queenstown' },
        { name: 'Southern Islands' },
        { name: 'Toa Payoh' },
      ]
    }
];

export const restaurants:Restaurant[] = [
    {name:'Toast Box',address:'3155 Commonwealth Avenue West, #01-01/02, The Clementi Mall, Singapore 129588',rating:3.7,priceLevel:5,photoRef:'AZose0l753mRuFbB6R5v6EsN8-L464U42Wnu8_xwD2VWYzfYNDk8g_k494Mc09xhsgvMk4yp3bbN95fYR1GB7W-Oceb2GN3ujGcLkMQVa2RoecsRC7mAMVHUEsNXxva6jqswnqkOLstur9Ic9l4ADeXQq-4QVNNOgv7QjmxG-EwBUEiKKExC',placeId:'ChIJCbIiMY4a2jERCO2HiGa0ax8'},

    {name:'W39 Bistro & Bakery',address:'39 Jln Mas Puteh, Singapore 128637',rating:2,priceLevel:2,photoRef:'AZose0k3ynI3I32SN6ssu6bdBHLinsHEYWFqRb9qGNl9HYp4QB1v5nznLP-1yHH5px7C4DoICjZzRZJ7WT8vhwc19zgz40_yKAbaW68-3bRrI2Db_20QcsaDEVJgizBsUZGzXTn4R5-kgzVaX-YHznsdjGkRAhASi5eOjQUha5VQY458V0Vz',placeId:'ChIJ6ad6tpIa2jERYXVn6uL9OjM'},

    {name:'Benches Cafe',address:'93A Clementi Rd, Singapore 12978',rating:-1,priceLevel:-1,photoRef:'AZose0kzKaNZ0Hp8MfDkdEi9R4-jTWbs3Bz8KcWqyqcAXvt_875l43BOGbRrA_VejRALezuxW0gBRb4NDfnZVljXgNx7_5AoByDsv0nF-_yZWQyHBpse2HUBwunU6xKNMFHor0cZqNH1Wchys46zF5VgQ5fi3lrs5rcLxQFNLiNFyF7FEf8Y',placeId:'ChIJ_8M8XRob2jERNlp5OHUVWRQ'},

    {name:'Jovis Cafe - The Dining Place',address:'104 Faber Dr, Singapore 129412',rating:4.5,priceLevel:2,photoRef:'AZose0mcpUN868RrDW5IeUSoAeAA8swvE8H2S1err2YhFTEORDjRiuEGZ-B7oeLFr4IXD_P93TUZgGlgzzDxzL8xpEbGNtDYGmOaf-nYprnRx0dwZZtOwo7exM1dKeWpCd9EzCdHPUCoWq2GpDI-FvTSIAuuRlW66BOeGNZFcHtuNiWsCgLs',placeId:'ChIJz86GbZka2jERAFWm-I-74wU'},

    {name:'Kith Café West Coast',address:'123 West Coast Crescent Located within Seahill, #01-17 Oasia Residence, Singapore 126779',rating:4.1,priceLevel:-1,photoRef:'AZose0kx94J5OfneE4mlBdUvATTmC_ekNQnrr9EKRQtWv61RyOzconz1Jca8dh41k-BZLdrJVwAxi0UGdXRA352M9URVubzaXGLUwysSctkb5fo-ckZab4HKoDWG7MFR2rAwxfE6lmmC5rLYh9C2_TdMvHxjzlyISSdaKDA4wzR2VjToJiHM',placeId:'ChIJdz5RedEb2jERkoqLbZBzxyM'},
    
    {name:'Koi Café',address:'3155 Commonwealth Ave W, Singapore 129588',rating:4.2,priceLevel:2,photoRef:'AZose0nb2PrGDzyfIdfB1S1oRQljk4Lq1akKij-DllU2G-gxGMnPOkFLfoBGrwnF74CEDnx2lqh6ywO1AL7epzJeNwxa-dfu2U1zGQsRPnpNHDwhpfQDSieGLVrm9vmDF-xEWxXNAZnbWdr64PkeXC2ggVqQuJgBATEIMx0NItilbaad9ihv',placeId:'ChIJy0ddPY4a2jERHKGSJfENs0g'},
    
    {name:'Dawn\'s Gelateria and Cafe',address:'106 Clementi Street 12, #01-38, Singapore 120106',rating:4.5,priceLevel:-1,photoRef:'AZose0nRJF75S3Xl1pYapH6ANVCLDT5M_uvrnjqNbTJnJHQ_AQ3NLCe6txojhgB3K7Dz3UoezWNTAu0INDMhLy0JsyDlbPJde6uuU0Qw2vpOYKdCiZ0gNGo_Xu8_0TxDgE6thdwdCIexoRA-M6bSpjeRaSh8K8gC3mhjlVfZfpfA4en0schv',placeId:'ChIJaTxxRRQb2jEROz8Gf-c0kUE'},

    {name:'Polar Beurre Cafe',address:'721 Clementi West Street 2, #01-134, Singapore 120721',rating:4.7,priceLevel:-1,photoRef:'AZose0lWXS_-rdao-4YiisKY5Xc4PzgaHAAFlLimb-jq-nOTIfVPJsBSf8F8GHDDR2elbA6j9ETNo_AwbUUz59SAAiXK1QV1XXCrjFq3gqu7YXPHEHcTiNaivvn1Uc5s43kZxvyTQMY4mO5r_q9OE9iVADvfVyxbJw10GIWg5MwmeHkTPzX7',placeId:'ChIJaTxxRRQb2jEROz8Gf-c0kUE'},

    {name:'KopiWU @ 420A Clementi',address:'420A Clementi Ave 1, Singapore 121420',rating:3.6,priceLevel:-1,photoRef:'AZose0kLmpK3Y3EfAR1X6m-dZ4-ENTvrDOU8cjbyWFR-1Hw3OMIMAV-LkHPGVPMqEf-vspGmopt9zLimAOsiHL9oIj71Wd1PFClNr1UibrTcazMjSuSr6zHnA187fuqzwO-yt8o_XYdLhWncINR6EuJK-sOrgQGSfs1aPPU0g1EaKE4s8uz_',placeId:'ChIJgc_phYwa2jERkFscJXgrR0k'},

    {name:'Bistro8@Clementi',address:'442 Clementi Ave 3, Singapore 120442',rating:3.8,priceLevel:-1,photoRef:'AZose0mZf1Mpem5enWlncsp2HRhCAoi_fMruZ69tM3z4w-CMBz-PUUGkQBvzyh_Pj-1Iw56c0gfr--id3143oF2mx891bFIWtSAxpxJ17tDkIiNxrHxvPBQeOnz_HA3kajFBkeHgU9WiWrJcZrcAMOit9dDKfzR0pcXQwdEvGCvuPMJAO7o7',placeId:'ChIJBZNQ8I0a2jER0F97SNZ_DSo'},

    {name:'Biggby Coffee',address:'3155 Commonwealth Ave W, #04-23/24, Singapore 129588',rating:3.8,priceLevel:-1,photoRef:'AZose0mwKZ_nRy3urSvv10l_HZbXHxH2mCCRD8p-4QDQxRyEFzePzWMFbc6ekf6CqGk37UzijJOQMmnB11c3eNbzeE80mG3S8Z5uDLXNlE46rVEQuVb1XJQg8WSG2UJMLDR2I1LobBlxQrCuPk2X93NV9i7uxtyhmJVocIyjwoIRFAm9gmmi',placeId:'ChIJzcTFtDMb2jERVpWWznA2KOM'}

]

export const restaurantExample:Restaurant ={
  name:'Putien',address:'1 Jurong West Central 2, #02-34 Jurong Point, Singapore 648886',rating:4.8,priceLevel:2,photoRef:'',placeId:'ChIJy64vxOwP2jERIp3kxn84fJM'
}

export const BookmarkedRestaurants:Restaurant[] = [
    {name:'Time Table Cafe 研磨时光咖啡',address:'Jurong West Street 41, #01-726 Block 456, Singapore 640456',rating:4.1,priceLevel:2,photoRef:'AZose0nNPoE8N3bR2zycUl7WQxlNZnkePRSHkgL9NFNEc83wq0EU7-rJAcVHXbj8PL59ie_qVr4_hMTaGfltZKboMWRngJMNH_BGJqiyjbPKyYPwFD6vibsdr8jlNecd3b9fCsmB3wQDW77j6AbPRiTFuaWJGTH2d171F9cT8PGUpbAyKLvE',placeId:'ChIJ9ep2u6IP2jERs37XyaPiiI4'},

    {name:'851 Coffeeshop',address:'851 Jurong West Street 81, Block 852, Singapore 640851',rating:3.8,priceLevel:1,photoRef:'AZose0l1MbmLhOtXSotJ3v_88H7iF8SpB-iiaQuzeZArLjCobIkkb4OyQu8mv8ycevRmDpVQh6xTrYajrrsSDdpCLpLOH_IU_R8KGEhYFZnGD05j15P3rDmpq7nbF_70q4BaE6hregTRgkks1Hf9YvDxxMOrgW9xwWM0JZm4vmkyU6fOgyZ2',placeId:'ChIJ9ep2u6IP2jERs37XyaPiiI4'},

    {name:'Cafe 276',address:'276 Jurong West Street 25, Singapore 640276',rating:3.6,priceLevel:-1,photoRef:'AZose0m5knGE6h0nRSzviX60PsSyIgT1AZARl4_ObLnSli_KPYp_x9jL07ucJentr-uGpm1C6hYTXYLBO523mYztt_tSomcAC4mOyFQe84QkmAar7vAwfI9T4i7kFnIxsec3CJzb23X9mcPJSyNMjH9HhPOtK0uo7kzWs57Ud6n9UIwkPeN_',placeId:'ChIJNRihQYIP2jERfxYgBxm_Zq4'},

    {name:'Time Table Cafe 研磨时光咖啡',address:'8 Chin Bee Ave, Singapore 619932',rating:4.4,priceLevel:2,photoRef:'AZose0lykTt2i-kGZa0bxPzSYw8ucz7bIYW6CgrtpHqlCTlawpT3WOxjEpBstp_mnXdNBnrTxcAR42fcdJ29OZ39-eV1E9_oK20j2PP92PwT3ua5StRj3kDKgok0JJtrgHyz1TRyjuYHKt-pCdZCBthsB4fFhVVbyExZzbZWK-j9n4fBG3u_',placeId:'ChIJAQAAEPEP2jERrhB2fWx7S-8'},
]
  export const placeDetailsExample:PlaceDetails = {
      placeId: "ChIJy64vxOwP2jERIp3kxn84fJM",
      name: "PUTIEN Jurong Point",
      address: "1 Jurong West Central 2, #02-34 Jurong Point, Singapore 648886",
      openNow: false,delivery:true,dineIn:true,takeout:true,reservable:true,
      website: "https://www.putien.com/",phoneNo:'6795 2338',
      priceLevel: 2,
      numOfUserRating:100,rating:4.8,wheelChairAccessible:true,
      servesBreakfast:true,servesBrunch:true,servesLunch:true,servesDinner:true,servesBeer:true,servesWine:true,servesVegetarianFood:true,
      opening_hours: ["Monday: 11:30 AM – 10:00 PM",
      "Tuesday: 11:30 AM – 10:00 PM",
      "Wednesday: 11:30 AM – 10:00 PM",
      "Thursday: 11:30 AM – 10:00 PM",
      "Friday: 11:30 AM – 10:00 PM",
      "Saturday: 11:30 AM – 10:00 PM",
      "Sunday: 11:30 AM – 10:00 PM"],
      reviews:[
        {   author:"Tian Yuanyuan",
            rating:5,
            description:"Dishes: The ingredients of each dish are very fresh, the taste is also very good, it is relatively healthy, and new products are often launched. It is a very good Chinese restaurant!\n\nService: Every waiter is very warm, and the service is also very thoughtful and polite.\n\nEnvironment: The environment should be the best among the restaurants of Jurong Point. It is very clean and the light inside is very comfortable.",
            time:"a year ago",
            profileUrl:'https://lh3.googleusercontent.com/a/AAcHTtfNlJSIv5FBLuCf6hOdtjGinw1UXuB93gLRRwAA=s128-c0x00000000-cc-rp-mo'},
        {   author:"Cynthia G",
            rating:4,
            description:"The service was friendly and efficient. Food was good, and tasted healthy. Prices are a bit steeper than their competitors. Timing of the dishes can be better coordinated. We had waited a long time for all the dishes to arrive. The kitchen also missed out one dish and we had to cancel it because we waited too long. The staff were nice enough to offer a dessert but we declined.",
            time:"10 months ago",
            profileUrl:'https://lh3.googleusercontent.com/a-/AD_cMMShMd73wUR41wnaM4vrQfdesx6EcKPP3L7EseE_Ig=s128-c0x00000000-cc-rp-mo-ba5'},
        {   author:"RUNHUA ZHOU",
            rating:5,
            description:"This is a very nice restaurant with good service attitude, rich and varied dishes and very delicious taste. I think it is one of the best restaurants in Singapore. Hope you never miss this very good restaurant.",
            time:"a year ago",
            profileUrl:'https://lh3.googleusercontent.com/a/AAcHTtc0oyZIjqKm9WQSpOIlolK4F3H472VmvSKgNifW=s128-c0x00000000-cc-rp-mo'}
      ]
}

export const testCollections:Collection[] = [
  {colId:'932649ab',collectionName:'Favourite',restaurants:BookmarkedRestaurants},
  {colId:'3e3cf839',collectionName:'Cafe',restaurants:BookmarkedRestaurants},
  {colId:'1824e39b',collectionName:'Saved for Later',restaurants:BookmarkedRestaurants}
]
