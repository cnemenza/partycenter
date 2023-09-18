import { ROLES } from 'src/constants';

export interface IPayloadToken {
  sub: string;
  role: ROLES;
  fullName: string;
  iat?: number;
  exo?: number;
}

export interface IAuthResponse {
  access_token: string;
}

export interface IAuthUserReponse {
  fullName: string;
  role: ROLES;
}
