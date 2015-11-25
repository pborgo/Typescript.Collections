/**
 * Module for generic
 * @module
 */
module core.generics {
	'use strict';

	/**
	 * Describes an element that has a unique hash
	 * @interface
	 */
	export interface IHashable<T extends string | number>{
		hash(): T;
	}
}