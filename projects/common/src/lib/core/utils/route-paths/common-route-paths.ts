import { buildRoutePaths } from './build-route-paths';

const baseRoutePaths = buildRoutePaths({
	home: { path: '' },
} as const);

/** Common route paths can be used throughout the project. */
export const commonRoutePaths = {
	...baseRoutePaths,
};
