module core.collections {
	'use strict';

	export interface IDictionary<TKey, TValue> {
		get(key: TKey): TValue;
		set(key: TKey, value: TValue): boolean;
	}

	export class Dictionary<TKey, TValue> implements IDictionary<TKey, TValue> {
		public constructor() {

		}

		get(key: TKey): TValue {
			throw new DOMException();
		}

		set(key: TKey, value: TValue) : boolean {
			return true;
		}
	}
}