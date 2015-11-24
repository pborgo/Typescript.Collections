module core.collections {
	'use strict';

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