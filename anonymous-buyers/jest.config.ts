/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest"


const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js'],
	moduleNameMapper: {
		'^models$': '<rootDir>/src/models',
		'^services$': '<rootDir>/src/services',
		'^helpers': '<rootDir>/src/helpers',
		'^jobs': '<rootDir>/src/jobs',
	},
	transform: {
		'^.+\\.ts$': ['ts-jest', {
			tsconfig: 'tsconfig.json',
			// other ts-jest options
		}],
	},
	collectCoverage: true,
	collectCoverageFrom: [
		'src/**/*.{js,ts}',
		'!src/**/*.d.ts',
	],
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
}

export default config
