/**
 * Module for collections written in TypeScript
 * @module
 */
module core.collections {
	'use strict';

	/**
	 * Describes a doubly linked node containing an element
	 * @interface
	 */
	export interface ILinkedListNode<T extends ICollectable> {
		next: ILinkedListNode<T>;
		prev: ILinkedListNode<T>;
		value: T;
	}

	/**
	 * Represents a doubly linked node containing an element
	 * @class
	 * @implements ILinkedListNode<T>
	 */
	export class LinkedListNode<T extends ICollectable> implements ILinkedListNode<T> {

		/**
		 * Gets the next node in the current LinkedList<T>
		 * @type {ILinkedListNode<T>}
		 */
		public next: ILinkedListNode<T>;

		/**
		 * Gets the previous node in the current LinkedList<T>
		 * @type {ILinkedListNode<T>}
		 */
		public prev: ILinkedListNode<T>;

		/**
		 * Gets the previous node in the current LinkedList<T>
		 * @type {ILinkedListNode<T>}
		 */
		public value: T;

		/**
		 * Initializes a new instance of the LinkedListNode<T>
		 * @constructor
		 * @param {T} the element to contain
		 */
		public constructor(private element: T) {
			this.value = element;
		}
	}

	/**
	 * Describes a doubly linked list of elements
	 * @interface
	 */
	export interface ILinkedList<T extends ICollectable> extends ICollection<T> {
		first: T;
		last: T;
		addAfter(element: T, idx: number): boolean;
		addBefore(element: T, idx: number): boolean;
		append(element: T): void;
		forEach(cb: (element: T) => void): void;
		indexOf(element: T): number;
		lastIndexOf(element: T): number;
		prepend(element: T): void;
		remove(element: T): boolean;
		removeAt(idx: number): boolean;
		removeLast(element: T): boolean;
		reverse(): void;
	}

	/**
	 * Represents a doubly linked list of elements.
	 * @class
	 * @implements ILinkedList<T>
	 */
	export class LinkedList<T extends ICollectable> implements ILinkedList<T> {

		/**
		 * Holds the number of elements that are containing in the current LinkedList<T>
		 * @type {number}
		 * @private
		 */
		private _count: number;

		/**
		 * Holds the value indicating whether the current LinkedList<T> is read-only
		 * @type {boolean}
		 * @private
		 */
		private _readOnly: boolean;

		/**
		 * The first node of the current LinkedList<T>
		 * @type {ILinkedListNode<T>}
		 * @private
		 */
		private _first: ILinkedListNode<T>;

		/**
		 * The last node of the current LinkedList<T>
		 * @type {ILinkedListNode<T>}
		 * @private
		 */
		private _last: ILinkedListNode<T>;

		/**
		 * Initializes a new instance of the LinkeList<T>
		 * @constructor
		 */
		public constructor() {
			this._count = 0;
		}

		/**
		 * Gets the number of elements that are containing in the current LinkedList<T>
		 * @type {number}
		 */
		public get count(): number { return this._count; }

		/**
		 * Gets the value indicating whether the current LinkedList<T> is read-only
		 * @type {boolean}
		 */
		public get readOnly(): boolean { return this._readOnly; }

		/**
		 * Adds a new node containing the specified element after the existing node at the specified index in the current LinkedList<T>
		 * @param {T} the specified element to add to the current LinkedList<T>
		 * @param {number} the index of the existing node after which to insert a specified element
		 * @returns {boolean} true if the existing node was found and the specified element was added; otherwise false
		 */
		public addAfter(element: T, idx: number): boolean {
			if(!this._isValid(element, idx))
				return false;

			var newNode = new LinkedListNode<T>(element);
			var currentNode = this._getNodeAt(idx);

			newNode.prev = currentNode;
			newNode.next = currentNode.next;
			currentNode.next = newNode;

			if(currentNode.next === null)
				this._last = newNode;

			this._count++;
			return true;
		}

		/**
		 * Adds a new node containing the specified element before the existing node at the specified index in the current LinkedList<T>
		 * @param {T} the specified element to add to the current LinkedList<T>
		 * @param {number} the index of the existing node before which to insert a specified element
		 * @returns {boolean} true if the existing node was found and the specified element was added; otherwise false
		 */
		public addBefore(element: T, idx: number): boolean {
			if(!this._isValid(element, idx))
				return false;

			var newNode = new LinkedListNode<T>(element);
			var currentNode = this._getNodeAt(idx);

			newNode.next = currentNode;
			newNode.prev = currentNode.prev;
			currentNode.prev = newNode;

			if(currentNode.prev === null)
				this._first = newNode;

			this._count++;
			return true;
		}

