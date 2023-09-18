import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLES[]) => SetMetadata(ROLES_KEY, roles);
