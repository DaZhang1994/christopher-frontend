import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../util/entities/token.entity';
import { TokenService } from '../util/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  token: Token;

  constructor(private readonly router: Router, private readonly tokenService: TokenService) {}

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
}
