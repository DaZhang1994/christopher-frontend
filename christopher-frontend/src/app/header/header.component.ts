import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { transformAndValidate } from 'class-transformer-validator';
import { Token } from '../common/entities/token.entity';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  token: Token;

  constructor() { }

  async ngOnInit(): Promise<void> {
    console.log('Init called!');
    await this.getToken();
  }

  async getToken() {
    const localTokenStr = localStorage.getItem('token');
    if(localTokenStr) {
      try {
        this.token = <Token> await transformAndValidate(Token, new JwtHelperService().decodeToken(localTokenStr));
        if(this.token) {
          this.isLoggedIn = true;
        }
      }
      catch(e) {
        this.isLoggedIn = false;
      }
    }
  }

}
