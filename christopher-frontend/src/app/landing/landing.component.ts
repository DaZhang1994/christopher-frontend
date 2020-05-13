import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardRotatingComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  postCards = [
    {
      title: 'Post 1',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post1.jpg'
    },
    {
      title: 'Post 2',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post2.jpg'
    },
    {
      title: 'Post 3',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post3.jpg'
    },
    {
      title: 'Post 4',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post4.jpg'
    },
    {
      title: 'Post 5',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post5.jpg'
    },
    {
      title: 'Post 6',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post6.jpg'
    },
    {
      title: 'Post 7',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post7.jpg'
    },
    {
      title: 'Post 8',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post8.jpg'
    },
    {
      title: 'Post 9',
      description: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action. This text is much longer so that you can see a significant difference between the text in  previous tabs.',
      buttonText: 'Button',
      img: 'assets/img/post9.jpg'
    }
  ];

  postSlides: any = [[]];

  chunk(arr: any, chunkSize:any) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  @ViewChild('follow')
  follow: ElementRef;

  @ViewChild('next')
  next: ElementRef;

  @ViewChild('peopleCard1')
  peopleCard1: CardRotatingComponent;

  @ViewChild('peopleCardWrapper1')
  peopleCardWrapper1: ElementRef;

  startedDrag: boolean = false;
  hoverOnFollow: boolean = false;
  hoverOnNext: boolean = false;

  ngOnInit(): void {
    this.postSlides = this.chunk(this.postCards, 3);
  }

  onRightClickCard() {
    this.peopleCard1.toggle();
    return false;
  }

  onDrag(_event: any) {
    this.startedDrag = true;
    this.hoverOnFollow = false;
    this.hoverOnNext = false;
  }

  onEndDrag(event: any) {
    this.startedDrag = false;
    this.hoverOnFollow = false;
    this.hoverOnNext = false;
    event.source._dragRef.reset()
  }

  onDragMove(_$event: any) {
    if(this.collide(this.peopleCardWrapper1, this.follow)) {
      this.hoverOnFollow = true;
      this.hoverOnNext = false;
    }
    else if(this.collide(this.peopleCardWrapper1, this.next)) {
      this.hoverOnNext = true;
      this.hoverOnFollow = false;
    }
    else {
      this.hoverOnFollow = false;
      this.hoverOnNext = false;
    }
  }

  collide(el1: ElementRef, el2: ElementRef) {
    const rect1 = el1.nativeElement.getBoundingClientRect();
    const rect2 = el2.nativeElement.getBoundingClientRect();

    return !(
      rect1.top > rect2.bottom ||
      rect1.right < rect2.left ||
      rect1.bottom < rect2.top ||
      rect1.left > rect2.right
    );
  }
}
