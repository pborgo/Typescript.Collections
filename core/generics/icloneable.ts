/**
 * Module for generic
 * @module
 */
module core.generics {
	'use strict';

	/**
	 * Describes an element that can be cloned
	 * @interface
	 */
	export interface ICloneable<T> {
		clone(): T;
	}
}