		/**
		 * Adds a new node containing the specified element at the start of the current LinkedList<T>
		 * @param {T} the specified element to add at the start of the current LinkedList<T>
		 */
		public append(element: T): void {
			if(element === null)
				return;

			var newNode = new LinkedListNode<T>(element);

			if(this._count === 0) {
				this._first = newNode;
			} else {
				newNode.prev = this._last;
			}

			this._last = newNode;
			this._count++;
		}


		/**
		 * Removes all elements from the current LinkedList<T>
		 */
		public clear(): void {
			this._first = null;
			this._last = null;
			this._count = 0;
		}

		/**
		 * Clones the current LinkedList<T> and all its elements
		 * @returns {Object} a clone of the current LinkedList<T> with all its elements
		 */
		public clone(): any {
			var clonedList = new LinkedList<T>();
			this.forEach((element: T) => {
				var clonedElement: T = element.clone();
				clonedList.append(clonedElement);
			});

			return clonedList;
		}

		/**
         * Determines whether the current LinkedList<T> contains the specified element
         * @param {T} the specified element to locate in the current LinkedList<T>
         * @returns {boolean} true if the current LinkedList<T> contains the specified element;
		 * otherwise, false
         */
		public contains(element: T): boolean {
			return this._findNode(element) !== null;
		}

		/**
		 * Gets the first element of the current LinkedList<T>
		 * @type {T}
		 */
		public get first(): T {
			return this._first === null ? null : this._first.value;
		}

		/**
		 * Sets the first element of the current LinkedList<T>
		 * @param {T} the specified element to set to the first node of the current LinkedList<T>
		 */
		public set first(element: T) {
			if(this._count === 0) {
				if(element === null)
					return;

				var newNode = new LinkedListNode<T>(element);

				this._first = newNode;
				this._last = newNode;

				this._count++;
				return;
			}

			if(this._count === 1) {
				this._first.value = element;
				this._last.value = element;

				if(element === null)
					this._count--;

				return;
			}

			if(element === null) {
				this._first.next.prev = null;
				this._first = this._first.next;

				this._count--;
				return;
			}

			this._first.value = element;
		}

		/**
         * Executes the specified function for each element of the current LinkedList<T>
         * @param {function(element: T)}: the function to execute
         */
		public forEach(cb: (element: T) => void): void {
			var currentNode = this._first;

            while (currentNode !== null) {
                cb(currentNode.value);
                currentNode = currentNode.next;
            }
		}

		/**
		 * Searches for the specified element and returns the index of its first occurrence in the current LinkedList<T>
		 * @param {T} the element to locate in the current LinkedList<T>
		 * @returns {number} the index of the first occurrence of the element in the current LinkedList<T>; otherwise, -1
		 */
		public indexOf(element: T): number {
			if(element === null)
				return -1;

			var currentIdx = 0;
			var currentNode = this._first;

			while(currentNode !== null){
				if(currentNode.value.equals(element))
					return currentIdx;

				currentIdx++;
				currentNode = currentNode.next;
			}

			return -1;
		}

		/**
		 * Determines whether the current LinkedList<T> is empty
		 * @returns {boolean} true if the current LinkedList<T> is empty; otherwise, false
		 */
		public isEmpty(): boolean {
			return this._count === 0;
		}

		/**
		 * Gets the last element of the current LinkedList<T>
		 * @type {T}
		 */
		public get last(): T {
			return this._last === null ? null : this._last.value;
		}

		/**
		 * Sets the last element of the current LinkedList<T>
		 * @param {T} the specified element to set to the last node of the current LinkedList<T>
		 */
		public set last(element: T) {
			if(this._count === 0) {
				if(element === null)
					return;

				var newNode = new LinkedListNode<T>(element);
				this._first = newNode;
				this._last = newNode;

				this._count++;
				return;
			}

			if(this._count === 1) {
				this._first.value = element;
				this._last.value = element;

				if(element === null)
					this._count--;

				return;
			}

			if(element === null) {
				this._last.prev.next = null;
				this._last = this._last.prev;

				this._count--;
				return;
			}

			this._last.value = element;
		}

		/**
		 * Searches for the specified element and returns the index of its last occurrence in the current LinkedList<T>
		 * @param {T} the element to locate in the current LinkedList<T>
		 * @returns {number} the index of the last occurrence of the element in the current LinkedList<T>; otherwise, -1
		 */
		public lastIndexOf(element: T): number {
			if(element === null)
				return -1;

			var currentIdx = this._count - 1;
			var currentNode = this._last;

			while(currentNode !== null){
				if(currentNode.value.equals(element))
					return currentIdx;

				currentIdx--;
				currentNode = currentNode.prev;
			}

			return -1;
		}

