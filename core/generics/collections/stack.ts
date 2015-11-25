/**
 * Module for generic collections
 * @module
 */
module core.generics.collections {
	'use strict';

	/**
	 * Describes a LIFO collection of elements
	 * @interface
	 */
	export interface IStack<T extends ICollectable<string | number, any>> extends ICollection<T> {
		forEach(cb: (element: T) => boolean): void;
		indexOf(element: T): number;
		lastIndexOf(element: T): number;
		peek(): T;
		pop(): T;
		push(element: T): void;
		reverse(): void;
	}

	/**
	 * Represents a LIFO collection of elements
	 * @class
	 * @implements IStack<T>
	 */
	export class Stack<T extends ICollectable<string | number, any>> implements IStack<T> {

		/**
		 * The linked list that holds all the elements
		 * @type {ILinkedList<T>}
		 * @private
		 */
		private _data: ILinkedList<T>;

		/**
		 * Initializes a new instance of the Stack<T>
		 * @constructor
		 */
		public constructor() {
			this._data = new LinkedList<T>();
		}

		/**
		 * Gets the number of elements that are containing in the current Stack<T>
		 * @type {number}
		 */
		public get count(): number { return this._data.count; }

		/**
		 * Gets the value indicating whether the current Stack<T> is read-only
		 * @type {boolean}
		 */
		public get readOnly(): boolean { return this._data.readOnly; }

		/**
		 * Removes all elements from the current Stack<T>
		 */
		public clear(): void {
			this._data.clear();
		}

		/**
		 * Clones the current Stack<T> and all its elements
		 * @returns {IStack<T>} a clone of the current Stack<T> with all its elements
		 */
		public clone(): IStack<T> {
			var clonedStack: IStack<T> = new Stack<T>();

			this._data.forEach((element: T) => {
				var clonedElement: T = element.clone();
				clonedStack.push(clonedElement);
			});

			return clonedStack;
		}

		/**
         * Determines whether the current Stack<T> contains the specified element
         * @param {T} the specified element to locate in the current Stack<T>
         * @returns {boolean} true if the current Stack<T> contains the specified element;
		 * otherwise, false
         */
		public contains(element: T): boolean {
			return this._data.contains(element);
		}

		/**
         * Executes the specified function for each element of the current Stack<T>
         * @param {function(element: T)} the function to execute
         */
		public forEach(cb: (element: T) => void): void {
			this._data.forEach((element: T) => {
				cb(element);
			});
		}

		/**
		 * Searches for the specified element and returns the index of its first occurrence in the current Stack<T>
		 * @param {T} the element to locate in the current Stack<T>
		 * @returns {number} the index of the first occurrence of the element in the current Stack<T>; otherwise, -1
		 */
		public indexOf(element: T): number {
			return this._data.indexOf(element);
		}

		/**
		 * Determines whether the current Stack<T> is empty
		 * @returns {boolean} true if the current Stack<T> is empty; otherwise, false
		 */
		public isEmpty(): boolean {
			return this._data.isEmpty();;
		}

		/**
		 * Searches for the specified element and returns the index of its last occurrence in the current Stack<T>
		 * @param {T} the element to locate in the current Stack<T>
		 * @returns {number} the index of the last occurrence of the element in the current Stack<T>; otherwise, -1
		 */
		public lastIndexOf(element: T): number {
			return this._data.lastIndexOf(element);
		}

		/**
		 * Returns the element at the top of the current Stack<T> without removing it
		 * @returns {T} the element at the top of the current Stack<T>; otherwise, null
		 */
		public peek(): T {
			return this._data.last;
		}

		/**
		 * Removes and returns the element at the top of the current Stack<T>
		 * @returns {T} the element removed from the top of the current Stack<T>; otherwise, null
		 */
		public pop(): T {
			var element = this._data.last;
			if(element !== null && this._data.remove(element))
				return element;

			return null;
		}

		/**
		 * Inserts the specified element at the top of the current Stack<T>
		 * @param {T} the element to push onto the current Stack<T>
		 */
		public push(element: T): void {
			this._data.prepend(element);
		}

		/**
		 * Reverses the sequence of the elements in the current Stack<T>
		 */
		public reverse(): void {
			this._data.reverse();
		}

		/**
		 * Copies all the elements of the current Stack<T> to an array
		 * @returns {T[]} a new array containing copies of all the elements of the current Stack<T>
		 */
		public toArray(): T[] {
			return this._data.toArray();
		}
	}
}