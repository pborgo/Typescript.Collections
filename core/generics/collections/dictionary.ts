/**
 * Module for generic collections
 * @module
 */
module core.generics.collections {
	'use strict';

	/**
	 * Describes a key-value pair
	 * @interface
	 */
	export interface IDictionaryPair<TKey, TValue extends ICollectable<string | number, any>> {
		key: TKey;
		value: TValue;
	}

	/**
	 * Represents a key-value pair
	 * @class
	 * @implements IDictionaryPair<TKey, TValue>
	 */
	export class DictionaryPair<TKey, TValue extends ICollectable<string | number, any>> implements IDictionaryPair<TKey, TValue> {

		/**
		 * Gets the key of the current DictionaryPair<TKey, TValue>
		 * @type {TKey}
		 */
		public key: TKey;

		/**
		 * Gets the value of the current DictionaryPair<TKey, TValue>
		 * @type {TValue}
		 */
		public value: TValue;

		/**
		 * Initializes a new instance of the DictionaryPair<T>
		 * @constructor
		 * @param {?TKey} the key of the node
		 * @param {?TValue} the value of the node
		 */
		public constructor(key?: TKey, value?: TValue) {}
	}

	/**
	 * Describes a collection of keys and values
	 * @interface
	 */
	export interface IDictionary<TKey, TValue extends ICollectable<string | number, any>> extends ICollection<TValue> {
		keys: TKey[];
		values: TValue[];
		add(key: TKey, value: TValue): boolean;
		containsKey(key: TKey): boolean;
		forEach(cb: (key: TKey, value: TValue) => void): void;
		get(key: TKey): TValue;
		indexOf(value: TValue): number;
		lastIndexOf(value: TValue): number;
		remove(value: TValue): boolean;
		removeAt(key: TKey): boolean;
		removeLast(key: TValue): boolean;
		set(key: TKey, value: TValue): void;
	}

	/**
	 * Represents a collection of keys and values
	 * @class
	 * @implements IDictionary<TKey, TValue>
	 */
	export class Dictionary<TKey, TValue extends ICollectable<string | number, any>> implements IDictionary<TKey, TValue> {

		/**
		 * Holds the number of elements that are containing in the current Dictionary<TKey, TValue>
		 * @type {number}
		 * @private
		 */
		private _count: number;

		/**
		 * The Object that holds all the DictionaryPair<T> and theire elements
		 * @type {{[key: string]: IDictionaryPair<TKey, TValue> }}
		 * @private
		 */
		private _data: {[key: string]: IDictionaryPair<TKey, TValue> };

		/**
		 * Holds the value indicating whether the current Dictionary<TKey, TValue> is read-only
		 * @type {boolean}
		 * @private
		 */
		private _readOnly: boolean;

		/**
		 * Initializes a new instance of the Dictionary<TKey, TValue>
		 * @constructor
		 */
		public constructor() {
			this._count = 0;
			this._data = {};
		}

		/**
		 * Gets the number of elements that are containing in the current Dictionary<TKey, TValue>
		 * @type {number}
		 */
		public get count() { return this._count; }

		/**
		 * Gets the value indicating whether the current Dictionary<TKey, TValue> is read-only
		 * @type {boolean}
		 */
		public get readOnly(): boolean { return this._readOnly; }

		/**
		 * Gets all the keys of the current Dictionary<TKey, TValue>
		 * @type {TKey[]}
		 */
		public get keys(): TKey[] {
			var output: TKey[] = [];
			this.forEach((key: TKey, value: TValue) => {
				output.push(key);
			});

			return output;
		}

		/**
		 * Gets all the values of the current Dictionary<TKey, TValue>
		 * @type {TValue[]}
		 */
		public get values(): TValue[] {
			var output: TValue[] = [];
			this.forEach((key: TKey, value: TValue) => {
				output.push(value);
			});

			return output;
		}

		/**
		 * Adds the specified key-value pair to the current Dictionary<TKey, TValue>
		 * @param {TKey} the specified key of the key-value pair
		 * @param {TValue} the specified value of the key-value pair
		 * @returns {{true}} if the specified key isn't allready used
		 * and the value was added to the current Dicitionary<TKey, TValue>; otherwise, false
		 */
		public add(key: TKey, value: TValue): boolean {
			// TODO
			return false;
		}

		/**
		 * Removes all elements from the current Dictionary<TKey, TValue>
		 */
		public clear(): void {
			this._count = 0;
			this._data = {};
		}

		/**
		 * Clones the current Dictionary<TKey, TValue> and all its elements
		 * @returns {IDictionary<TKey, TValue>} a clone of the current Dictionary<TKey, TValue> with all its elements
		 */
		public clone(): IDictionary<TKey, TValue> {
			var clonedDictionary: IDictionary<TKey, TValue> = new Dictionary<TKey, TValue>();
			this.forEach((key: TKey, value: TValue) =>  {
				clonedDictionary.set(key, value.clone());
			})

			return clonedDictionary;
		}

