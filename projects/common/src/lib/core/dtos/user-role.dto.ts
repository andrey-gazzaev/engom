/** User roles DTO. */
export const userRolesDto = ['ADMIN', 'TEACHER', 'STUDENT'] as const;

/** User role DTO. */
export type UserRoleDto = typeof userRolesDto[number];
