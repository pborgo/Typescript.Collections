/**
 * Module for generic collections
 * @module
 */
module core.generics.collections {
	'use strict';

	/**
	 * Describes an element that can be collected
	 * @interface
	 */
	export interface ICollectable<TKey extends string | number, TValue>
		extends ICloneable<TValue>,	IEquatable<TValue>, IHashable<TKey> {}
}