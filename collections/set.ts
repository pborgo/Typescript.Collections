module core.collections {
	'use strict';

	export interface ISet<T extends IEquatable> extends ICollection<T> {
		add(item: T): boolean;
		except(otherSet: ISet<T>): void;
		forEach(cb: (item: T) => boolean): void;
		intersect(otherSet: ISet<T>): void;
		isSubsetOf(otherSet: ISet<T>): boolean;
		isSupersetOf(otherSet: ISet<T>): boolean;
		overlaps(otherSet: ISet<T>): boolean;
		remove(item: T): boolean;
		union(otherSet: ISet<T>): void;
	}

	export class Set<T extends IEquatable> implements ISet<T> {
		private _data: IDictionary<string, T>;

		public constructor() {
			this._data = new Dictionary<string, T>();
		}

		public get count() { return this._data.count; }

		public get readOnly() { return this._data.readOnly; }

		public add(item: T): boolean {
			// TODO
			return false;
		}

		public clear(): void {
			this._data.clear();
		}

		public contains(item: T): boolean {
			// TODO
			return false;
		}

		public except(otherSet: ISet<T>): void {
			// TODO
		}

		public forEach(cb: (item: T) => boolean): void {
			// TODO
		}

		public intersect(otherSet: ISet<T>): void {
			// TODO
		}

		public isEmpty(): boolean {
			return this._data.isEmpty();
		}

		public isSubsetOf(otherSet: ISet<T>): boolean {
			// TODO
			return false;
		}

		public isSupersetOf(otherSet: ISet<T>): boolean {
			// TODO
			return false;
		}

		public overlaps(otherSet: ISet<T>): boolean {
			// TODO
			return false;
		}

		public remove(item: T): boolean {
			// TODO
			return false;
		}

		public toArray(): T[] {
			// TODO
			return [];
		}

		public union(otherSet: ISet<T>): void {
			// TODO
		}
	}
}