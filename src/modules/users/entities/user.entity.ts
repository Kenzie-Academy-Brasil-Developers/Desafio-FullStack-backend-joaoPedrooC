import { Exclude } from "class-transformer";

export class User {
  id: string;
  name: string;
  email: string;

  @Exclude()
  password: string;
  
  number: string;
  createdAt: Date;
}
