/**
 * Module for core features
 * @module
 */
module core {
	'use strict';

	/**
	 * Describes an element that can be cloned
	 * @interface
	 */
	export interface ICloneable {
		clone(): any;
	}
}