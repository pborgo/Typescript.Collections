/**
 * Module for collections written in TypeScript
 * @module
 */
module core.collections {
	'use strict';

	/**
	 * Describes a collection of elements
	 * @interface
	 */
	export interface ICollection<T extends ICollectable> {
		count: number;
		readOnly: boolean;
		clear(): void;
		clone(): any;
		contains(item: T): boolean;
		isEmpty(): boolean;
		toArray(): T[];
	}
}