/**
 * Module for core features
 * @module
 */
module core {
	'use strict';

	/**
	 * Describes an element that can be compared
	 * @interface
	 */
	export interface IEquatable {
		equals(other: any) : boolean
	}
}