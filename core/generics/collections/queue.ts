/**
 * Module for generic collections
 * @module
 */
module core.generics.collections {
	'use strict';

	/**
	 * Describes a FIFO collection of elements
	 * @interface
	 */
	export interface IQueue<T extends ICollectable<string | number, any>> extends ICollection<T> {
		dequeue(): T;
		enqueue(element: T): void;
		forEach(cb: (element: T) => void): void;
		indexOf(element: T): number;
		lastIndexOf(element: T): number;
		peek(): T;
		reverse(): void;
	}

	/**
	 * Represents a FIFO collection of elements
	 * @class
	 * @implements IQueue<T>
	 */
	export class Queue<T extends ICollectable<string | number, any>> implements IQueue<T> {

		/**
		 * The linked list that holds all the elements
		 * @type {ILinkedList<T>}
		 * @private
		 */
		private _data: ILinkedList<T>;

		/**
		 * Initializes a new instance of the Queue<T>
		 * @constructor
		 */
		public constructor() {
			this._data = new LinkedList<T>();
		}

		/**
		 * Gets the number of elements that are containing in the current Queue<T>
		 * @type {number}
		 */
		public get count(): number { return this._data.count; }

		/**
		 * Gets the value indicating whether the current Queue<T> is read-only
		 * @type {boolean}
		 */
		public get readOnly(): boolean { return this._data.readOnly; }

		/**
		 * Removes all elements from the current Queue<T>
		 */
		public clear(): void {
			this._data.clear();
		}

		/**
		 * Clones the current Queue<T> and all its elements
		 * @returns {IQueue<T>} a clone of the current Queue<T> with all its elements
		 */
		public clone(): IQueue<T> {
			var clonedQueue: IQueue<T> = new Queue<T>();

			this._data.forEach((element: T) => {
				var clonedElement: T = element.clone();
				clonedQueue.enqueue(clonedElement);
			});

			return clonedQueue;
		}

		/**
         * Determines whether the current Queue<T> contains the specified element
         * @param {T} the specified element to locate in the current Queue<T>
         * @returns {boolean} true if the current Queue<T> contains the specified element;
		 * otherwise, false
         */
		public contains(element: T): boolean {
			return this._data.contains(element);
		}

		/**
		 * Removes and returns the element at the beginning of the current Queue<T>
		 * @returns {T} the element that is removed from the beginning of the current Queue<T>; otherwise, null
		 */
		public dequeue(): T {
			var element = this._data.first;
			if(element !== null)
				this._data.remove(element);

			return element;
		}

		/**
		 * Adds an element to the end of the current Queue<T>
		 * @param {T} the element to add to the current Queue<T>
		 */
		public enqueue(element: T): void {
			this._data.append(element);
		}

		/**
         * Executes the specified function for each element of the current Queue<T>
         * @param {function(element: T)} the function to execute
         */
		public forEach(cb: (element: T) => void): void {
			this._data.forEach((element: T) => {
				cb(element);
			});
		}

		/**
		 * Searches for the specified element and returns the index of its first occurrence in the current Queue<T>
		 * @param {T} the element to locate in the current Queue<T>
		 * @returns {number} the index of the first occurrence of the element in the current Queue<T>; otherwise, -1
		 */
		public indexOf(element: T): number {
			return this._data.indexOf(element);
		}

		/**
		 * Determines whether the current Queue<T> is empty
		 * @returns {boolean} true if the current Queue<T> is empty; otherwise, false
		 */
		public isEmpty(): boolean {
			return this._data.isEmpty();;
		}

		/**
		 * Searches for the specified element and returns the index of its last occurrence in the current Queue<T>
		 * @param {T} the element to locate in the current Queue<T>
		 * @returns {number} the index of the last occurrence of the element in the current Queue<T>; otherwise, -1
		 */
		public lastIndexOf(element: T): number {
			return this._data.lastIndexOf(element);
		}

		/**
		 * Returns the element at the beginning of the current Queue<T> without removing it
		 * @returns {T} the element at the beginning of the current Queue<T>; otherwise, null
		 */
		public peek(): T {
			return this._data.first;
		}

		/**
		 * Reverses the sequence of the elements in the current Queue<T>
		 */
		public reverse(): void {
			this._data.reverse();
		}

		/**
		 * Copies all the elements of the current Queue<T> to an array
		 * @returns {T[]} a new array containing copies of all the elements of the current Queue<T>
		 */
		public toArray(): T[] {
			return this._data.toArray();
		}
	}
}