import { Request as ExpressRequest } from 'express';
import { Role } from './enums/role.enum';

export interface AuthRequest extends ExpressRequest {
  user: {
    id: number;
    username: string;
    role: Role;
  };
}
