module core.collections {
	'use strict';

	export interface IStack<T extends IEquatable> {
		count: number;
		clear(): void;
		contains(item: T): boolean;
		copyTo(output: T[], startIdx: number): T[];
		equals(otherStack: IStack<T>): boolean;
		finalize(): boolean;
		peek(): T;
		pop(): T;
		push(item: T): boolean;
		toArray(): T[];
		toString(): string;
		trimExcess(): boolean;
	}

	export class Stack<T extends IEquatable> implements IStack<T> {
		private _data: ILinkedList<T>;
		private _count: number;

		public constructor() {
			this._data = new LinkedList<T>();
			this._count = 0;
		}

		public get count(): number { return this._count; }

		public clear(): void {
			this._data.clear();
		}

		public contains(item: T): boolean {
			return this._data.contains(item);
		}

		public copyTo(output: T[], startIdx: number): T[] {
			return [];
		}

		public equals(otherStack: IStack<T>): boolean {
			return true;
		}

		public finalize(): boolean {
			return true;
		}

		public peek(): T {
			return this._data.last;
		}

		public pop(): T {
			var item = this._data.last;
			if(item !== null && this._data.removeLast(item))
				this._count--;

			return item;
		}

		public push(item: T): boolean {
			return this._data.append(item);
		}

		public toArray(): T[] {
			return [];
		}

		public toString(): string {
			return "";
		}

		public trimExcess(): boolean {
			return true;
		}
	}
}