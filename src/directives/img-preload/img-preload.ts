import {Directive, Input, OnInit} from '@angular/core';
import {UserProvider} from "../../providers/user/user";

@Directive({
  selector: '[img-preloader]', //E.g <img mg-img-preloader="http://some_remote_image_url"
  host: {
    '[attr.src]': 'finalImage'    //the attribute of the host element we want to update. in this case, <img 'src' />
  },
})

//Class must implement OnInit for @Input()
export class ImagePreloader implements OnInit {
  constructor(private userPro: UserProvider){}
  @Input('img-preloader') targetSource: string;
  //<img img-preloader="{{item.url}}" alt="">
  downloadingImage : any; // In class holder of remote image
  finalImage: any; //property bound to our host attribute.

  @Input() defaultImage : string = 'assets/imgs/item.png';

  ngOnInit() {
    //First set the final image to some default image while we prepare our preloader:

    this.downloadingImage = new Image();  // create image object
    // console.log(this.targetSource);
    if(!this.targetSource){
      this.finalImage = this.defaultImage
    } else{
      this.userPro.getImage(this.targetSource).subscribe(res => {
        if(res != null){
          // console.log("image exist");
          this.createImageFromBlob(res);
        }
      },err => {this.finalImage = this.defaultImage});
    }

  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.finalImage = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