		/**
         * Determines whether the current Dictionary<TKey, TValue> contains the specified element
         * @param {TValue} the specified element to locate in the current Dictionary<TKey, TValue>
         * @returns {boolean} true if the current Dictionary<TKey, TValue> contains the specified element;
		 * otherwise, false
         */
		public contains(value: TValue): boolean {
			// TODO
			return false;
		}

		/**
		 * Determines wheter the specified key is allready used by the current Dictionary<TKey, TValue>
		 * @param {TKey} the specified key to locate in the current Dictionary<TKey, TValue>
		 * @returns {boolean} true if the current Dictionary<TKey, TValue> contains an element with
		 * the specified key; otherwise, false
		 */
		public containsKey(key: TKey): boolean {
			// TODO
			return false;
		}

		/**
         * Executes the specified function for each element of the current Dictionary<TKey, TValue>
         * @param {function(key: TKey, value: TValue)}: the function to execute
         */
		public forEach(cb: (key: TKey, val: TValue) => void): void {
			for(var pair in this._data) {
				var dictionaryPair: IDictionaryPair<TKey, TValue> = pair;
				cb(dictionaryPair.key, dictionaryPair.value);
			}
		}

		/**
		 * Returns the element with the specified key from the Dictionary<TKey, TValue>
		 * @param {TKey} the specified key of the element to return
		 * @returns {TValue} the element with the specified key; otherwise, null
		 */
		public get(key: TKey): TValue {
			// TODO
			throw new DOMException();
		}

		/**
		 * Searches for the specified element and returns the index of its first occurrence in the current Dictionary<TKey, TValue>
		 * @param {T} the element to locate in the current Dictionary<TKey, TValue>
		 * @returns {number} the index of the first occurrence of the element in the current Dictionary<TKey, TValue>; otherwise, -1
		 */
		public indexOf(value: TValue): number {
			// TODO
			return -1;
		}

		/**
		 * Determines whether the current Dictionary<TKey, TValue> is empty
		 * @returns {boolean} true if the current Dictionary<TKey, TValue> is empty; otherwise, false
		 */
		public isEmpty(): boolean {
			return this._count === 0;
		}

		/**
		 * Searches for the specified element and returns the index of its last occurrence in the current Dictionary<TKey, TValue>
		 * @param {T} the element to locate in the current Dictionary<TKey, TValue>
		 * @returns {number} the index of the last occurrence of the element in the current Dictionary<TKey, TValue>; otherwise, -1
		 */
		public lastIndexOf(value: TValue): number {
			// TODO
			return -1;
		}

		/**
		 * Removes the first occurrence of the specified element from the current Dictionary<TKey, TValue>
		 * @param {TValue} the specified element to remove
		 * @returns {boolean} true if the element was found and removed from the current Dictionary<TKey, TValue>;
		 * otherwise, false
		 */
		public remove(value: TValue): boolean {
			// TODO
			return false;
		}

		/**
		 * Removes the element with the specified key from the current Dictionary<TKey, TValue>
		 * @param {TKey} the specified key to remove
		 * @returns {boolean} true if the specified key was found and the element was removed from the
		 * current Dictionary<TKey, TValue>; otherwise, false;
		 */
		public removeAt(key: TKey): boolean {
			// TODO
			return false;
		}

		/**
		 * Removes the last occurrence of the specified element from the current Dictionary<TKey, TValue>
		 * @param {TValue} the specified element to remove
		 * @returns {boolean} true if the element was found and removed from the current Dictionary<TKey, TValue>;
		 * otherwise, false
		 */
		public removeLast(value: TValue): boolean {
			// TODO
			return false;
		}

		/**
		 * Sets the specified key-value pair to the current Dictionary<TKey, TValue>
		 * @param {TKey} the specified key of the key-value pair
		 * @param {TValue} the specified value of the key-value pair
		 */
		public set(key: TKey, value: TValue) : void {
			var newPair: IDictionaryPair<TKey, TValue> = new DictionaryPair<TKey, TValue>(key, value);
			this._data[key.toString() + value.hash()] = newPair;
			this._count++;
		}

		/**
		 * Copies all the elements of the current Dictionary<TKey, TValue> to an array
		 * @returns {TValue[]}  a new array containing copies of all the elements of the current Dictionary<TKey, TValue>
		 */
		public toArray(): TValue[] {
			var output: TValue[] = [];

			this.forEach((key: TKey, value: TValue) => {
				output.push(value);
			});

			return output;
		}
	}
}