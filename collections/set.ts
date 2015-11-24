/**
 * Module for collections written in TypeScript
 * @module
 */
module core.collections {
	'use strict';

	/**
	 * Describes a set of elements
	 * @interface
	 */
	export interface ISet<T extends ICollectable> extends ICollection<T> {
		add(element: T): boolean;
		except(otherSet: ISet<T>): void;
		forEach(cb: (element: T) => void): void;
		intersect(otherSet: ISet<T>): void;
		isSubsetOf(otherSet: ISet<T>): boolean;
		isSupersetOf(otherSet: ISet<T>): boolean;
		overlaps(otherSet: ISet<T>): boolean;
		remove(element: T): boolean;
		union(otherSet: ISet<T>): void;
	}

	/**
	 * Represents a set of elements
	 * @class
	 * @implements ISet<T>
	 */
	export class Set<T extends ICollectable> implements ISet<T> {

		/**
		 * The dictionary that holds all the elements
		 * @type {IDictionary<string, T>}
		 * @private
		 */
		private _data: IDictionary<string, T>;

		/**
		 * Initializes a new instance of the Set<T>
		 * @constructor
		 */
		public constructor() {
			this._data = new Dictionary<string, T>();
		}

		/**
		 * Gets the number of elements that are containing in the current Set<T>
		 * @type {number}
		 */
		public get count(): number { return this._data.count; }

		/**
		 * The mode of the set
		 * @type {boolean}
		 * @public
		 */
		public get readOnly(): boolean { return this._data.readOnly; }

		/**
		 * Adds the specified element to the current Set<T>
		 * @param {T} The specified element to add to the current Set<T>
		 * @returns {{true}} if the specified element isn't allready present
		 * and if it's added to the current Set<T>; otherwise, false
		 */
		public add(element: T): boolean {
			if(this._data.contains(element))
				return false;

			return this._data.add(element);
		}

		/**
		 * Removes all elements from the current Set<T>
		 */
		public clear(): void {
			this._data.clear();
		}

		/**
		 * Clones the current Set<T> and all its elements
		 * @returns {Object} the cloned Set<T> with all its elements
		 */
		public clone(): any {
			var clonedSet: ISet<T> = new Set<T>();
			this._data.forEach((key: string, element: T) => {
				clonedSet.add(element);
			});

			return clonedSet;
		}

		/**
         * Determines whether the current Set<T> contains the specified element
         * @param {T} The specified element to locate in the current Set<T>
         * @returns {boolean} true if the current Set<T> contains the specified element;
		 * otherwise, false
         */
		public contains(element: T): boolean {
			return this._data.contains(element);
		}

		/**
		 * Removes all elements in the specified Set<T> from the current Set<T>
		 * @param {ISet<T>} The specified Set<T> containing the elements to remove from the current Set<T>
		 */
		public except(otherSet: ISet<T>): void {
			otherSet.forEach((element: T) => {
				if(this._data.contains(element))
					this._data.remove(element);
			});
		}

		/**
         * Executes the specified function for each element of the current Set<T>
         * @param {function(element: T) => void}: void The function to execute
         */
		public forEach(cb: (element: T) => void): void {
			this._data.forEach((key: string, element: T) => {
				cb(element);
			});
		}

		/**
		 * Modifies the current Set<T> to contain only elements that are present im both Set<T>
		 * @param {ISet<T>} The specified Set<T> to compare to the current Set<T>
		 */
		public intersect(otherSet: ISet<T>): void {
			var intersectData: IDictionary<string, T> = new Dictionary<string, T>();

			this._data.forEach((key: string, element: T) => {
				if(otherSet.contains(element))
					intersectData.add(element);
			});

			this._data = intersectData;
		}

		/**
		 * Determines whether the current Set<T> is empty
		 * @returns {boolean} true if the current Set<T> is empty; otherwise, false
		 */
		public isEmpty(): boolean {
			return this._data.isEmpty();
		}

		/**
		 * Determines whether the current Set<T> is a subset of the specified Set<T>
		 * @param {ISet<T>} The specified Set<T> to compare to the current Set<T>
         * @returns {boolean} true if the current Set<T> is a subset of the specified Set<T>;
		 * otherwise, false
		 */
		public isSubsetOf(otherSet: ISet<T>): boolean {
			if(this._data.count > otherSet.count)
				return false;

			var isSubset: boolean = true;

			this._data.forEach((key: string, element: T) => {
				if(!otherSet.contains(element))
					isSubset = false;
			});

			return isSubset;
		}

		/**
		 * Determines whether the current Set<T> is a superset of the specified Set<T>
		 * @param {ISet<T>} The specified Set<T> to compare to the current Set<T>
         * @returns {boolean} true if the current Set<T> is a superset of the specified Set<T>;
		 * otherwise, false
		 */
		public isSupersetOf(otherSet: ISet<T>): boolean {
			return otherSet.isSubsetOf(this);
		}

		/**
		 * Determines whether the current Set<T> and the specified Set<T> share common elements
		 * @param {ISet<T>} The specified Set<T> to compare to the current Set<T>
		 * @returns {boolean} true if the current Set<T> and the specified Set<T> share at least one common element;
		 * otherwise, false.
		 */
		public overlaps(otherSet: ISet<T>): boolean {
			var isOverlapping: boolean = false;

			this._data.forEach((key: string, element: T) => {
				if(otherSet.contains(element))
					isOverlapping = true;
			});

			return isOverlapping;
		}

		/**
		 * Removes the specified element from the current Set<T>
		 * @param {T} The specified element to remove from the current Set<T>
		 * @returns {boolean} if the specified element is successfully found and removed from the current Set<T>;
		 * otherwise, false
		 */
		public remove(element: T): boolean {
			return this._data.remove(element);
		}

		/**
		 * Copies all the elements of the current Set<T> to an array
		 * @returns {T[]} an array that includes all the elements of the current Set<T>
		 */
		public toArray(): T[] {
			return this._data.toArray();
		}

		/**
		 * Modifies the current Set<T> to contain all elements that are present in itself, the specified Set<T>, or both.
		 * @param {ISet<T>} The specified Set<T> to compare to the current Set<T>
		 */
		public union(otherSet: ISet<T>): void {
			otherSet.forEach((element: T) => {
				this._data.add(element);
			});
		}
	}
}