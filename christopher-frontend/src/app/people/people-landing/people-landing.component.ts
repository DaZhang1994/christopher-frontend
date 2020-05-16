import { Component, ElementRef, ViewChild } from '@angular/core';
import { CardRotatingComponent } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-people-landing',
  templateUrl: './people-landing.component.html',
  styleUrls: ['./people-landing.component.scss']
})
export class PeopleLandingComponent {

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
