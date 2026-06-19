import { Request as ExpressRequest } from 'express';

export type WrapperType<T> = T;

export interface AuthRequest extends ExpressRequest {
  user: {
    id: number;
    username: string;
  };
}
