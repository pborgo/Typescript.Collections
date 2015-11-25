/**
 * Module for core features
 * @module
 */
module core {
	'use strict';

	/**
	 * Describes an element that has a unique hash
	 * @interface
	 */
	export interface IHashable {
		hash(): any;
	}
}