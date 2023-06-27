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
    photos:string[]
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