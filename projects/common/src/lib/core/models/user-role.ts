/** User roles. */
export const userRoles = ['admin', 'teacher', 'student'] as const;

/** User role. */
export type UserRole = typeof userRoles[number];
