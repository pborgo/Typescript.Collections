module core.collections {
	'use strict';

	import IEquatable = core.IEquatable;

	export interface ILinkedListNode<T extends IEquatable> {
		item: T;
		next: ILinkedListNode<T>;
		prev: ILinkedListNode<T>;
	}

	export class LinkedListNode<T extends IEquatable> implements ILinkedListNode<T> {
		public next: ILinkedListNode<T>;
		public prev: ILinkedListNode<T>;

		public constructor(public item: T) {}
	}

	export interface ILinkedList<T extends IEquatable> {
		count: number;
		first: T;
		last: T;
		addAfter(item: T, idx: number): boolean;
		addBefore(item: T, idx: number): boolean;
		append(item: T): boolean;
		clear(): void;
		contains(item: T): boolean;
		find(item: T): T;
		findLast(item: T): T;
		prepend(item: T): boolean;
		remove(item: T): boolean;
		removeLast(item: T): boolean;
	}

	export class LinkedList<T extends IEquatable> implements ILinkedList<T> {
		private _count: number;
		private _first: ILinkedListNode<T>;
		private _last: ILinkedListNode<T>;

		public constructor() {
			this._count = 0;
		}

		public get count(): number { return this._count; }

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

		public contains(item: T): boolean {
			return this.find(item) !== null;
		}

		public find(item: T): T {
			var node = this._findNode(item);
			return node === null ? null : node.item;
		}

		public findLast(item: T): T {
			var node = this._findLastNode(item);
			return node === null ? null : node.item;
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

		public removeLast(item: T): boolean {
			var currentNode = this._findLastNode(item);
			if(currentNode === null)
				return false;

			this._remove(currentNode);
			return true;
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