import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { transformAndValidate } from 'class-transformer-validator';
import { Token } from '../entities/token.entity';

@Injectable()
export class TokenService {
  async checkLoggedIn(): Promise<boolean> {
    const localTokenStr = localStorage.getItem('token');
    let token;
    if (localTokenStr) {
      try {
        token = <Token>(
          await transformAndValidate(Token, new JwtHelperService().decodeToken(localTokenStr))
        );
        if (token) {
          return true;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
}
