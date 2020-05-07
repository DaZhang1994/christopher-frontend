import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { CardRotatingComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit, AfterViewChecked {

  cardWrappers: any;
  cardImage: any;

  @ViewChildren(CardRotatingComponent)
  cards: QueryList<CardRotatingComponent>;

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit(): void {
    this.cardWrappers = this.el.nativeElement.querySelectorAll('.card-wrapper');
    this.cardImage = this.el.nativeElement.querySelector('.img-fluid');
  }

  ngAfterViewChecked(): void {
    this.updateCardsHeight();
    this.resetCards();
  }

  updateCardsHeight() {
    this.cardWrappers.forEach((cardWrapper: any) => {
      this.renderer.setStyle(cardWrapper, 'height', this.cardImage.clientHeight + 'px')
    });
  }

  resetCards() {
    if(this.cards){
      this.cards.forEach((card: any) => {
        if(card.rotate && !card._cdRef._cdRefInjectingView[0].matches(':hover')) {
          card.toggle();
        }
        if(!card.rotate && card._cdRef._cdRefInjectingView[0].matches(':hover')) {
          card.toggle();
        }
      });
    }
  }

  @HostListener('window:mousemove')
  onMouseMove() {
    this.resetCards();
  }

}