		/**
		 * Adds a new node containing the specified element at the end of the current LinkedList<T>
		 * @param {T} the specified element to add at the end of the current LinkedList<T>
		 */
		public prepend(element: T): void {
			if(element === null)
				return;

			var newNode = new LinkedListNode<T>(element);

			if(this._count === 0) {
				this._last = newNode;
			} else {
				newNode.next = this._first;
			}

			this._first = newNode;
			this._count++;
		}

		/**
		 * Removes the first occurrence of the specified element from the current LinkedList<T>
		 * @param {T} the specified element to remove from the current LinkedList<T>
		 * @returns {boolean} true if the specified element was found and successfully removed; otherwise, false
		 */
		public remove(element: T): boolean {
			var currentNode = this._findNode(element);
			if(currentNode === null)
				return false;

			this._remove(currentNode);
			return true;
		}

		/**
		 * Removes the element at the specified position from the current LinkedList<T>
		 * @param {number} the specified index of the element to remove from the current LinkedList<T>
		 * @returns {boolean} true if the node at the specified index was found and successfully removed; otherwise, false
		 */
		public removeAt(idx: number): boolean {
			var currentNode = this._getNodeAt(idx);
			if(currentNode === null)
				return false;

			this._remove(currentNode);
			return true;
		}

		/**
		 * Removes the last occurrence of the specified element from the current LinkedList<T>
		 * @param {T} the specified element to remove from the current LinkedList<T>
		 * @returns {boolean} true if the specified element was found and successfully removed; otherwise, false
		 */
		public removeLast(element: T): boolean {
			var currentNode = this._findLastNode(element);
			if(currentNode === null)
				return false;

			this._remove(currentNode);
			return true;
		}

		/**
		 * Reverses the sequence of the elements in the current LinkedList<T>
		 */
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

		/**
		 * Copies all the elements of the current LinkedList<T> to an array
		 * @returns {T[]} a new array containing copies of all the elements of the current LinkedList<T>
		 */
		public toArray(): T[] {
			var output: T[] = [];
			var currentNode = this._first;

			while(currentNode !== null) {
				output.push(currentNode.value);
				currentNode = currentNode.next;
			}

			return output;
		}

		/**
		 * Finds the first occurrence of the specified element from the current LinkedList<T>
		 * @param {T} the specified element to find inside the current LinkedList<T>
		 * @returns {ILinkedListNode<T>} the node containing the specified element; otherwise null
		 * @private
		 */
		private _findNode(element: T): ILinkedListNode<T> {
			if(element === null)
				return null;

			var currentNode = this._first;
			while(currentNode !== null){
				if(currentNode.value.equals(element))
					return currentNode;

				currentNode = currentNode.next;
			}

			return null;
		}

		/**
		 * Finds the last occurrence of the specified element from the current LinkedList<T>
		 * @param {T} the specified element to find inside the current LinkedList<T>
		 * @returns {ILinkedListNode<T>} the node containing the specified element; otherwise null
		 * @private
		 */
		private _findLastNode(element: T): ILinkedListNode<T> {
			if(element === null)
				return null;

			var currentNode = this._last;
			while(currentNode !== null){
				if(currentNode.value.equals(element))
					return currentNode;

				currentNode = currentNode.prev;
			}

			return null;
		}

		/**
		 * Finds the node at the specified position from the current LinkedList<T>
		 * @param {number} the specified index of the element to find inside the current LinkedList<T>
		 * @returns {ILinkedListNode<T>} the node at the specified position; otherwise null
		 * @private
		 */
		private _getNodeAt(idx: number): ILinkedListNode<T> {
			if(!this._isValidIdx)
				return null;

			var currentNode = this._first;
			for(var currentIdx = 0; currentIdx < idx; idx++)
				currentNode = currentNode.next;

			return currentNode;
		}

		/**
		 * Removes the specified node from the current LinkedList<T>
		 * @param {ILinkedListNode<T>} the specified node to remove from the current LinkedList<T>
		 * @private
		 */
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

		/**
		 * Determines whether the specified element and index is valid
		 * @param {T} the element to verify
		 * @param {number} the index to verify
		 * @returns {boolean} true if the element is not null or undefined and the index
		 * is in range; otherwise, false
		 * @private
		 */
		private _isValid(element: T, idx: number): boolean {
			return element !== null && this._isValidIdx(idx);
		}

		/**
		 * Determines whether the specified index is valid
		 * @param {number} the index to verify
		 * @returns {boolean} true if the specified index is in range; otherwise, false
		 * @private
		 */
		private _isValidIdx(idx: number): boolean {
			return idx >= 0 && idx < this._count;
		}
	}
}