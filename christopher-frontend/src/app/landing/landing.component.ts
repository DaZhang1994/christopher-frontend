import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CardRotatingComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {

  cardWrappers: any;
  cardImage: any;
  currHoveredElement: any;

  @ViewChildren(CardRotatingComponent)
  cards: QueryList<CardRotatingComponent>;

  constructor(private el: ElementRef) {

  }

  ngOnInit(): void {
    this.cardWrappers = this.el.nativeElement.querySelectorAll('.card-wrapper');
    this.cardImage = this.el.nativeElement.querySelector('.img-fluid');
  }

  toggleCards() {
    if(this.cards){
      this.cards.forEach((card: any) => {
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
