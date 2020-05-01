import { BaseEntity } from "./base.entity";

export class FormError extends BaseEntity{
  display: boolean = false;
  errors: string[] = [];
}
