import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Token } from '../util/entities/token.entity';
import { TokenService } from '../util/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  token: Token;

  scrollSub: any;

  constructor(private readonly router: Router,
              private readonly tokenService: TokenService,
              private readonly route: ActivatedRoute,
              private readonly el: ElementRef) {

  }

  async ngOnInit(): Promise<void> {
    this.isLoggedIn = await this.tokenService.checkLoggedIn();
  }

  async logout() {
    localStorage.removeItem('token');

    if (window.location.pathname == '/') {
      window.location.reload();
    } else {
      await this.router.navigate(['']);
    }
  }


  ngAfterViewInit(): void {

    this.route.fragment.subscribe((fragment) => {

      try {
        if(fragment) {
          this.el.nativeElement.querySelector(`#${fragment}`).scrollIntoView({ behavior: 'smooth' });
        }
        else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      catch(e) {

      }

      this.scrollSub = this.router.events.subscribe((event) => {
        if(event instanceof Scroll) {
          try {
            if(event.anchor) {
              this.el.nativeElement.querySelector(`#${event.anchor}`).scrollIntoView({ behavior: 'smooth' });
            }
            else {
              this.el.nativeElement.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
            }
          }
          catch(e) {

          }
        }
      })

    }).unsubscribe();
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
  }

}
