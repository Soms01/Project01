import { Role } from '../orm/entities/users/types';

export type JwtPayload = {
  id: number;
  name: string;
  username: string;
  password: string;
  email: string;
  role: Role;
  created_at: Date;
};
