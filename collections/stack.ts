module core.collections {
	'use strict';

	export interface IStack<T extends IEquatable> {
		count: number;
		clear(): void;
		contains(item: T): boolean;
		indexOf(item: T): number;
		isEmpty(): boolean;
		lastIndexOf(item: T): number;
		peek(): T;
		pop(): T;
		push(item: T): boolean;
		toArray(): T[];
	}

	export class Stack<T extends IEquatable> implements IStack<T> {
		private _data: ILinkedList<T>;

		public constructor() {
			this._data = new LinkedList<T>();
		}

		public get count(): number { return this._data.count; }

		public clear(): void {
			this._data.clear();
		}

		public contains(item: T): boolean {
			return this._data.contains(item);
		}

		public indexOf(item: T): number {
			return this._data.indexOf(item);
		}

		public isEmpty(): boolean {
			return this._data.isEmpty();;
		}

		public lastIndexOf(item: T): number {
			return this._data.lastIndexOf(item);
		}

		public peek(): T {
			return this._data.first;
		}

		public pop(): T {
			var item = this._data.last;
			if(item !== null && this._data.remove(item))
				return item;

			return null;
		}

		public push(item: T): boolean {
			return this._data.prepend(item);
		}

		public toArray(): T[] {
			return this._data.toArray();
		}
	}
}