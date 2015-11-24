module core.collections {
	'use strict';

	export interface IDictionaryPair<T extends IEquatable> {
		key: string;
		value: T;
	}

	export class DictionaryPair<T extends IEquatable> implements IDictionaryPair<T> {
		public constructor(public key: string, public value: T) {}
	}

	export interface IDictionary<T extends IEquatable> extends ICollection<T> {
		keys: string[];
		values: T[];
		containsKey(key: string): boolean;
		forEach(cb: (key: string, value: T) => boolean): void;
		get(key: string): T;
		remove(key: string): boolean;
		set(key: string, value: T): boolean;
	}

	export class Dictionary<T extends IEquatable> implements IDictionary<T> {
		private _count: number;
		private _data: {[key: string]: IDictionaryPair<T> };
		private _readOnly: boolean;

		public constructor() {
			this._count = 0;
			this._data = {};
		}

		public get count() { return this._count; }

		public get readOnly(): boolean { return this._readOnly; }

		public get keys(): string[] {
			var output: string[] = [];
			for(var item in this._data) {
				// TODO
			}

			return output;
		}

		public get values(): T[] {
			var output: T[] = [];
			for(var item in this._data) {
				// TODO
			}

			return output;
		}

		public clear(): void {
			this._count = 0;
			this._data = {};
		}

		public contains(item: T): boolean {
			// TODO
			return true;
		}

		public containsKey(key: string): boolean {
			// TODO
			return true;
		}

		public forEach(cb: (key: string, val: T) => boolean): void {
			// TODO;
		}

		public get(key: string): T {
			// TODO
			throw new DOMException();
		}

		public isEmpty(): boolean {
			return this._count === 0;
		}

		public remove(key: string): boolean {
			// TODO
			return true;
		}

		public set(key: string, value: T) : boolean {
			// TODO
			return true;
		}

		public toArray(): T[] {
			// TODO
			return [];
		}
	}
}