module core.collections {
	'use strict';

	export interface IQueue<T extends IEquatable> extends ICollection<T> {
		dequeue(): T;
		enqueue(item: T): boolean;
		forEach(cb: (item: T) => boolean): void;
		indexOf(item: T): number;
		lastIndexOf(item: T): number;
		peek(): T;
	}

	export class Queue<T extends IEquatable> implements IQueue<T> {
		private _data: ILinkedList<T>;

		public constructor() {
			this._data = new LinkedList<T>();
		}

		public get count(): number { return this._data.count; }

		public get readOnly(): boolean { return this._data.readOnly; }

		public clear(): void {
			this._data.clear();
		}

		public contains(item: T): boolean {
			return this._data.contains(item);
		}

		public dequeue(): T {
			var item = this._data.first;
			if(item !== null)
				this._data.remove(item);

			return item;
		}

		public enqueue(item: T): boolean {
			return this._data.append(item);
		}

		public forEach(cb: (item: T) => boolean): void {
			// TODO
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

		public toArray(): T[] {
			return this._data.toArray();
		}
	}
}