module core {
	'use strict';

	export interface ICollectable {
		id: number;
		equals(otherObj: any): boolean;
		clone(): any;
	}
}