import {Pipe, PipeTransform} from '@angular/core'

@Pipe({
    name:'convert'
})
export class googleImgPipe implements PipeTransform{

    private googleImgApi= 'https://maps.googleapis.com/maps/api/place/photo'

    private key = '?key=AIzaSyAKs4xwjpdFmZUq1dc8wbUeEDrcH4a14lg';

    private param = '&maxwidth=300';

    transform(value: string):string{

        if(value==='none'){
            return '../../assets/imgnotfound.png'
        }
        else{
            const photoRef = '&photo_reference='+value
            const url = this.googleImgApi + this.key + this.param + photoRef
            return url
        }
    }
}