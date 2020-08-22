import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ShareService } from 'src/app/providers/sharedService/share.service';

declare var $: any;

@Component({
  selector: 'app-public-destination-finder',
  templateUrl: './public-destination-finder.component.html',
  styleUrls: ['./public-destination-finder.component.css']
})
export class PublicDestinationFinderComponent implements OnInit {

  themePacakgeSlideOptions ={
    loop: true,
    margin: 20,
    dots:false,
    nav: true,
    autoplay: true,
    autoplaySpeed:3000,
    navText: ['&#8592;', '&#8594;'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
    }

  listTopPacakgeSlideOptions = {
    loop: true,
    margin: 20,
    dots:false,
    nav: true,
    autoplay: true,
    autoplaySpeed:3000,
    navText: ['&#8592;', '&#8594;'],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
    }

    listTopPackages = [
      {
        date: "October 31, 2021",
        place: "Vibra Mahou Fest",
        img: "../../../assets/PublicAssets/images/destination-1.jpg",
        location: "Green Park Chicago"
      },
      {
        date: "October 31, 2021",
        place: "Vibra Mahou Fest",
        img: "../../../assets/PublicAssets/images/destination-2.jpg",
        location: "Green Park Chicago"
      },
      {
        date: "October 31, 2021",
        place: "Vibra Mahou Fest",
        img: "../../../assets/PublicAssets/images/destination-3.jpg",
        location: "Green Park Chicago"
      },
      {
        date: "October 31, 2021",
        place: "Vibra Mahou Fest",
        img: "../../../assets/PublicAssets/images/destination-4.jpg",
        location: "Green Park Chicago"
      },
    ];

    themePackages = [
      {
        name: "Adventure",
        description: "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        img: "../../../assets/PublicAssets/images/theme-p-1.jpg"
      },
      {
        name: "Family",
        description: "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        img: "../../../assets/PublicAssets/images/theme-p-2.jpg"
      },
      {
        name: "Beach",
        description: "Lorem Ipsum is simply dummy text the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        img: "../../../assets/PublicAssets/images/theme-p-3.jpg"
      },
    ]
    constructor( private  shareService: ShareService, ) {
      this.shareService.hideHeaderFooterAction(false);
    this.shareService.hideSocialMediaBtnAction(true);

    }

  ngOnInit(): void {            
    //for theme Based Packages on destionation finder page START
// $('#theme-of-pacakge').owlCarousel({
//   loop: true,
//   margin: 20,
//   dots:false,
//   nav: true,
//   autoplay: true,
//   autoplaySpeed:3000,
//   navText: ['&#8592;', '&#8594;'],
//   responsive: {
//     0: {
//       items: 1
//     },
//     600: {
//       items: 2
//     },
//     1000: {
//       items: 4
//     }
//   }
//   });
  //for theme Based Packages on destionation finder page END

  
//for list of theme Based Packages on destionation finder page START
// $('#list-of-top-pacakge').owlCarousel({
//   loop: true,
//   margin: 20,
//   dots:false,
//   nav: true,
//   autoplay: true,
//   autoplaySpeed:3000,
//   navText: ['&#8592;', '&#8594;'],
//   responsive: {
//     0: {
//       items: 1
//     },
//     600: {
//       items: 2
//     },
//     1000: {
//       items: 4
//     }
//   }
//   });
  //for list of theme Based Packages on destionation finder page END
  }

}
