import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
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

  cardWrappers: any;
  cardImage: any;
  currHoveredElement: any;

  @ViewChildren(CardRotatingComponent)
  threadCards: QueryList<CardRotatingComponent>;

  constructor(private el: ElementRef) {

  }

  ngOnInit(): void {
    this.cardWrappers = this.el.nativeElement.querySelectorAll('.card-wrapper');
    this.cardImage = this.el.nativeElement.querySelector('.img-fluid');

    this.postSlides = this.chunk(this.postCards, 3);
  }

  toggleCards() {
    if(this.threadCards){
      this.threadCards.forEach((card: any) => {
        if(card.rotate && !card._cdRef._cdRefInjectingView[0].matches(':hover')) {
          card.toggle();
        }
        else if(!card.rotate && card._cdRef._cdRefInjectingView[0].matches(':hover')) {
          card.toggle();
        }
      });
    }
  }

  checkAndToggleCards(target: any) {
    if(this.currHoveredElement != target) {
      this.currHoveredElement = target;
      this.toggleCards();
    }
  }

}
