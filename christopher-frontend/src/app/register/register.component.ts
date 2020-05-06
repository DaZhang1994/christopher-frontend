import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { transformAndValidate } from 'class-transformer-validator';
import gql from 'graphql-tag';
import md5 from 'md5';
import { TokenService } from '../util/services/token.service';
import { RegisterDto } from './dtos/register.dto';

gql`
  type Mutation {
    addUser(
      username: String!
      password: String!
      email: String!
      telephone: String
      firstName: String!
      lastName: String!
    ): Boolean!
  }

  type Query {
    userProfile(identifier: IdentifierInput!): User!
  }
`;

const UserProfile = gql`
  query userProfile($identifier: IdentifierInput!) {
    userProfile(identifier: $identifier) {
      username
      email
      telephone
    }
  }
`;

const Register = gql`
  mutation addUser(
    $username: String!
    $password: String!
    $email: String!
    $telephone: String
    $firstName: String!
    $lastName: String!
  ) {
    addUser(
      username: $username
      password: $password
      email: $email
      telephone: $telephone
      firstName: $firstName
      lastName: $lastName
    )
  }
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerFailed: boolean = false;

  rePasswordValidator = (control: AbstractControl) => {
    if (control.value) {
      if (this.password == null) {
        return null;
      }
      if (this.password.value != control.value) {
        return { invalid: true };
      }
      return null;
    }
    return null;
  };

  usernameValidator = async (control: AbstractControl) => {
    if (control.value) {
      if (this.username == null) {
        return null;
      }

      let res: any = null;
      try {
        res = await this.apollo
          .query({
            query: UserProfile,
            variables: {
              identifier: {
                username: control.value,
              },
            },
          })
          .toPromise();
      } catch (e) {
        return null;
      }

      if (
        res.data.userProfile.username == null ||
        this.username.value != res.data.userProfile.username
      ) {
        return null;
      }

      return { invalid: true };
    }
    return null;
  };

  emailValidator = async (control: AbstractControl) => {
    if (control.value) {
      if (this.email == null) {
        return null;
      }

      let res: any = null;
      try {
        res = await this.apollo
          .query({
            query: UserProfile,
            variables: {
              identifier: {
                email: control.value,
              },
            },
          })
          .toPromise();
      } catch (e) {
        return null;
      }

      if (res.data.userProfile.email == null || this.email.value != res.data.userProfile.email) {
        return null;
      }

      return { invalid: true };
    }
    return null;
  };

  telephoneValidator = async (control: AbstractControl) => {
    if (control.value) {
      if (this.telephone == null) {
        return null;
      }

      let res: any = null;
      try {
        res = await this.apollo
          .query({
            query: UserProfile,
            variables: {
              identifier: {
                telephone: control.value,
              },
            },
          })
          .toPromise();
      } catch (e) {
        return null;
      }

      if (
        res.data.userProfile.telephone == null ||
        this.telephone.value != res.data.userProfile.telephone
      ) {
        return null;
      }

      return { invalid: true };
    }
    return null;
  };

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router,
    private readonly tokenService: TokenService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [
        null,
        [Validators.required, Validators.pattern(/^[A-Za-z_]\w{5,15}$/)],
        [this.usernameValidator],
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)[a-zA-Z0-9\S]{8,16}$/),
        ],
      ],
      rePassword: [null, [Validators.required, this.rePasswordValidator]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)])/
          ),
        ],
        [this.emailValidator],
      ],
      telephone: [null, [Validators.pattern(/[0-9]{10}/)], [this.telephoneValidator]],
    });
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }
  get lastName() {
    return this.registerForm.get('lastName');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get rePassword() {
    return this.registerForm.get('rePassword');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get telephone() {
    return this.registerForm.get('telephone');
  }

  async ngOnInit(): Promise<void> {
    if (await this.tokenService.checkLoggedIn()) {
      await this.router.navigate(['']);
      return;
    }

    this.registerForm.valueChanges.subscribe(() => {
      if (this.registerFailed) {
        this.registerFailed = false;
      }
    });
  }

  async onRegister(registerFormInput: any) {
    try {
      registerFormInput.password = md5(registerFormInput.password);
      const registerDto: RegisterDto = <RegisterDto>(
        await transformAndValidate(RegisterDto, registerFormInput, {
          validator: { whitelist: true },
        })
      );
      await this.apollo
        .mutate({
          mutation: Register,
          variables: registerDto,
        })
        .toPromise();
    } catch (e) {
      this.registerFailed = true;
    }
  }
}
