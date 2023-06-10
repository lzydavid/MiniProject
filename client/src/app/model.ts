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

