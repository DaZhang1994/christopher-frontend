import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import gql from 'graphql-tag';
import validator from 'validator';
import { Identifier } from './entities/identifier.entity';
import md5 from 'md5';

gql`
  input IdentifierInput {
    _id: String
    username: String
    email: String
    telephone: String
  }

  type Query {
    loginToken(identifier: IdentifierInput!): String!
    token(identifier: IdentifierInput!, password: String!): String!
    user: User!
  }
`;

const LoginToken = gql`
  query loginToken($identifier: IdentifierInput!) {
    loginToken(identifier: $identifier)
  }
`;

const Token = gql`
  query token($identifier: IdentifierInput!, $password: String!) {
    token(identifier: $identifier, password: $password)
  }
`;

const User = gql`
  query user {
    user {
      username
    }
  }
`;

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass'],
})
export class AuthComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  identifierValidator = (control: AbstractControl) => {
    if (control.value) {
      if (
        !/^[A-Za-z_]\w{5,15}$/.test(control.value) &&
        !/[0-9]{10}/.test(control.value) &&
        !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/.test(
          control.value
        )
      ) {
        return { invalidIdentifier: true };
      }
    }
    return null;
  };
  unauthorized: boolean;

  constructor(private formBuilder: FormBuilder, private apollo: Apollo, private router: Router) {
    this.loginForm = this.formBuilder.group({
      identifier: ['', [Validators.required, this.identifierValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{8,16}$/),
        ],
      ],
    });
  }

  get identifier() {
    return this.loginForm.get('identifier');
  }
  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      if (this.unauthorized) {
        this.unauthorized = false;
      }
    });
  }

  async onLogin(loginFormInput: any) {
    const identifier = new Identifier();

    if (validator.isEmail(loginFormInput.identifier)) {
      identifier.email = loginFormInput.identifier;
    } else if (validator.isMobilePhone(loginFormInput.identifier, 'en-US')) {
      identifier.telephone = loginFormInput.identifier;
    } else if (validator.matches(loginFormInput.identifier, /^[A-Za-z_]\w{5,15}$/)) {
      identifier.username = loginFormInput.identifier;
    } else {
      this.unauthorized = true;
      return;
    }

    try {
      const { data: loginTokenRes }: any = await this.apollo
        .query({
          query: LoginToken,
          variables: {
            identifier: identifier,
          },
        })
        .toPromise();

      const saltedPassword = Base64.stringify(
        HmacSHA256(md5(loginFormInput.password), loginTokenRes.loginToken)
      );

      const { data: tokenRes }: any = await this.apollo
        .query({
          query: Token,
          variables: {
            identifier: identifier,
            password: saltedPassword,
          },
        })
        .toPromise();

      localStorage.setItem('token', tokenRes.token);
      console.log('old token: ' + localStorage.getItem('token'));

      const { data: userRes }: any = await this.apollo
        .query({
          query: User,
        })
        .toPromise();

      console.log(userRes);
      console.log('new token: ' + localStorage.getItem('token'));
    } catch (e) {
      console.log(e);
      this.unauthorized = true;
    }
  }
}
