/**
 * Module for generic collections
 * @module
 */
module core.generics.collections {
	'use strict';

	/**
	 * Describes a collection of elements
	 * @interface
	 */
	export interface ICollection<T extends ICollectable<string | number, any>> {
		count: number;
		readOnly: boolean;
		clear(): void;
		clone(): ICollection<T>;
		contains(element: T): boolean;
		isEmpty(): boolean;
		toArray(): T[];
	}
}