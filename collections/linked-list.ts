module core.collections {
	'use strict';

	export interface ILinkedListNode<T extends ICollectable> {
		item: T;
		next: ILinkedListNode<T>;
		prev: ILinkedListNode<T>;
	}

	export class LinkedListNode<T extends ICollectable> implements ILinkedListNode<T> {
		public next: ILinkedListNode<T>;
		public prev: ILinkedListNode<T>;

		public constructor(public item: T) {}
	}

	export interface ILinkedList<T extends ICollectable> extends ICollection<T> {
		first: T;
		last: T;
		addAfter(item: T, idx: number): boolean;
		addBefore(item: T, idx: number): boolean;
		append(item: T): boolean;
		forEach(cb: (item: T) => void): void;
		indexOf(item: T): number;
		lastIndexOf(item: T): number;
		prepend(item: T): boolean;
		remove(item: T): boolean;
		removeAt(idx: number): boolean;
		removeLast(item: T): boolean;
		reverse(): void;
	}

	export class LinkedList<T extends ICollectable> implements ILinkedList<T> {
		private _count: number;
		private _readOnly: boolean;
		private _first: ILinkedListNode<T>;
		private _last: ILinkedListNode<T>;

		public constructor() {
			this._count = 0;
		}

		public get count(): number { return this._count; }

		public get readOnly(): boolean { return this._readOnly; }

		public addAfter(item: T, idx: number): boolean {
			if(!this._isValid(item, idx))
				return false;

			var newNode = new LinkedListNode<T>(item);
			var currentNode = this._getNodeAt(idx);

			newNode.prev = currentNode;
			newNode.next = currentNode.next;
			currentNode.next = newNode;

			if(currentNode.next === null)
				this._last = newNode;

			this._count++;
			return true;
		}

		public addBefore(item: T, idx: number): boolean {
			if(!this._isValid(item, idx))
				return false;

			var newNode = new LinkedListNode<T>(item);
			var currentNode = this._getNodeAt(idx);

			newNode.next = currentNode;
			newNode.prev = currentNode.prev;
			currentNode.prev = newNode;

			if(currentNode.prev === null)
				this._first = newNode;

			this._count++;
			return true;
		}

		public append(item: T): boolean {
			if(item === null)
				return false;

			var newNode = new LinkedListNode<T>(item);

			if(this._count === 0) {
				this._first = newNode;
			} else {
				newNode.prev = this._last;
			}

			this._last = newNode;
			this._count++;

			return true;
		}

		public clear(): void {
			this._first = null;
			this._last = null;
			this._count = 0;
		}

		public clone(): any {
			var clonedList = new LinkedList<T>();
			this.forEach((item: T) => {
				var clonedItem: T = item.clone();
				clonedList.append(clonedItem);
			});

			return clonedList;
		}

		public contains(item: T): boolean {
			return this._findNode(item) !== null;
		}

		public get first(): T {
			return this._first === null ? null : this._first.item;
		}

		public set first(item: T) {
			if(this._count === 0) {
				if(item === null)
					return;

				var newNode = new LinkedListNode<T>(item);

				this._first = newNode;
				this._last = newNode;

				this._count++;
				return;
			}

			if(this._count === 1) {
				this._first.item = item;
				this._last.item = item;

				if(item === null)
					this._count--;

				return;
			}

			if(item === null) {
				this._first.next.prev = null;
				this._first = this._first.next;

				this._count--;
				return;
			}

			this._first.item = item;
		}

		public forEach(cb: (item: T) => void): void {
			var currentNode = this._first;

            while (currentNode !== null) {
                cb(currentNode.item);
                currentNode = currentNode.next;
            }
		}

		public indexOf(item: T): number {
			if(item === null)
				return -1;

			var currentIdx = 0;
			var currentNode = this._first;

			while(currentNode !== null){
				if(currentNode.item.equals(item))
					return currentIdx;

				currentIdx++;
				currentNode = currentNode.next;
			}

			return -1;
		}

		public isEmpty(): boolean {
			return this._count === 0;
		}

		public get last(): T {
			return this._last === null ? null : this._last.item;
		}

		public set last(item: T) {
			if(this._count === 0) {
				if(item === null)
					return;

				var newNode = new LinkedListNode<T>(item);
				this._first = newNode;
				this._last = newNode;

				this._count++;
				return;
			}

			if(this._count === 1) {
				this._first.item = item;
				this._last.item = item;

				if(item === null)
					this._count--;

				return;
			}

			if(item === null) {
				this._last.prev.next = null;
				this._last = this._last.prev;

				this._count--;
				return;
			}

			this._last.item = item;
		}

		public lastIndexOf(item: T): number {
			if(item === null)
				return -1;

			var currentIdx = this._count - 1;
			var currentNode = this._last;

			while(currentNode !== null){
				if(currentNode.item.equals(item))
					return currentIdx;

				currentIdx--;
				currentNode = currentNode.prev;
			}

			return -1;
		}

		public prepend(item: T): boolean {
			if(item === null)
				return false;

			var newNode = new LinkedListNode<T>(item);

			if(this._count === 0) {
				this._last = newNode;
			} else {
				newNode.next = this._first;
			}

			this._first = newNode;
			this._count++;

			return true;
		}

		public remove(item: T): boolean {
			var currentNode = this._findNode(item);
			if(currentNode === null)
				return false;

			this._remove(currentNode);
			return true;
		}

		public removeAt(idx: number): boolean {
			var currentNode = this._getNodeAt(idx);
			if(currentNode === null)
				return false;

			this._remove(currentNode);
			return true;
		}

		public removeLast(item: T): boolean {
			var currentNode = this._findLastNode(item);
			if(currentNode === null)
				return false;

			this._remove(currentNode);
			return true;
		}

		public reverse(): void {
			var firstNode = this._first;
			var lastNode = this._last;
			var currentNode: ILinkedListNode<T> = this._first;

            while (currentNode !== null) {
				var prevNode = currentNode.prev;
				var nextNode = currentNode.next;

				currentNode.next = prevNode;
				currentNode.prev = nextNode;

				currentNode = nextNode;
            }

			this._last = firstNode;
			this._first = lastNode;
		}

		public toArray(): T[] {
			var output: T[] = [];
			var currentNode = this._first;

			while(currentNode !== null) {
				output.push(currentNode.item);
				currentNode = currentNode.next;
			}

			return output;
		}

		private _findNode(item: T): ILinkedListNode<T> {
			if(item === null)
				return null;

			var currentNode = this._first;
			while(currentNode !== null){
				if(currentNode.item.equals(item))
					return currentNode;

				currentNode = currentNode.next;
			}

			return null;
		}

		private _findLastNode(item: T): ILinkedListNode<T> {
			if(item === null)
				return null;

			var currentNode = this._last;
			while(currentNode !== null){
				if(currentNode.item.equals(item))
					return currentNode;

				currentNode = currentNode.prev;
			}

			return null;
		}

		private _getNodeAt(idx: number): ILinkedListNode<T> {
			if(!this._isValidIdx)
				return null;

			var currentNode = this._first;
			for(var currentIdx = 0; currentIdx < idx; idx++)
				currentNode = currentNode.next;

			return currentNode;
		}

		private _remove(node: ILinkedListNode<T>): void {
			if(node === null)
				return;

			if(node.prev !== null) {
				if(node.next !== null) {
					node.prev.next = node.next;
					node.next.prev = node.prev;
				} else {
					this._last = node.prev;
				}
			} else {
				if(node.next !== null) {
					this._first = node.next;
				} else {
					this._first = null;
					this._last = null;
				}
			}

			this._count--;
		}

		private _isValid(item: T, idx: number): boolean {
			return item !== null && this._isValidIdx(idx);
		}

		private _isValidIdx(idx: number): boolean {
			return idx >= 0 && idx < this._count;
		}
	}
}