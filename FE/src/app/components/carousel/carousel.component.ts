import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplaySpeed: 800,
    margin: 30,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    // navText: ['', ''],
    responsive: {
      940: {
        items: 2,
      },
    },
    // nav: true,
  };

  slidesStore = [
    {
      id: 1,
      src: '../../../assets/carousels/carousel1.png',
      alt: 'Image_1',
      title: 'Image_1',
    },
    {
      id: 2,
      src: '../../../assets/carousels/carousel2.png',
      alt: 'Image_2',
      title: 'Image_3',
    },
    {
      id: 3,
      src: '../../../assets/carousels/carousel3.png',
      alt: 'Image_3',
      title: 'Image_3',
    },
    {
      id: 3,
      src: '../../../assets/carousels/carousel4.png',
      alt: 'Image_3',
      title: 'Image_3',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
