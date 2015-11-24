module core.collections {
	'use strict';

	export interface IDictionaryPair<TKey, TValue extends ICollectable> {
		key: TKey;
		value: TValue;
	}

	export class DictionaryPair<TKey, TValue extends ICollectable> implements IDictionaryPair<TKey, TValue> {
		public constructor(public key: TKey, public value: TValue) {}
	}

	export interface IDictionary<TKey, TValue extends ICollectable> extends ICollection<TValue> {
		keys: TKey[];
		values: TValue[];
		containsKey(key: TKey): boolean;
		forEach(cb: (key: TKey, value: TValue) => void): void;
		get(key: TKey): TValue;
		remove(key: TKey): boolean;
		set(key: TKey, value: TValue): boolean;
	}

	export class Dictionary<TKey, TValue extends ICollectable> implements IDictionary<TKey, TValue> {
		private _count: number;
		private _data: {[key: string]: IDictionaryPair<TKey, TValue> };
		private _readOnly: boolean;

		public constructor() {
			this._count = 0;
			this._data = {};
		}

		public get count() { return this._count; }

		public get readOnly(): boolean { return this._readOnly; }

		public get keys(): TKey[] {
			var output: TKey[] = [];
			this.forEach((key: TKey, value: TValue) => {
				output.push(key);
			});

			return output;
		}

		public get values(): TValue[] {
			var output: TValue[] = [];
			this.forEach((key: TKey, value: TValue) => {
				output.push(value);
			});

			return output;
		}

		public clear(): void {
			this._count = 0;
			this._data = {};
		}

		public clone(): any {
			// TODO;
		}

		public contains(item: TValue): boolean {
			// TODO
			return false;
		}

		public containsKey(key: TKey): boolean {
			// TODO
			return false;
		}

		public forEach(cb: (key: TKey, val: TValue) => void): void {
			for(var pair in this._data) {
				var dictionaryPair: IDictionaryPair<TKey, TValue> = pair;
				cb(dictionaryPair.key, dictionaryPair.value);
			}
		}

		public get(key: TKey): TValue {
			// TODO
			throw new DOMException();
		}

		public isEmpty(): boolean {
			return this._count === 0;
		}

		public remove(key: TKey): boolean {
			// TODO
			return false;
		}

		public set(key: TKey, value: TValue) : boolean {
			// TODO
			return false;
		}

		public toArray(): TValue[] {
			var output: TValue[] = [];

			this.forEach((key: TKey, value: TValue) => {
				output.push(value);
			});

			return output;
		}
	}
}