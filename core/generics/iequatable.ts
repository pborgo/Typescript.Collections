/**
 * Module for generic
 * @module
 */
module core.generics {
	'use strict';

	/**
	 * Describes an element that can be compared
	 * @interface
	 */
	export interface IEquatable<T> {
		equals(other: T) : boolean
	}
}