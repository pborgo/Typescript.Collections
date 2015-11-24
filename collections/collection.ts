module core.collections {
	'use strict';

	export interface ICollection<T extends IEquatable> {
		count: number;
		readOnly: boolean;
		clear(): void;
		contains(item: T): boolean;
		isEmpty(): boolean;
		toArray(): T[];
	}
}