/**
 * Module for core features
 * @module
 */
module core {
	export function isFunction(func: any): boolean {
        return (typeof func) === 'function';
    }

	export function isNull(obj: any): boolean {
        return (typeof obj) === null;
    }

	export function isNullOrUndefinedOrEmpty(str: string): boolean {
		return isNull(str) || isUndefined(str) || str === "";
	}

	export function isNullOrUndefined(obj: any): boolean {
        return isNull(obj) || isUndefined(obj);
    }

	export function isUndefined(obj: any): boolean {
        return (typeof obj) === 'undefined';
    }
}