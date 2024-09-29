/** User roles DTO. */
export const userRolesDto = ['admin', 'teacher', 'student'] as const;

/** User role DTO. */
export type UserRoleDto = typeof userRolesDto[number];
