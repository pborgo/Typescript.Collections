/**
 * Module for collections
 * @module
 */
module core.collections {
	'use strict';

	/**
	 * Describes an element that can be collected
	 * @interface
	 */
	export interface ICollectable extends
		ICloneable,	IEquatable,	IHashable {}
}